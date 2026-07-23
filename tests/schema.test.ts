import { describe, expect, it } from "vitest";
import {
  insertContactFormSchema,
  insertUserSchema,
} from "@shared/schema";

describe("insertContactFormSchema", () => {
  const validForm = {
    name: "João Silva",
    email: "joao@example.com",
    phone: "11987654321",
    company: "Pousada Mar Azul",
    message: "Gostaria de saber mais sobre os serviços de vocês.",
  };

  it("accepts a fully filled contact form", () => {
    const result = insertContactFormSchema.parse(validForm);
    expect(result).toEqual(validForm);
  });

  it("accepts a form without the optional phone and company fields", () => {
    const { phone, company, ...minimal } = validForm;
    const result = insertContactFormSchema.parse(minimal);
    expect(result.name).toBe(validForm.name);
    expect(result.email).toBe(validForm.email);
    expect(result.message).toBe(validForm.message);
  });

  it("accepts null for the optional phone and company fields", () => {
    const result = insertContactFormSchema.parse({
      ...validForm,
      phone: null,
      company: null,
    });
    expect(result.phone).toBeNull();
    expect(result.company).toBeNull();
  });

  it("rejects a form without name", () => {
    const { name, ...withoutName } = validForm;
    const result = insertContactFormSchema.safeParse(withoutName);
    expect(result.success).toBe(false);
  });

  it("rejects a form without email", () => {
    const { email, ...withoutEmail } = validForm;
    const result = insertContactFormSchema.safeParse(withoutEmail);
    expect(result.success).toBe(false);
  });

  it("rejects a form without message", () => {
    const { message, ...withoutMessage } = validForm;
    const result = insertContactFormSchema.safeParse(withoutMessage);
    expect(result.success).toBe(false);
  });

  it("rejects non-string values for required fields", () => {
    expect(
      insertContactFormSchema.safeParse({ ...validForm, name: 123 }).success,
    ).toBe(false);
    expect(
      insertContactFormSchema.safeParse({ ...validForm, message: false })
        .success,
    ).toBe(false);
  });

  it("strips fields that are not part of the insert schema", () => {
    const result = insertContactFormSchema.parse({
      ...validForm,
      id: 42,
      createdAt: "2026-01-01T00:00:00.000Z",
    });
    expect(result).not.toHaveProperty("id");
    expect(result).not.toHaveProperty("createdAt");
  });
});

describe("insertUserSchema", () => {
  const validUser = {
    username: "luciano",
    password: "s3nh4-forte",
  };

  it("accepts a valid user", () => {
    expect(insertUserSchema.parse(validUser)).toEqual(validUser);
  });

  it("rejects a user without username", () => {
    const result = insertUserSchema.safeParse({ password: "s3nh4-forte" });
    expect(result.success).toBe(false);
  });

  it("rejects a user without password", () => {
    const result = insertUserSchema.safeParse({ username: "luciano" });
    expect(result.success).toBe(false);
  });

  it("rejects non-string credentials", () => {
    expect(
      insertUserSchema.safeParse({ ...validUser, username: 42 }).success,
    ).toBe(false);
    expect(
      insertUserSchema.safeParse({ ...validUser, password: null }).success,
    ).toBe(false);
  });
});
