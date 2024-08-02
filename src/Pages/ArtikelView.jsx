import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import FooterPage from "./FooterPage";

const ArtikelView = () => {
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ req: "artikel" }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const selectedArtikel = data.artikel.find(
          (item) => item.id === id
        );
        setArtikel(selectedArtikel);
      })
      .catch((error) => console.error("Error fetching Artikel data:", error));
  }, [id]);

  if (!artikel) {
    return <Typography>Loading...</Typography>;
  }

  const imageUrl =
    artikel.post_gambar 
      ? `${process.env.VUE_APP_API_URL}/image/posting/Artikel/${process.env.VUE_APP_OPD_ID}/original/${artikel.post_gambar}`
      : null;

  return (
    <div className="pt-16">
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {artikel.judul_post}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {artikel.tanggal_terbit} - Oleh {artikel.penulis}
          </Typography>
          {imageUrl && (
            <Box my={4} textAlign="center">
              <img
                src={imageUrl}
                alt={artikel.judul_post}
                className="max-w-full h-auto"
              />
            </Box>
          )}
          <Typography variant="body1" component="div" sx={{ mt: 4 }}>
            <div
              dangerouslySetInnerHTML={{ __html: artikel.isi_post }}
              className="leading-relaxed"
            />
          </Typography>
        </Box>
      </Container>

      {/* footer */}
      <FooterPage />
    </div>
  );
};

export default ArtikelView;
