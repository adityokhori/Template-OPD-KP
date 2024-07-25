import React, { useState } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Container,
  Typography,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FooterPage from "./FooterPage";

const dummyNewsData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `News Title ${i + 1}`,
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. At natus facere, error distinctio placeat ipsam praesentium, dolorum odio laborum deserunt amet. Rerum dolore vero, iure omnis nesciunt error alias fugit.`,
  imageUrl: `https://picsum.photos/180/120?random=${12 + i}`,
}));

const BeritaPage = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(dummyNewsData.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const newsToDisplay = dummyNewsData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="pt-4">
      <div className="w-full flex flex-col lg:flex-row p-8 lg:p-20">
        {/* berita */}
        <div className="w-full lg:w-3/5">
          <Typography variant="fontH1">Berita</Typography>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              bgcolor: "searchbg.main",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon className="text-black" />
            </IconButton>
          </Paper>

          <div className="w-full h-1/2 pt-8 p-4">
            <div className="space-y-4">
              {newsToDisplay.map((news) => (
                <Link to="/">
                  <div
                    key={news.id}
                    className="border rounded-lg overflow-hidden shadow-lg flex flex-row"
                  >
                    <img
                      src={news.imageUrl}
                      alt={`News ${news.id}`}
                      className="w-full h-auto object-fit"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2">{news.title}</h3>
                      <p className="text-gray-700 text-base line-clamp-3">
                        {news.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          </div>
        </div>
        <div className="w-full pt-8 lg:w-2/5 lg:pt-0 ">
          <Typography variant="fontH1">Video Terbaru</Typography>
          <div className="flex justify-center items-center border rounded-lg overflow-hidden shadow-lg p-4 mt-4">
            <iframe
              width="80%"
              height="200"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* footer */}
      <FooterPage />
    </div>
  );
};

export default BeritaPage;
