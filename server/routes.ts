import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import crypto from "crypto";
import session from "express-session";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { insertContactFormSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { body, validationResult } from "express-validator";

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
  }
}

/**
 * Compara dois segredos sem vazar informação pelo tempo de execução.
 *
 * O `!==` de string do JavaScript retorna no primeiro byte diferente, então o
 * tempo de resposta revela quantos caracteres iniciais estavam certos. O hash
 * iguala os comprimentos antes da comparação, para o tamanho da senha também
 * não vazar.
 */
function secretsMatch(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a, "utf8").digest();
  const hb = crypto.createHash("sha256").update(b, "utf8").digest();
  return crypto.timingSafeEqual(ha, hb);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // A sessão fica junto das rotas que dependem dela: `requireAuth` só funciona
  // se este middleware tiver rodado antes, e manter os dois no mesmo arquivo
  // impede que a proteção seja registrada sem o seu pré-requisito.
  //
  // Sem SESSION_SECRET a chave é aleatória por processo: em desenvolvimento
  // funciona, e em produção um restart derruba as sessões — por isso a variável
  // é obrigatória fora de desenvolvimento (ver server/index.ts).
  app.use(
    session({
      secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex"),
      name: "nf.sid",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, // inacessível a JavaScript: XSS não consegue ler o cookie
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 8 * 60 * 60 * 1000, // 8 horas
      },
    }),
  );

  // Endpoint de senha precisa de limite próprio: sem ele, o campo de login é um
  // oráculo para força bruta. Sem keyGenerator customizado de propósito — o
  // padrão usa req.ip, que é confiável porque `trust proxy` está fixo em 1.
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    skipSuccessfulRequests: true,
    message: {
      success: false,
      message: "Muitas tentativas de login. Tente novamente em alguns minutos.",
    },
  });

  // A senha é verificada aqui, no servidor. Antes a checagem vivia no cliente
  // (`if (password === "admin123")`), o que significa que o segredo ia no bundle
  // servido a todo visitante — e o painel era contornável só escrevendo no
  // localStorage pelo DevTools.
  app.post("/api/admin/login", loginLimiter, (req: Request, res: Response) => {
    const adminKey = process.env.ADMIN_KEY;
    if (!adminKey) {
      return res.status(500).json({
        success: false,
        message: "Configuração de autenticação ausente",
      });
    }

    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!password || !secretsMatch(password, adminKey)) {
      return res.status(401).json({ success: false, message: "Senha incorreta" });
    }

    // Novo id de sessão após autenticar, para não aceitar um id que o cliente
    // já trouxesse (session fixation).
    req.session.regenerate((err) => {
      if (err) {
        console.error("Erro ao regenerar a sessão:", err);
        return res.status(500).json({ success: false, message: "Erro ao autenticar" });
      }
      req.session.isAdmin = true;
      res.status(200).json({ success: true });
    });
  });

  app.post("/api/admin/logout", (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.clearCookie("nf.sid");
      res.status(200).json({ success: true });
    });
  });

  // Permite ao cliente restaurar o estado da tela ao recarregar sem guardar
  // nada localmente — a resposta vem do cookie httpOnly, não do localStorage.
  app.get("/api/admin/session", (req: Request, res: Response) => {
    res.status(200).json({ authenticated: req.session?.isAdmin === true });
  });

  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.isAdmin === true) {
      return next();
    }
    return res.status(401).json({
      success: false,
      message: "Acesso não autorizado",
    });
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
  app.post('/api/contact', contactValidation, async (req: Request, res: Response) => {
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
