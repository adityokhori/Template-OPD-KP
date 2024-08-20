import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import FooterPage from "./FooterPage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GalleryView = () => {
  const { id } = useParams();
  const [galleryData, setGalleryData] = useState([]);
  const [gallery2Data, setGallery2Data] = useState([]);

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

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          req: "gallery_album",
          limit: null,
          offset: null,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const albumGallery2 = data.gallery_album.filter(
          (item) => item.id === id
        );
        console.log(albumGallery2);
        setGallery2Data(albumGallery2);
      })
      .catch((error) => console.error("Error fetching gallery data:", error));
  }, [id]);

  return (
    <div className="pt-24">
      <div className="px-10 flex flex-col justify-start items-start">
        <div className="flex flex-col justify-between items-start">
          <Button
            variant="contained"
            component={Link}
            to={"/gallery"}
            sx={{
              p: 0.5,
              bgcolor: "secondary.main",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            <Typography variant="teksButton">
              <ArrowBackIcon
                style={{ verticalAlign: "middle", marginRight: "4px" }}
              />
              Selengkapnya
            </Typography>
          </Button>
          {galleryData.length > 0 && (
            <Typography variant="fontH2" className="pt-2">
              {galleryData[0].judul_album}
            </Typography>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-12 pb-8">
        {gallery2Data.map((item2) => (
          <Typography variant="body1" sx={{ mt: 2 }}>
            <div dangerouslySetInnerHTML={{ __html: item2.ket_album }} />
          </Typography>
        ))}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {galleryData.map((item) => (
            <Link
              to={`${process.env.VUE_APP_API_URL}image/posting/galeri/${process.env.VUE_APP_OPD_ID}/original/${item.gambar}`}
            >
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
                  <h2 className="text-xl font-bold mb-2">
                    {item.judul_gallery}
                  </h2>

                  {/* <p className="text-gray-700 text-base">
                    {item.ket_gallery.replace(/(<([^>]+)>)/gi, "")}{" "}
                  </p> */}
                  <p className="tbnext-gray-500 text-sm">{item.tgl_gambar}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default GalleryView;
