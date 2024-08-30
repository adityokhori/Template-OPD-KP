
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { getData } from "../API/api";

const PengumumanLainnya = ({ id }) => {
  const [pengumumanLain, setPengumumanLain] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData("pengumuman");
        const filteredPengumuman = data.pengumuman.filter((item) => item.id !== id);
        setPengumumanLain(filteredPengumuman);
      } catch (error) {
        console.error("Error fetching other pengumuman data:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="mt-8">
      <Typography variant="fontH2" gutterBottom>
        Daftar Pengumuman Lainnya
      </Typography>
      <TableContainer component={Paper}  elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Judul</TableCell>
              <TableCell>Tanggal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pengumumanLain.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Link to={`/pengumuman/${item.id}`} className="text-blue-500 hover:underline">
                    {item.judul_pengumuman}
                  </Link>
                </TableCell>
                <TableCell>{item.tanggal_terbit} - {item.tanggal_akhir}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PengumumanLainnya;
