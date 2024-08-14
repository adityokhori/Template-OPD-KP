import React, { useState, useEffect } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import FooterPage from "./FooterPage";
import BeritaPopuler from "../Widget/BeritaPopuler";
import axios from "axios";

const BeritaPage = () => {
  const [page, setPage] = useState(1);
  const [newsData, setNewsData] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ req: "berita" }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.berita);
        console.log(data.berita);
      })
      .catch((error) => console.error("Error fetching berita data:", error));
  }, []);

  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const newsToDisplay = newsData.slice(
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
      <div className="w-full flex flex-col lg:flex-row p-8 lg:p-20 space-x-4">
        {/* berita */}
        <div className="w-full lg:w-3/5">
          <div className="w-full h-1/2 p-4">
            <Typography variant="fontH1">Berita</Typography>
            <div className="space-y-4">
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
        <div className="w-full pt-8 lg:w-2/5 lg:pt-0">
          <BeritaPopuler />
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default BeritaPage;
