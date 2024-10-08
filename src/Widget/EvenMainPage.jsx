import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  getDay,
  getDaysInMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { id } from "date-fns/locale";
import UpcomingEvent from "./UpcomingEvent";
import { Typography, Button } from "@mui/material";
import FooterPage from "../Pages/FooterPage";
import EvenBulanIniDetail from "./EvenBulanIniDetail";
import {Link} from "react-router-dom";

const EventMainPage = () => {
  const [currentMonthEvents, setCurrentMonthEvents] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentMonthName = format(today, "MMMM", { locale: id });
  const startDate = startOfMonth(today);
  const endDate = new Date(
    today.getFullYear(),
    currentMonth,
    getDaysInMonth(startDate)
  );
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
  ];

  const getColorForEvent = (eventId) => colors[eventId % colors.length];

  const handleMouseEnter = (day, events) => {
    setTooltip({
      date: day,
      description: events.map((event) => event.judul_kalender_event).join(", "),
    });
  };

  const handleMouseLeave = () => setTooltip(null);

  useEffect(() => {
    fetch(`${process.env.VUE_APP_API_URL}/api/getOPDInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kunker: process.env.VUE_APP_OPD_ID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        filterCurrentMonthEvents(data.event_terbit);
      })
      .catch((error) => console.error("Error fetching event:", error));
  }, []);

  const filterCurrentMonthEvents = (events) => {
    const filteredEvents = events.filter((event) => {
      const eventStartDate = new Date(event.tgl_event_mulai);
      return eventStartDate.getMonth() === currentMonth;
    });
    setCurrentMonthEvents(filteredEvents);
  };

  const getEventsForDay = (day) =>
    currentMonthEvents.filter((event) => {
      const eventStartDate = new Date(event.tgl_event_mulai);
      const eventEndDate = new Date(event.tgl_event_akhir);
      return (
        isSameDay(day, eventStartDate) ||
        isWithinInterval(day, { start: eventStartDate, end: eventEndDate })
      );
    });

  return (
    <div>
      <div className="flex flex-col w-full pt-24 px-8">
        <div className="flex justify-start items-center">
          <Typography variant="fontH1">Kalendar Even</Typography>
          <Button
            variant="contained"
            component={Link}
            to={"/kalendar-even-full"}
            sx={{
              ml: 2,
              bgcolor: "secondary.main",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            <Typography variant="teksButton">
              Lihat Kalendar
            </Typography>
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row ">
          <div className="p-2">
            <div className="border mt-4">
              <h2 className="text-lg font-bold text-center py-2">
                {format(today, "MMMM yyyy", { locale: id })}
              </h2>
              <div className="grid grid-cols-7 text-center text-sm">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
                  (day) => (
                    <div key={day} className="font-bold p-2">
                      {day}
                    </div>
                  )
                )}
                {Array.from({ length: getDay(startDate) }).map((_, i) => (
                  <div key={i} className="p-2"></div>
                ))}
                {days.map((day) => {
                  const eventsForDay = getEventsForDay(day);
                  return (
                    <div
                      key={day}
                      className={`relative p-1 ${
                        isSameDay(day, today)
                          ? "bg-blue-500 text-white rounded-full cursor-default"
                          : "cursor-default hover:text-black rounded"
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
                              className={`w-2 h-2 rounded-full ${getColorForEvent(
                                event.id
                              )}`}
                            ></span>
                          ))}
                        </div>
                      )}
                      {tooltip &&
                        isSameDay(day, tooltip.date) &&
                        tooltip.description && (
                          <div className="absolute z-10 w-40 p-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg transform -translate-x-1/2 left-1/2 mt-2">
                            {tooltip.description}
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 p-2">
              <UpcomingEvent currentMonth={currentMonth} />
            </div>
          </div>

          <div className="flex-1 p-2">
            {currentMonthEvents.length > 0 ? (
              <EvenBulanIniDetail currentMonth={currentMonth} />
            ) : (
              <div className="flex justify-center items-center pt-20">
                <p className="border-2 p-2">Tidak ada acara pada bulan ini.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default EventMainPage;
