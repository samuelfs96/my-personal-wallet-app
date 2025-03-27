import React from 'react';
import { BanknotesIcon } from '@heroicons/react/24/outline';

interface BalanceProps {
  amount: number;
}

export const Balance: React.FC<BalanceProps> = ({ amount }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 rounded-full">
          <BanknotesIcon className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Current Balance</h3>
          <p className="text-2xl font-semibold text-gray-900">{formatCurrency(amount)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Last updated</p>
        <p className="text-sm font-medium text-gray-900">{new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};
