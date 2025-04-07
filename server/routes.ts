import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactFormSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Rota para listar todos os formulários de contato
  app.get('/api/contact', async (req, res) => {
    try {
      const forms = await storage.getAllContactForms();
      res.status(200).json(forms);
    } catch (error) {
      console.error('Erro ao buscar formulários de contato:', error);
      res.status(500).json({ 
        success: false, 
        message: "Erro ao buscar formulários de contato", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // Rota para enviar formulário de contato
  app.post('/api/contact', async (req, res) => {
    try {
      const formData = insertContactFormSchema.parse(req.body);
      
      // Add timestamp
      const contactSubmission = {
        ...formData,
        createdAt: new Date().toISOString()
      };
      
      // Store contact form submission
      await storage.createContactForm(contactSubmission);
      
      res.status(200).json({ success: true, message: "Form submitted successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: validationError.message 
        });
      } else {
        console.error('Erro ao processar formulário de contato:', error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your request",
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
