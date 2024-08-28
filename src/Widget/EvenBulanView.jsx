import React, { useState, useEffect } from "react";
import {
  format,
  startOfYear,
  eachDayOfInterval,
  isSameDay,
  getMonth,
  isWithinInterval,
} from "date-fns";
import { useNavigate } from "react-router-dom";

const EvenTahunIni = ({ year }) => {
  const [yearEvents, setYearEvents] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const startDate = startOfYear(new Date(year, 0, 1));
  const endDate = new Date(year, 11, 31);
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const today = new Date();
  const months = Array.from({ length: 12 }, (_, i) => i);
  const navigate = useNavigate();

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
  ];

  const getColorForEvent = (eventId) => {
    return colors[eventId % colors.length];
  };

  const handleMouseEnter = (day, events) => {
    setTooltip({
      date: day,
      description: events.map((event) => event.judul_kalender_event).join(", "),
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  useEffect(() => {
    getOPDInfo()
      .then((data) => {
        filterYearEvents(data.event_terbit);
      })
      .catch((error) => console.error("Error fetching event:", error));
  }, []);

  const filterYearEvents = (events) => {
    const filteredEvents = events.filter((event) => {
      const eventStartDate = new Date(event.tgl_event_mulai);
      return eventStartDate.getFullYear() === year;
    });
    setYearEvents(filteredEvents);
  };

  const getEventsForDay = (day) => {
    return yearEvents.filter((event) => {
      const eventStartDate = new Date(event.tgl_event_mulai);
      const eventEndDate = new Date(event.tgl_event_akhir);
      return isWithinInterval(day, { start: eventStartDate, end: eventEndDate });
    });
  };

  const handleMonthClick = (month) => {
    navigate(`/even-bulan-view/${year}/${month}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {months.map((month) => (
        <div
          key={month}
          className="border p-2 cursor-pointer"
          onClick={() => handleMonthClick(month)}
        >
          <h2 className="text-lg font-bold mb-2">
            {format(new Date(year, month, 1), "MMMM")}
          </h2>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-bold">
                {day}
              </div>
            ))}
            {Array.from({
              length: new Date(year, month, 1).getDay(),
            }).map((_, i) => (
              <div key={i} className="p-2"></div>
            ))}
            {days
              .filter((day) => getMonth(day) === month)
              .map((day) => {
                const eventsForDay = getEventsForDay(day);
                return (
                  <div
                    key={day}
                    className={`relative p-1 ${
                      isSameDay(day, today)
                        ? "bg-blue-500 text-white rounded-full cursor-default"
                        : "cursor-default hover:bg-gray-200 hover:text-black rounded"
                    }`}
                    onMouseEnter={() => handleMouseEnter(day, eventsForDay)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {format(day, "d")}
                    {eventsForDay.length > 0 && (
                      <div className="flex justify-center items-center mt-1 space-x-1">
                        {eventsForDay.map((event) => (
                          <span
                            key={event.id}
                            className={`w-2 h-2 rounded-full ${getColorForEvent(event.id)}`}
                          ></span>
                        ))}
                      </div>
                    )}
                    {tooltip && isSameDay(day, tooltip.date) && (
                      <div className="absolute z-10 w-40 p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg transform -translate-x-1/2 left-1/2 mt-2">
                        {tooltip.description}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EvenTahunIni;
