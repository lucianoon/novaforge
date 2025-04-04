import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactForm = pgTable("contact_form", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactFormSchema = createInsertSchema(contactForm).pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertContactForm = z.infer<typeof insertContactFormSchema>;
export type User = typeof users.$inferSelect;
export type ContactForm = typeof contactForm.$inferSelect;
