import React from 'react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/utils/currency';

interface BalanceProps {
  amount: number;
}

export const Balance: React.FC<BalanceProps> = ({ amount }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-50 rounded-lg">
          <BanknotesIcon className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Current Balance</p>
          <p className="text-2xl font-semibold">{formatCurrency(amount)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Last Updated</p>
        <p className="text-sm font-medium">{new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};
