import { Request, Response } from "express";
import { TransactionModel } from "@/models/TransactionModel";
import { TransactionType } from "@/types/transaction";

// Create a transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { description, amount, type } = req.body;
    
    if (!description || !amount || !type) {
      res.status(400).json({ error: "Missing required fields" });
      return 
    }

    if (typeof description !== 'string' || typeof amount !== 'number' || !['income', 'expense'].includes(type)) {
      res.status(400).json({ error: "Invalid data types" });
      return 
    }

    const newTransaction = await TransactionModel.create({
      description,
      amount: Number(amount),
      type: type as TransactionType
    });
    res.status(201).json(newTransaction[0]);
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

// Get all transactions
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const allTransactions = await TransactionModel.findAll();
    res.status(200).json(allTransactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Get a single transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return 
    }

    const transaction = await TransactionModel.findById(id);
    if (transaction.length === 0) {
      res.status(404).json({ error: "Transaction not found" });
      return 
    }
    res.status(200).json(transaction[0]);
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
};

// Update a transaction
export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return 
    }

    const { description, amount, type } = req.body;
    const updateData: {
      description?: string;
      amount?: number;
      type?: TransactionType;
    } = {};

    if (description !== undefined) {
      if (typeof description !== 'string') {
        res.status(400).json({ error: "Invalid description type" });
        return 
      }
      updateData.description = description;
    }

    if (amount !== undefined) {
      if (typeof amount !== 'number') {
        res.status(400).json({ error: "Invalid amount type" });
        return 
      }
      updateData.amount = Number(amount);
    }

    if (type !== undefined) {
      if (!['income', 'expense'].includes(type)) {
        res.status(400).json({ error: "Invalid transaction type" });
        return 
      }
      updateData.type = type as TransactionType;
    }

    const updatedTransaction = await TransactionModel.update(id, updateData);
    if (updatedTransaction.length === 0) {
      res.status(404).json({ error: "Transaction not found" });
      return 
    }
    res.status(200).json(updatedTransaction[0]);
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

// Delete a transaction
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
      return 
    }

    const deletedTransaction = await TransactionModel.delete(id);
    if (deletedTransaction.length === 0) {
      res.status(404).json({ error: "Transaction not found" });
      return 
    }
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};