import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, icon }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm ${className}`}>
      {title && (
        <div className="px-6 py-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700">
          {icon && <div className="text-orange-300 dark:text-orange-200">{icon}</div>}
          <h3 className="text-orange-300 dark:text-orange-200 font-semibold text-sm font-poppins">
            {title}
          </h3>
        </div>
      )}
      <div className="p-6 dark:text-white">{children}</div>
    </div>
  );
};
