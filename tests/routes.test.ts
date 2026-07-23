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

describe("GET /api/contact", () => {
  it("returns 500 when ADMIN_KEY is not configured", async () => {
    delete process.env.ADMIN_KEY;

    const res = await request(app).get("/api/contact");

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(mockStorage.getAllContactForms).not.toHaveBeenCalled();
  });

  it("returns 401 without an Authorization header", async () => {
    const res = await request(app).get("/api/contact");

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(mockStorage.getAllContactForms).not.toHaveBeenCalled();
  });

  it("returns 401 with a wrong bearer token", async () => {
    const res = await request(app)
      .get("/api/contact")
      .set("Authorization", "Bearer wrong-key");

    expect(res.status).toBe(401);
    expect(mockStorage.getAllContactForms).not.toHaveBeenCalled();
  });

  it("returns the stored forms with a valid bearer token", async () => {
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

    const res = await request(app)
      .get("/api/contact")
      .set("Authorization", `Bearer ${ADMIN_KEY}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(forms);
    expect(mockStorage.getAllContactForms).toHaveBeenCalledOnce();
  });

  it("returns 500 when the storage fails", async () => {
    mockStorage.getAllContactForms.mockRejectedValue(new Error("db down"));

    const res = await request(app)
      .get("/api/contact")
      .set("Authorization", `Bearer ${ADMIN_KEY}`);

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
