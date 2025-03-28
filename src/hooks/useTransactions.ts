import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  clearTransactions,
  addTransaction,
  removeTransaction,
} from '@/store/slices/transactionsSlice';
import { emptyBalance, setBalance } from '@/store/slices/walletSlice';
import { Transaction } from '@/models';
import * as XLSX from 'xlsx';

export const useTransactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const balance = useSelector((state: RootState) => state.wallet.balance);

  const handleClearTransactions = () => {
    if (
      window.confirm(
        'Are you sure you want to clear all transactions and reset the balance to 0? This action cannot be undone.'
      )
    ) {
      dispatch(clearTransactions());
      dispatch(emptyBalance());
    }
  };

  const submitTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    dispatch(addTransaction(transaction));
    dispatch(setBalance(transaction.type === 'income' ? transaction.amount : -transaction.amount));
  };

  const handleDeleteTransaction = (id: string) => {
    const transaction = transactions.find((t) => t.id === id);
    if (!transaction) return;
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(removeTransaction(id));
      const amount = transaction.type === 'income' ? -transaction.amount : transaction.amount;
      dispatch(setBalance(amount));
    }
  };

  const handleExportExcel = () => {
    // Prepare data for Excel
    const data = transactions.map((transaction) => ({
      Date: transaction.date,
      Type: transaction.type,
      Category: transaction.category,
      Description: transaction.description,
      Amount: transaction.type === 'income' ? transaction.amount : -transaction.amount,
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');

    // Generate Excel file
    XLSX.writeFile(wb, `transactions-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return {
    transactions,
    balance,
    handleClearTransactions,
    submitTransaction,
    handleDeleteTransaction,
    handleExportExcel,
  };
};
