import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import FooterPage from "./FooterPage";

const GalleryView = () => {
  const { id } = useParams();
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          req: "gallery",
          limit: null,
          offset: null,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const albumGallery = data.gallery.filter(
          (item) => item.id_gallery_album === id
        );
        setGalleryData(albumGallery);
      })
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, [id]);

  return (
    <div className="pt-24">
      <div className="px-10 flex flex-col justify-start items-start">
        <Typography variant="fontH1">Gallery :</Typography>
        <div className="flex flex-row justify-between items-center">
          {galleryData.length > 0 && (
            <Typography variant="fontH1">
              {" "}
              {galleryData[0].judul_album}
            </Typography>
          )}
          <Button
            variant="contained"
            component={Link}
            to="/gallery"
            sx={{
              ml: 2,
              bgcolor: "secondary.main",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            <Typography variant="teksButton">Selengkapnya</Typography>
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-12 pb-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {galleryData.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={`${process.env.VUE_APP_API_URL}/image/posting/galeri/${process.env.VUE_APP_OPD_ID}/original/${item.gambar}`}
                alt={item.judul_gallery}
                className="w-full h-auto object-fit"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{item.judul_gallery}</h2>
                <p className="text-gray-700 text-base">
                  {item.ket_gallery.replace(/(<([^>]+)>)/gi, "")}{" "}
                  {/* Remove HTML tags */}
                </p>
                <p className="text-gray-500 text-sm">{item.tgl_gambar}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default GalleryView;
