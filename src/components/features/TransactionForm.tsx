import React, { useState } from 'react';
import { Transaction } from '@/models';
import { TransactionType } from '@/models/transactionTypes';
import { CATEGORIES } from '@/models/categories';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { TabButton } from '@/components/common';
import { Input } from '@/components/common/Input';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const initialFormData = {
  type: TransactionType.INCOME,
  amount: '',
  description: '',
  category: 'Salary',
};

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<{
    type: TransactionType;
    amount: string;
    description: string;
    category: string;
  }>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4 max-[1080px]:flex-col">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1 dark:text-gray-400">
            Type
          </label>
          <div className="flex gap-2">
            <TabButton
              text="Income"
              icon={<ArrowUpIcon className="w-5 h-5" />}
              activeColor="green"
              onClick={() =>
                setFormData(() => ({
                  ...formData,
                  type: TransactionType.INCOME,
                  category: CATEGORIES[TransactionType.INCOME][0] || '',
                }))
              }
              active={formData.type === TransactionType.INCOME}
            />
            <TabButton
              text="Expense"
              icon={<ArrowDownIcon className="w-5 h-5" />}
              activeColor="red"
              onClick={() =>
                setFormData(() => ({
                  ...formData,
                  type: TransactionType.EXPENSE,
                  category: CATEGORIES[TransactionType.EXPENSE][0] || '',
                }))
              }
              active={formData.type === TransactionType.EXPENSE}
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1 dark:text-gray-400">
            Amount
          </label>
          <Input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="0.00"
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="flex gap-4 max-[1080px]:flex-col">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1 dark:text-gray-400">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            {CATEGORIES[formData.type].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-2">
          <label className="block text-xs font-medium text-gray-700 mb-1 dark:text-gray-400">
            Description
          </label>
          <Input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors dark:focus:ring-offset-gray-800"
      >
        Add Transaction
      </button>
    </form>
  );
};
