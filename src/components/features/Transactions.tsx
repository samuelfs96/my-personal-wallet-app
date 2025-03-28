import React, { useState } from 'react';
import { Transaction } from '@/models';
import { Pagination } from '@/components/common';
import { TransactionInfo } from '@/components/features';

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
      <div className="overflow-y-auto max-h-[400px] gap-2 flex flex-col">
        {currentTransactions.map((transaction) => (
          <TransactionInfo key={transaction.id} transaction={transaction} />
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
