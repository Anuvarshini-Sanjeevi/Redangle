import { useEffect, useState } from 'react';

interface DashboardHeaderProps {
  title?: string;
}

const DashboardHeader = ({ title = 'DASHBOARD' }: DashboardHeaderProps) => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setCurrentDate(date);
      setCurrentTime(time);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-5 py-2 md:py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
        <div className="flex flex-col items-end text-xs sm:text-sm">
          <span className="text-gray-900 font-bold">DATE : {currentDate}</span>
          <span className="text-gray-900 font-bold">TIME : {currentTime}</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
