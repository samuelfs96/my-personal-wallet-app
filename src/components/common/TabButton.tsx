import React from 'react';

interface TabButtonProps {
  text: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  activeColor?: 'green' | 'red';
}

export const TabButton: React.FC<TabButtonProps> = ({
  text,
  className = '',
  icon,
  onClick,
  activeColor,
  active,
}) => {
  const getActiveStyles = () => {
    switch (activeColor) {
      case 'green':
        return active
          ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400'
          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700';
      case 'red':
        return active
          ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400'
          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700';
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} cursor-pointer flex-1 flex items-center justify-center p-2 rounded-lg border transition-colors ${getActiveStyles()}`}
    >
      {icon && icon}
      <span className="ml-2 text-sm font-medium">{text}</span>
    </button>
  );
};
