import { db } from "@/config/db";
import { transactions } from "@/schema/transactionSchema";
import { eq } from "drizzle-orm";
import { NewTransaction, Transaction, TransactionType } from "@/types/transaction";

export class TransactionModel {
  static async create(data: {
    description: string;
    amount: number;
    type: TransactionType;
  }): Promise<Transaction[]> {
    const dbData = {
      ...data,
      amount: data.amount.toString(),
    };
    return await db.insert(transactions).values(dbData).returning();
  }

  static async findAll(): Promise<Transaction[]> {
    return await db.select().from(transactions);
  }

  static async findById(id: number): Promise<Transaction[]> {
    return await db.select().from(transactions).where(eq(transactions.id, id));
  }

  static async update(
    id: number,
    data: {
      description?: string;
      amount?: number;
      type?: TransactionType;
    }
  ): Promise<Transaction[]> {
    // Prepare update data with type conversion
    const updateData: Partial<{
      description: string;
      amount: string;
      type: TransactionType;
    }> = {};

    if (data.description !== undefined) {
      updateData.description = data.description;
    }
    if (data.amount !== undefined) {
      updateData.amount = data.amount.toString();
    }
    if (data.type !== undefined) {
      updateData.type = data.type;
    }

    return await db
      .update(transactions)
      .set(updateData)
      .where(eq(transactions.id, id))
      .returning();
  }

  static async delete(id: number): Promise<Transaction[]> {
    return await db.delete(transactions).where(eq(transactions.id, id)).returning();
  }
}