import React from 'react';

interface TabButtonProps {
  text: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  activeColor?: string;
}

export const TabButton: React.FC<TabButtonProps> = ({
  text,
  className = '',
  icon,
  onClick,
  activeColor,
  active,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} flex-1 flex items-center justify-center p-2 rounded-lg border transition-colors ${
        active
          ? `bg-${activeColor}-50 border-${activeColor}-200 text-${activeColor}-600 dark:bg-${activeColor}-900/20 dark:border-${activeColor}-800 dark:text-${activeColor}-400`
          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
      }`}
    >
      {icon && icon}
      <span className="ml-2 text-sm font-medium">{text}</span>
    </button>
  );
};
