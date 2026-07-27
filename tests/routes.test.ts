import express from "express";
import request from "supertest";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

// Mock the storage module before importing the routes, so that
// server/db.ts (which requires DATABASE_URL) is never loaded.
const mockStorage = vi.hoisted(() => ({
  getUser: vi.fn(),
  getUserByUsername: vi.fn(),
  createUser: vi.fn(),
  createContactForm: vi.fn(),
  getAllContactForms: vi.fn(),
}));

vi.mock("../server/storage", () => ({
  storage: mockStorage,
}));

import { registerRoutes } from "../server/routes";

const ADMIN_KEY = "test-admin-key";

let app: express.Express;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  await registerRoutes(app);
});

beforeEach(() => {
  vi.clearAllMocks();
  process.env.ADMIN_KEY = ADMIN_KEY;
});

afterEach(() => {
  delete process.env.ADMIN_KEY;
});

describe("autenticação por sessão", () => {
  it("recusa o login quando ADMIN_KEY não está configurada", async () => {
    delete process.env.ADMIN_KEY;

    const res = await request(app).post("/api/admin/login").send({ password: "qualquer" });

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it("recusa senha errada e não cria sessão", async () => {
    const agent = request.agent(app);

    const login = await agent.post("/api/admin/login").send({ password: "errada" });
    expect(login.status).toBe(401);

    const sess = await agent.get("/api/admin/session");
    expect(sess.body.authenticated).toBe(false);
  });

  it("recusa corpo sem senha", async () => {
    const res = await request(app).post("/api/admin/login").send({});
    expect(res.status).toBe(401);
  });

  it("aceita a senha correta e passa a reportar sessão ativa", async () => {
    const agent = request.agent(app);

    const login = await agent.post("/api/admin/login").send({ password: ADMIN_KEY });
    expect(login.status).toBe(200);
    expect(login.body.success).toBe(true);

    const sess = await agent.get("/api/admin/session");
    expect(sess.body.authenticated).toBe(true);
  });

  it("não devolve o segredo em nenhuma resposta", async () => {
    const agent = request.agent(app);
    const login = await agent.post("/api/admin/login").send({ password: ADMIN_KEY });

    expect(JSON.stringify(login.body)).not.toContain(ADMIN_KEY);
    expect(login.headers["set-cookie"]?.join(" ") ?? "").not.toContain(ADMIN_KEY);
  });

  it("marca o cookie de sessão como httpOnly", async () => {
    const agent = request.agent(app);
    const login = await agent.post("/api/admin/login").send({ password: ADMIN_KEY });

    const cookies = login.headers["set-cookie"]?.join(" ") ?? "";
    expect(cookies).toMatch(/HttpOnly/i);
  });

  it("o logout encerra a sessão", async () => {
    const agent = request.agent(app);
    await agent.post("/api/admin/login").send({ password: ADMIN_KEY });

    const out = await agent.post("/api/admin/logout");
    expect(out.status).toBe(200);

    const sess = await agent.get("/api/admin/session");
    expect(sess.body.authenticated).toBe(false);
  });
});

describe("GET /api/contact", () => {
  it("retorna 401 sem sessão", async () => {
    const res = await request(app).get("/api/contact");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(mockStorage.getAllContactForms).not.toHaveBeenCalled();
  });

  it("retorna 401 com o header Authorization antigo — o bearer não vale mais", async () => {
    const res = await request(app)
      .get("/api/contact")
      .set("Authorization", `Bearer ${ADMIN_KEY}`);

    expect(res.status).toBe(401);
    expect(mockStorage.getAllContactForms).not.toHaveBeenCalled();
  });

  it("retorna 401 com cookie de sessão forjado", async () => {
    const res = await request(app)
      .get("/api/contact")
      .set("Cookie", "nf.sid=s%3Aforjado.assinatura-invalida");

    expect(res.status).toBe(401);
    expect(mockStorage.getAllContactForms).not.toHaveBeenCalled();
  });

  it("retorna os formulários para uma sessão autenticada", async () => {
    const forms = [
      {
        id: 1,
        name: "João Silva",
        email: "joao@example.com",
        phone: null,
        company: null,
        message: "Mensagem de teste com tamanho suficiente.",
        createdAt: "2026-01-01T00:00:00.000Z",
      },
    ];
    mockStorage.getAllContactForms.mockResolvedValue(forms);

    const agent = request.agent(app);
    await agent.post("/api/admin/login").send({ password: ADMIN_KEY });

    const res = await agent.get("/api/contact");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(forms);
    expect(mockStorage.getAllContactForms).toHaveBeenCalledOnce();
  });

  it("retorna 500 quando o storage falha", async () => {
    mockStorage.getAllContactForms.mockRejectedValue(new Error("db down"));

    const agent = request.agent(app);
    await agent.post("/api/admin/login").send({ password: ADMIN_KEY });

    const res = await agent.get("/api/contact");

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});

describe("POST /api/contact", () => {
  const validBody = {
    name: "João Silva",
    email: "joao@example.com",
    message: "Gostaria de saber mais sobre os serviços de vocês.",
  };

  it("accepts a valid submission and stores it with a timestamp", async () => {
    mockStorage.createContactForm.mockResolvedValue({
      id: 1,
      ...validBody,
      phone: null,
      company: null,
      createdAt: "2026-01-01T00:00:00.000Z",
    });

    const res = await request(app).post("/api/contact").send(validBody);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Formulário enviado com sucesso",
    });
    expect(mockStorage.createContactForm).toHaveBeenCalledOnce();
    const stored = mockStorage.createContactForm.mock.calls[0][0];
    expect(stored.name).toBe(validBody.name);
    expect(stored.email).toBe(validBody.email);
    expect(stored.message).toBe(validBody.message);
    expect(typeof stored.createdAt).toBe("string");
    expect(new Date(stored.createdAt).toString()).not.toBe("Invalid Date");
  });

  it("accepts optional phone and company fields", async () => {
    mockStorage.createContactForm.mockResolvedValue({ id: 2 });

    const res = await request(app)
      .post("/api/contact")
      .send({
        ...validBody,
        phone: "11987654321",
        company: "Pousada Mar Azul",
      });

    expect(res.status).toBe(200);
    expect(mockStorage.createContactForm).toHaveBeenCalledOnce();
  });

  it("rejects an invalid email", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, email: "not-an-email" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(mockStorage.createContactForm).not.toHaveBeenCalled();
  });

  it("rejects a name that is too short", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, name: "J" });

    expect(res.status).toBe(400);
    expect(mockStorage.createContactForm).not.toHaveBeenCalled();
  });

  it("rejects a message that is too short", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, message: "curta" });

    expect(res.status).toBe(400);
    expect(mockStorage.createContactForm).not.toHaveBeenCalled();
  });

  it("rejects an invalid phone number", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, phone: "123" });

    expect(res.status).toBe(400);
    expect(mockStorage.createContactForm).not.toHaveBeenCalled();
  });

  it("rejects a missing body", async () => {
    const res = await request(app).post("/api/contact").send({});

    expect(res.status).toBe(400);
    expect(mockStorage.createContactForm).not.toHaveBeenCalled();
  });

  it("returns 500 when the storage fails", async () => {
    mockStorage.createContactForm.mockRejectedValue(new Error("db down"));

    const res = await request(app).post("/api/contact").send(validBody);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
