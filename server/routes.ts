import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactFormSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { body, validationResult } from "express-validator";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Simple authentication middleware for admin routes
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const adminKey = process.env.ADMIN_KEY || 'admin123'; // Should be set as environment variable
    
    if (!authHeader || authHeader !== `Bearer ${adminKey}`) {
      return res.status(401).json({ 
        success: false, 
        message: "Acesso não autorizado" 
      });
    }
    next();
  };

  // Rota para listar todos os formulários de contato (protegida)
  app.get('/api/contact', requireAuth, async (req, res) => {
    try {
      const forms = await storage.getAllContactForms();
      res.status(200).json(forms);
    } catch (error) {
      console.error('Erro ao buscar formulários de contato:', error);
      res.status(500).json({ 
        success: false, 
        message: "Erro ao buscar formulários de contato", 
        error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      });
    }
  });
  
  // Additional validation middleware for contact form
  const contactValidation = [
    body('name')
      .trim()
      .escape()
      .isLength({ min: 2, max: 100 })
      .withMessage('Nome deve ter entre 2 e 100 caracteres'),
    body('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Email deve ser válido'),
    body('phone')
      .optional()
      .trim()
      .isMobilePhone('pt-BR')
      .withMessage('Telefone deve ser válido'),
    body('company')
      .optional()
      .trim()
      .escape()
      .isLength({ max: 100 })
      .withMessage('Nome da empresa deve ter no máximo 100 caracteres'),
    body('message')
      .trim()
      .escape()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Mensagem deve ter entre 10 e 1000 caracteres'),
  ];

  // Rota para enviar formulário de contato
  app.post('/api/contact', contactValidation, async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Dados de entrada inválidos",
          errors: errors.array()
        });
      }

      const formData = insertContactFormSchema.parse(req.body);
      
      // Add timestamp
      const contactSubmission = {
        ...formData,
        createdAt: new Date().toISOString()
      };
      
      // Store contact form submission
      await storage.createContactForm(contactSubmission);
      
      res.status(200).json({ success: true, message: "Formulário enviado com sucesso" });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: "Erro de validação", 
          errors: validationError.message 
        });
      } else {
        console.error('Erro ao processar formulário de contato:', error);
        res.status(500).json({ 
          success: false, 
          message: "Erro interno do servidor",
          error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
