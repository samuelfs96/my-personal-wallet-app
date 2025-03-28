import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Transaction } from '@/models';
import { useTransactions } from '@/hooks/useTransactions';

interface TransactionInfoProps {
  transaction: Transaction;
}

export const TransactionInfo: React.FC<TransactionInfoProps> = ({ transaction }) => {
  const { handleDeleteTransaction } = useTransactions();
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            transaction.type === 'income'
              ? 'bg-green-50 dark:bg-green-300'
              : 'bg-red-50 dark:bg-red-300'
          }`}
        >
          {transaction.type === 'income' ? (
            <ArrowUpIcon className="w-5 h-5 text-green-600" />
          ) : (
            <ArrowDownIcon className="w-5 h-5 text-red-600" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p
            className={`font-medium ${
              transaction.type === 'income'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">{transaction.date}</p>
        </div>
        <button
          onClick={() => handleDeleteTransaction(transaction.id)}
          className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          title="Delete transaction"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
