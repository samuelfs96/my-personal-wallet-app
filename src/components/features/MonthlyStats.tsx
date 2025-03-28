import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '@/models';
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';

interface MonthlyStatsProps {
  transactions: Transaction[];
}

interface MonthlyData {
  _date: Date;
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export const MonthlyStats: React.FC<MonthlyStatsProps> = ({ transactions }) => {
  const getMonthlyData = (): MonthlyData[] => {
    const monthlyData: { [key: string]: MonthlyData } = {};

    transactions.forEach((transaction) => {
      // Parse the date string (assuming format DD/MM/YYYY)
      const dateParts = transaction.date.split('/');
      if (dateParts.length !== 3) return; // Skip invalid dates

      const [dayStr, monthStr, yearStr] = dateParts;
      const month = parseInt(monthStr ?? '0', 10);
      const day = parseInt(dayStr ?? '0', 10);
      const year = parseInt(yearStr ?? '0', 10);

      // Skip if any part is invalid
      if (isNaN(month) || isNaN(day) || isNaN(year)) return;

      const date = new Date(year, month - 1); // month is 0-based in JavaScript Date
      const monthKey = `${year}-${month}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          _date: date,
          month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
          income: 0,
          expenses: 0,
          balance: 0,
        };
      }

      if (transaction.type === 'income') {
        monthlyData[monthKey].income += transaction.amount;
        monthlyData[monthKey].balance += transaction.amount;
      } else {
        monthlyData[monthKey].expenses += transaction.amount;
        monthlyData[monthKey].balance -= transaction.amount;
      }
    });

    return Object.values(monthlyData).sort(
      (a, b) => new Date(a._date).getTime() - new Date(b._date).getTime()
    );
  };

  const data = getMonthlyData();

  return (
    <div className="flex flex-col-reverse gap-8">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
            <XAxis
              dataKey="month"
              className="dark:text-gray-400 text-sm"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis className="dark:text-gray-400 text-sm" tick={{ fill: 'currentColor' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                color: '#1f2937',
              }}
              labelStyle={{ color: '#4b5563' }}
            />

            <Bar
              dataKey="income"
              fill="oklch(0.765 0.177 163.223)"
              name="Income"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              fill="oklch(0.704 0.191 22.216)"
              name="Expenses"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-12 max-[768px]:gap-4">
        <div className="flex flex-col items-center justify-center">
          <ArrowTrendingUpIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
            ${data.reduce((sum, month) => sum + month.income, 0).toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ArrowTrendingDownIcon className="w-8 h-8 text-red-400 dark:text-red-300" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
          <p className="text-lg font-semibold text-red-400 dark:text-red-300">
            ${data.reduce((sum, month) => sum + month.expenses, 0).toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <CircleStackIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Net Balance</p>
          <p className={`text-lg font-semibold text-gray-500 dark:text-gray-400`}>
            ${data.reduce((sum, month) => sum + month.balance, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
