import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import FooterPage from "./FooterPage";
import { Link } from "react-router-dom";
import { getData } from "../API/api";

const DownloadAreaView = () => {
  const [downloadData, setDownloadData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData("download");
        setDownloadData(data.download);
      } catch (error) {
        console.error("Error fetching download area data:", error);
      }
    }

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="pt-24">
      <div className="px-12 pb-8">
        <Typography variant="h4" gutterBottom>
          Download Area
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-gray-500">
              <TableRow>
                <TableCell>
                  <h2 className="text-white font-semibold">Nama File</h2>
                </TableCell>
                <TableCell>
                  <h2 className="text-white font-semibold">Deskripsi</h2>
                </TableCell>
                <TableCell>
                  <h2 className="text-white font-semibold">Jenis File</h2>
                </TableCell>
                <TableCell>
                  <h2 className="text-white font-semibold">Kategori</h2>
                </TableCell>
                <TableCell>
                  <h2 className="text-white font-semibold">Format</h2>
                </TableCell>
                <TableCell>
                  <h2 className="text-white font-semibold">Tanggal</h2>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {downloadData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow
                    key={item.id}
                    component={Link}
                    to={`${process.env.VUE_APP_API_URL}api/getDownloadArea/${process.env.VUE_APP_OPD_ID}/${item.guid}`}
                    target="_blank"
                    style={{ textDecoration: "none", color: "inherit" }}
                    hover
                  >
                    <TableCell>{item.nama_file}</TableCell>
                    <TableCell>{item.deskripsi_file}</TableCell>
                    <TableCell>{item.jenis_file}</TableCell>
                    <TableCell>{item.kategori_dip}</TableCell>
                    <TableCell>{item.format_file}</TableCell>
                    <TableCell>{item.tanggal_file}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={downloadData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      </div>
      <FooterPage />
    </div>
  );
};

export default DownloadAreaView;
