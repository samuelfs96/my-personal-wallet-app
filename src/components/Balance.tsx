import React from 'react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/utils/currency';

interface BalanceProps {
  amount: number;
}

export const Balance: React.FC<BalanceProps> = ({ amount }) => {
  return (
    <div className="flex items-center justify-between max-[1080px]:flex-col max-[1080px]:items-start max-[1080px]:gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-50 dark:bg-green-900 rounded-full">
          <BanknotesIcon className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
          <p className="text-2xl font-semibold dark:text-white">{formatCurrency(amount)}</p>
        </div>
      </div>
      <div className="text-right max-[1080px]:w-full">
        <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
        <p className="text-sm font-medium dark:text-white">{new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};
