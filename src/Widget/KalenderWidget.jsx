import React from 'react';
import { format, startOfYear, endOfYear, eachDayOfInterval, getMonth, isSameDay } from 'date-fns';

const KalenderWidget = ({ year }) => {
  const startDate = startOfYear(new Date(year, 0, 1));
  const endDate = endOfYear(new Date(year, 11, 31));
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const today = new Date();

  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {months.map(month => (
        <div key={month} className="border p-2">
          <h2 className="text-lg font-bold mb-2">{format(new Date(year, month, 1), 'MMMM')}</h2>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-bold">{day}</div>
            ))}
            {days.filter(day => getMonth(day) === month).map(day => (
              <div 
                key={day} 
                className={`p-1 ${isSameDay(day, today) ? 'bg-blue-500 text-white rounded-full cursor-default' : 'cursor-default hover:bg-gray-200 hover:text-black rounded'}`}
              >
                {format(day, 'd')}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KalenderWidget;
