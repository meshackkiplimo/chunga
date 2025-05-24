import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { transactions } from "@/schema/transactionSchema";
import env from "./env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool, { schema: { transactions } });

export const checkDatabaseConnection = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database is running! ✨');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Test connection immediately
checkDatabaseConnection();