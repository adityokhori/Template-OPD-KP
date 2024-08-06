import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Link } from "@mui/material";

const Pranala1 = () => {
  const [pranalaData, setPranalaData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    fetch(`${process.env.VUE_APP_API_URL}api/getMainPageInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ kunker: `${process.env.VUE_APP_OPD_ID}` }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPranalaData(data.pranala_luar.aplikasi);
      })
      .catch((error) =>
        console.error("Error fetching pranala data:", error)
      );
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = pranalaData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-2">
      <h1 className="text-h2 mb-4">Pranala Aplikasi  Pemerintah Kota Tanjungpinang</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src= "src/assets/logo-tpi.png" style={{ maxWidth: 30}} />
                </TableCell>
                <TableCell>
                  <Link href={item.alamat_pranala_http} target="_blank" rel="noopener noreferrer">
                    {item.nama_pranala}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pranalaData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Pranala1;
