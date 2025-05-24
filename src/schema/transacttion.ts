import { pgTable, serial, varchar, numeric, timestamp } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  description: varchar("description", { length: 255 }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // e.g., "income" or "expense"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});