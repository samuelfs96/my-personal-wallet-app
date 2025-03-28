import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { clearTransactions, addTransaction } from '@/store/slices/transactionsSlice';
import { emptyBalance, setBalance } from '@/store/slices/walletSlice';
import { Transaction } from '@/models';

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

  return {
    transactions,
    balance,
    handleClearTransactions,
    submitTransaction,
  };
};
