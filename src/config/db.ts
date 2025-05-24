import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { transactions } from "@/schema/transactionSchema";
import env from "./env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool, { schema: { transactions } });

export const checkDatabaseConnection = () => {
  pool.on("connect", () => {
    console.log("Database is running! ✨");
  });
  
  pool.on("error", (err) => {
    console.error("Database connection error:", err);
  });
};