import { users, type User, type InsertUser, contactForm, type InsertContactForm, type ContactForm } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Adicionado suporte para manipulação de formulários de contato
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
  getAllContactForms(): Promise<ContactForm[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async createContactForm(form: InsertContactForm): Promise<ContactForm> {
    const now = new Date().toISOString();
    const [result] = await db
      .insert(contactForm)
      .values({ ...form, createdAt: now })
      .returning();
    return result;
  }
  
  async getAllContactForms(): Promise<ContactForm[]> {
    return await db.select().from(contactForm).orderBy(contactForm.id);
  }
}

export const storage = new DatabaseStorage();
