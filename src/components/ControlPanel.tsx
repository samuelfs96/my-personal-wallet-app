import React from 'react';
import { SunIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ControlPanelProps {
  onChangeTheme?: () => void;
  onClearTransactions?: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onChangeTheme,
  onClearTransactions,
}) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4">
      <button
        onClick={onChangeTheme}
        className="cursor-pointer p-4 bg-orange-50 rounded-full hover:bg-orange-100 transition-colors"
        title="Dark Mode"
      >
        <SunIcon className="w-6 h-6 text-orange-500" />
      </button>

      <button
        onClick={onClearTransactions}
        className="cursor-pointer p-4 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
        title="Clear All"
      >
        <TrashIcon className="w-6 h-6 text-red-500" />
      </button>
    </div>
  );
};
