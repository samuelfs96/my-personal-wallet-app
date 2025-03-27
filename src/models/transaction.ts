import { TransactionType } from './transactionTypes';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  category: string;
}
