import React, { useState, useEffect } from "react";
import { Box, Typography, Pagination, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import FooterPage from "./FooterPage";
import BeritaPopuler from "../Widget/BeritaPopuler";
import axios from "axios";
import { getData } from "../API/api";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";

const BeritaPage = () => {
  const [page, setPage] = useState(1);
  const [newsData, setNewsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData("berita");
        setNewsData(data.berita);
      } catch (error) {
        console.error("Error fetching berita data:", error);
      }
    }

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to the first page when a new search is made
  };

  const filteredNewsData = newsData.filter(
    (news) =>
      news.judul_post.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.isi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNewsData.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const newsToDisplay = filteredNewsData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getImageSrcFromIsiPost = (isiPost) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(isiPost, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.src : null;
  };

  const handleNewsClick = async (newsId) => {
    try {
      const data = { id: newsId.toString() };
      await axios.post(
        `${process.env.VUE_APP_API_URL}/api/setData/${process.env.VUE_APP_OPD_ID}`,
        { req: "klik_berita", data }
      );
      console.log(`Berita ${newsId} clicked`);
    } catch (error) {
      console.error("Error sending click data:", error);
    }
  };

  return (
    <div className="pt-4">
      <div className="w-full flex flex-col lg:flex-row p-8 lg:pt-20 space-x-4">
        {/* berita */}
        <div className="w-full lg:w-3/5">
          <div className="w-full h-1/2 p-4">
            <div className="flex justify-between">
              <Typography variant="fontH1">Berita</Typography>
              <TextField
                id="filled-search"
                label="Cari berita"
                type="search"
                variant="standard"
                sx={{
                  width: "300px",
                  height: "10px",
                }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="space-y-4 pt-4">
              {newsToDisplay.map((news) => {
                const NewsImageUnique = getImageSrcFromIsiPost(news.isi_post);
                const imageUrl =
                  NewsImageUnique ||
                  `${process.env.VUE_APP_API_URL}/image/posting/berita/${process.env.VUE_APP_OPD_ID}/original/${news.post_gambar}`;

                return (
                  <Link
                    to={`/berita/${news.id}`}
                    key={news.id}
                    onClick={() => handleNewsClick(news.id)}
                  >
                    <div className="border rounded-lg shadow-lg flex flex-row mb-4">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={`News ${news.id}`}
                          className="w-64 h-auto object-fit"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-2 overflow-hidden">
                          {news.judul_post}
                        </h3>
                        <div className="flex items-center text-sm mb-2">
                          <EventIcon className="mr-1" />
                          <p className="line-clamp-1 underline">
                            {news.tanggal_terbit}
                          </p>
                        </div>
                        <p className="text-gray-700 text-base line-clamp-3 overflow-hidden">
                          {news.isi}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
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

        {/* Divider */}
        <Divider orientation="vertical" flexItem />

        <div className="w-full pt-8 lg:w-2/5 lg:pt-0">
          <BeritaPopuler />
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default BeritaPage;
