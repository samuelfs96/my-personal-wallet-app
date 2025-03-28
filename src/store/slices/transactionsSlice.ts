import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '@/models';
import { v4 as uuidv4 } from 'uuid';

interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: [],
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id' | 'date'>>) => {
      const newTransaction: Transaction = {
        ...action.payload,
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
      };
      state.transactions.unshift(newTransaction);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter((t) => t.id !== action.payload);
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const { addTransaction, removeTransaction, clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
