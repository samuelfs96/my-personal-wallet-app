import React, { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { Transaction } from '@/models';
import { Pagination } from '@/components/common';

interface TransactionsProps {
  transactions: Transaction[];
}

const ITEMS_PER_PAGE = 8;

export const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-y-auto max-h-[300px] gap-2 flex flex-col">
        {currentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
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
                <p className="font-medium text-gray-900 dark:text-white">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category}</p>
              </div>
            </div>
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
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
