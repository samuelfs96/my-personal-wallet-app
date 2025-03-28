import React, { useState, useEffect } from 'react';

export const DigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const date = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-conic-150 from-orange-50 to-orange-100 rounded-2xl px-3 py-6 border border-orange-100 dark:border-orange-900">
        <div className="text-center">
          <div className="text-6xl font-bold font-mono text-orange-300 dark:text-orange-200">
            {hours}:{minutes}
          </div>
          <div className="text-3xl text-right italic font-bold font-mono text-orange-200 dark:text-orange-200">
            :{seconds}
          </div>
        </div>
      </div>
      <div className="text-sm text-center font-mono text-gray-500 dark:text-gray-400 mt-2">
        {date}
      </div>
    </div>
  );
};
