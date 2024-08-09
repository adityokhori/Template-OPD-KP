import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import FooterPage from "./FooterPage";
import BeritaHorizontal from "../Widget/BeritaHorizontal";
import BeritaPopuler from "../Widget/BeritaPopuler";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";

const BeritaView = () => {
  const { id } = useParams(); // Get the news ID from the URL
  const [news, setNews] = useState(null);

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
        const selectedNews = data.berita.find((item) => item.id === id);
        setNews(selectedNews);
      })
      .catch((error) => console.error("Error fetching berita data:", error));
  }, [id]);

  if (!news) {
    return <Typography>Loading...</Typography>;
  }

  const imageUrl = news.post_gambar
    ? `${process.env.VUE_APP_API_URL}/image/posting/berita/${process.env.VUE_APP_OPD_ID}/original/${news.post_gambar}`
    : null;

  return (
    <div className="pt-16">
      <div className="my-8 mx-16">
        <div className="flex flex-row space-x-8">
          <div className="w-2/3">
            <Typography variant="h3" component="h1" gutterBottom>
              {news.judul_post}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              display="flex"
              alignItems="center"
            >
              <EventIcon fontSize="small" style={{ marginRight: 4 }} />
              {news.tanggal_terbit} -
              <PersonIcon
                fontSize="small"
                style={{ marginLeft: 8, marginRight: 4 }}
              />
              {news.penulis}
            </Typography>
            {imageUrl && (
              <Box my={4} textAlign="center">
                <img
                  src={imageUrl}
                  alt={news.judul_post}
                  className="max-w-full h-auto"
                />
              </Box>
            )}
            <Typography variant="body1" component="div" sx={{ mt: 4 }}>
              <div
                dangerouslySetInnerHTML={{ __html: news.isi_post }}
                className="leading-relaxed"
              />
            </Typography>
            <br/>
          </div>
          <div className="w-1/3">
            <BeritaPopuler />
          </div>
        </div>
        <div className="py-4 mx-10">
          <hr className="my-4 border-t border-gray-300" />
          <BeritaHorizontal />
        </div>
      </div>

      <FooterPage />
    </div>
  );
};

export default BeritaView;
