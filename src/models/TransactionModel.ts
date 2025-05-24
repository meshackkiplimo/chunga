import { db } from "@/config/db";
import { transactions } from "@/schema/transactionSchema";
import { eq } from "drizzle-orm";

export class TransactionModel {
  static async create(data: { description: string; amount: string; type: string }) {
    return await db.insert(transactions).values(data).returning();
  }

  static async findAll() {
    return await db.select().from(transactions);
  }

  static async findById(id: number) {
    return await db.select().from(transactions).where(eq(transactions.id, id));
  }

  static async update(id: number, data: { description?: string; amount?: string; type?: string }) {
    return await db.update(transactions).set(data).where(eq(transactions.id, id)).returning();
  }

  static async delete(id: number) {
    return await db.delete(transactions).where(eq(transactions.id, id)).returning();
  }
}