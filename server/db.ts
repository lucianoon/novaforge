import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';

// Verificando se a variável de ambiente está definida
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Criando conexão com o banco
const queryClient = postgres(process.env.DATABASE_URL);

// Criando instância do Drizzle ORM
export const db = drizzle(queryClient, { schema });