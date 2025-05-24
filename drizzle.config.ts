import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";


dotenv.config();

export default defineConfig({
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
});