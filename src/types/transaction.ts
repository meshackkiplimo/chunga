import { InferModel } from 'drizzle-orm';
import { transactions } from '@/schema/transactionSchema';

export type Transaction = InferModel<typeof transactions>;
export type NewTransaction = InferModel<typeof transactions, 'insert'>;

export type TransactionType = 'income' | 'expense';