import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import FooterPage from "./FooterPage";

const GalleryPage = () => {
  const [GAlbumData, setGAlbumData] = useState([]);
  const [viewMode, setViewMode] = useState("gallery");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ req: "gallery_album" }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setGAlbumData(data.gallery_album);
      })
      .catch((error) =>
        console.error("Error fetching gallery album data:", error)
      );
  }, []);

  const toggleViewMode = () => {
    setViewMode(viewMode === "gallery" ? "list" : "gallery");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="pt-24">
      <div className="flex justify-start items-center px-10 space-x-4">
        <Typography variant="h4">Gallery</Typography>
        <Button
          variant="outlined"
          onClick={toggleViewMode}
          sx={{
            ml: 2,
          }}
        >
          <Typography variant="teksButton">
            {viewMode === "gallery" ? "List View" : "Gallery View"}
          </Typography>
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center px-12 pb-8">
        {viewMode === "gallery" ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {GAlbumData.map((album) => (
              <Link to={`/gallery/${album.id}`} key={album.id}>
                <div className="border rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={`${process.env.VUE_APP_API_URL}/image/posting/galeri/${process.env.VUE_APP_OPD_ID}/original/${album.gambar}`}
                    alt={album.judul_album}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <Typography variant="h6" className="font-bold mb-2">
                      {album.judul_album}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700 mb-2">
                      {album.ket_album.replace(/(<([^>]+)>)/gi, "")}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {album.tanggal_terbit}
                    </Typography>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <TableContainer component={Paper} className="w-full py-4">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-300">
                  <TableCell>
                    <Typography className="font-bold">No</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="font-bold">Judul Album</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="font-bold">Keterangan</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="font-bold">
                      Tanggal Terbit
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {GAlbumData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((album, index) => (
                  <TableRow
                    component={Link}
                    to={`/gallery/${album.id}`}
                    key={album.id}
                    sx={{ textDecoration: "none" }}
                    hover
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="body1" color="primary" className="line-clamp-3">
                        {album.judul_album}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="line-clamp-3">
                        {album.ket_album.replace(/(<([^>]+)>)/gi, "")}
                      </Typography>
                    </TableCell>
                    <TableCell>{album.tanggal_terbit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={GAlbumData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </div>

      <FooterPage />
    </div>
  );
};

export default GalleryPage;
