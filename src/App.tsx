import React from 'react';
import { WalletIcon, ChartBarIcon, PlusCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Card } from '@/components/common';
import {
  ControlPanel,
  TransactionForm,
  Transactions,
  Balance,
  MonthlyStats,
  DigitalClock,
} from '@/components/features';
import { useTransactions, useTheme } from '@/hooks';

export const App: React.FC = () => {
  const { transactions, balance, handleClearTransactions, submitTransaction, handleExportExcel } =
    useTransactions();
  const { handleOnChangeTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-5 max-[768px]:flex-col">
          <div className="flex-1 flex flex-col gap-5">
            <Card title="My personal wallet" icon={<WalletIcon className="w-5 h-5" />}>
              <Balance amount={balance} />
            </Card>
            <Card>
              <ControlPanel
                onClearTransactions={handleClearTransactions}
                onChangeTheme={handleOnChangeTheme}
                handleExportExcel={handleExportExcel}
              />
            </Card>
            <Card title="Latest Transactions" icon={<ClockIcon className="w-5 h-5" />}>
              <Transactions transactions={transactions} />
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
              <Card
                className="max-[768px]:col-span-1"
                title="Current Time"
                icon={<ClockIcon className="w-5 h-5" />}
              >
                <DigitalClock />
              </Card>
            </div>
            <Card title="Monthly Stats" icon={<ChartBarIcon className="w-5 h-5" />}>
              <MonthlyStats transactions={transactions} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
