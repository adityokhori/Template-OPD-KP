import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Pranala2 from "../Components/Pranala/Pranala2";
import FooterPage from "./FooterPage";
import { Link } from "react-router-dom";

const GalleryPage = () => {
  const [GAlbumData, setGAlbumData] = useState([]);

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
      .catch((error) => console.error("Error fetching gallery album data:", error));
  }, []);

  return (
    <div className="pt-24">
      <div className="px-10">
        <Typography variant="fontH1">Gallery</Typography>
      </div>
      <div className="flex flex-col justify-center items-center px-12 pb-8 ">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {GAlbumData.map((album) => (
            <Link to={`/gallery/${album.id}`} key={album.id}>
              <div className="border rounded-lg overflow-hidden shadow-lg ">
                <img
                  src={`${process.env.VUE_APP_API_URL}/image/posting/galeri/${process.env.VUE_APP_OPD_ID}/original/${album.gambar}`}
                  alt={album.judul_album}
                  className="w-full h-auto object-fit"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{album.judul_album}</h2>
                  <p className="text-gray-700 text-base">
                    {album.ket_album.replace(/(<([^>]+)>)/gi, "")} {/* Remove HTML tags */}
                  </p>
                  <p className="text-gray-500 text-sm">{album.tanggal_terbit}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* <div className="w-4/5">
          <Pranala2 />
        </div> */}
      </div>

      <FooterPage />
    </div>
  );
};

export default GalleryPage;
