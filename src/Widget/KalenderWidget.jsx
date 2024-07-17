import React, { useState } from 'react';
import { format, startOfYear, endOfYear, eachDayOfInterval, getMonth, isSameDay, parseISO, startOfMonth, getDay } from 'date-fns';

const importantDates = [
  { date: '2024-07-17', description: 'Important Event' },
  { date: '2024-05-05', description: 'Important Event dwajbdawkbdaw' },
  { date: '2024-05-20', description: 'Important Event dwajbdawkbdawkbdaw' },
  { date: '2024-10-17', description: 'Important Event dwajbdawkbdawkbdaw' },
  { date: '2024-11-11', description: 'Hari Ulang Tahun' },
  { date: '2024-04-01', description: 'Important Event dwajbdawkbdawkbdaw' },
  { date: '2024-01-07', description: 'Important Event dwajbdawkbdawkbdaw' },
  { date: '2024-02-24', description: 'Important Event dwajbdawkbdawkbdaw' },
  { date: '2024-03-12', description: 'Important Event dwajbdawkbdawkbdaw' },
];

const KalenderWidget = ({ year }) => {
  const [tooltip, setTooltip] = useState(null);

  const startDate = startOfYear(new Date(year, 0, 1));
  const endDate = endOfYear(new Date(year, 11, 31));
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const today = new Date();

  const months = Array.from({ length: 12 }, (_, i) => i);

  const isImportantDate = (day) => {
    return importantDates.some(event => isSameDay(day, parseISO(event.date)));
  };

  const getEventDescription = (day) => {
    const event = importantDates.find(event => isSameDay(day, parseISO(event.date)));
    return event ? event.description : '';
  };

  const handleMouseEnter = (day) => {
    if (isImportantDate(day)) {
      setTooltip({
        date: day,
        description: getEventDescription(day),
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="relative p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {months.map(month => (
        <div key={month} className="border p-2">
          <h2 className="text-lg font-bold mb-2">{format(new Date(year, month, 1), 'MMMM')}</h2>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-bold">{day}</div>
            ))}
            {Array.from({ length: getDay(startOfMonth(new Date(year, month, 1))) }).map((_, i) => (
              <div key={i} className="p-1"></div>
            ))}
            {days.filter(day => getMonth(day) === month).map(day => (
              <div 
                key={day} 
                className={`relative p-1 ${isSameDay(day, today) ? 'bg-blue-500 text-white rounded-full cursor-default' : 'cursor-default hover:bg-gray-200 hover:text-black rounded'} ${isImportantDate(day) ? 'bg-red-500 text-white rounded-full' : ''}`}
                onMouseEnter={() => handleMouseEnter(day)}
                onMouseLeave={handleMouseLeave}
              >
                {format(day, 'd')}
                {tooltip && isSameDay(day, tooltip.date) && (
                  <div className="absolute z-10 w-40 p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg transform -translate-x-1/2 left-1/2 mt-2">
                    {tooltip.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KalenderWidget;
