import { Balance, Card, TransactionForm, Transactions, ControlPanel } from '@/components';
import { WalletIcon, ChartBarIcon, PlusCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import '@/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Transaction } from '@/models';
import { addTransaction, clearTransactions } from '@/store/slices/transactionsSlice';
import { emptyBalance, setBalance } from '@/store/slices/walletSlice';
import { toggleDarkMode } from '@/store/slices/themeSlice';

function App() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const balance = useSelector((state: RootState) => state.wallet.balance);
  const dispatch = useDispatch();

  const handleOnChangeTheme = () => {
    dispatch(toggleDarkMode());
  };

  const handleClearTransactions = () => {
    if (
      window.confirm(
        'Are you sure you want to clear all transactions and reset balance? This action cannot be undone.'
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-5 max-[768px]:flex-col">
          <div className="flex-1 flex flex-col gap-5">
            <Card title="Balance" icon={<WalletIcon className="w-5 h-5" />}>
              <Balance amount={balance} />
            </Card>
            <Card title="Statistics" icon={<ChartBarIcon className="w-5 h-5" />}>
              <p>Soon...</p>
            </Card>
          </div>
          <div className="flex-2 flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-5 max-[768px]:grid-cols-1">
              <Card
                className="col-span-2 max-[768px]:col-span-1"
                title="New Transaction"
                icon={<PlusCircleIcon className="w-5 h-5" />}
              >
                <TransactionForm onSubmit={submitTransaction} />
              </Card>
              <Card className="max-[768px]:col-span-1">
                <ControlPanel
                  onClearTransactions={handleClearTransactions}
                  onChangeTheme={handleOnChangeTheme}
                />
              </Card>
            </div>
            <Card title="Latest Transactions" icon={<ClockIcon className="w-5 h-5" />}>
              <Transactions transactions={transactions} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
