import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";

const UpcomingEvent = ({ currentMonth }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
        filterEvents(data.event_terbit);
      })
      .catch((error) => console.error("Error fetching event:", error));
  }, [currentMonth]);

  const filterEvents = (events) => {
    const upcomingEvents = events.filter((event) => {
      const eventStartDate = new Date(event.tgl_event_mulai);
      return eventStartDate.getMonth() !== currentMonth;
    });
    setFilteredEvents(upcomingEvents);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Typography variant="h6" sx={{ padding: 2 }}>
        Upcoming Events (Outside This Month)
      </Typography>
      <div className="shadow-md">
        <Table>
          <TableBody>
            {filteredEvents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.judul_kalender_event}</TableCell>
                  <TableCell>{event.tanggal_event_mulai}</TableCell>
                  <TableCell>{event.tanggal_event_akhir}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UpcomingEvent;
