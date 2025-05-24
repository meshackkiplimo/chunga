import { Request, Response } from "express";
import { db } from "@/config/db";
import { transactions } from "@/schema/transactionSchema";
import { eq } from "drizzle-orm";

// Create a transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { description, amount, type } = req.body;
    const newTransaction = await db
      .insert(transactions)
      .values({ description, amount, type })
      .returning();
    res.status(201).json(newTransaction[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

// Get all transactions
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const allTransactions = await db.select().from(transactions);
    res.status(200).json(allTransactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Get a single transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const transaction = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, id));
    if (transaction.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(transaction[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
};

// Update a transaction
export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { description, amount, type } = req.body;
    const updatedTransaction = await db
      .update(transactions)
      .set({ description, amount, type })
      .where(eq(transactions.id, id))
      .returning();
    if (updatedTransaction.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json(updatedTransaction[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTransaction = await db
      .delete(transactions)
      .where(eq(transactions.id, id))
      .returning();
    if (deletedTransaction.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};