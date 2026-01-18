import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

let pool: pg.Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema });
  }
  
  return db;
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  
  return pool;
}

// For backward compatibility, export db (will be null if no DATABASE_URL)
export { db };
