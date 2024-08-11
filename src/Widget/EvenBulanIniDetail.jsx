import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const EvenBulanIniDetail = ({ currentMonth }) => {
  const [currentMonthEvents, setCurrentMonthEvents] = useState([]);

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
        if (data && data.event_terbit) {
          filterCurrentMonthEvents(data.event_terbit);
        } else {
          console.error("No event data found.");
        }
      })
      .catch((error) => console.error("Error fetching event:", error));
  }, [currentMonth]);

  const filterCurrentMonthEvents = (events) => {
    const filteredEvents = events.filter((event) => {
      const eventStartDate = new Date(event.tgl_event_mulai);
      return eventStartDate.getMonth() === currentMonth;
    });
    setCurrentMonthEvents(filteredEvents);
  };

  return (
    <div className="px-4 mt-0">
      <Typography variant="h6" component="div" className="mb-4">
        Keterangan:
      </Typography>
      <div className="space-y-4 pt-2">
        {currentMonthEvents.map((event) => (
          <div key={event.id} className="border-b pb-4 shadow-md flex flex-row justify-between p-4">
            <div className="w-4/5">
              <Typography variant="h6" component="div" className="text-lg font-bold">
                {event.judul_kalender_event}
              </Typography>
              <Typography color="textSecondary">
                {event.tgl_event_mulai} - {event.tgl_event_akhir}
              </Typography>
              <Typography variant="body2" component="div">
                <div dangerouslySetInnerHTML={{ __html: event.ket_kalender_event }} />
              </Typography>
            </div>
            <div className="w-1/5">
              <img
                src={`${process.env.VUE_APP_API_URL}/image/posting/event/${process.env.VUE_APP_OPD_ID}/original/${event.gambar}`}
                alt={event.judul_kalender_event}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvenBulanIniDetail;
