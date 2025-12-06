import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
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
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 md:py-5 flex-shrink-0">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
          </button>
          <div className="flex flex-col items-end text-base sm:text-lg">
            <span className="text-gray-900 font-bold">DATE: {currentDate}</span>
            <span className="text-gray-900 font-bold">TIME: {currentTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

