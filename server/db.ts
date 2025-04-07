import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';

// Verificando se a variável de ambiente está definida
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  throw new Error('DATABASE_URL environment variable is not set');
}

// Criando conexão com o banco de dados com SSL obrigatório
const connectionString = process.env.DATABASE_URL;
const queryClient = postgres(connectionString, { ssl: 'require' });

// Criando instância do Drizzle ORM
export const db = drizzle(queryClient, { schema });