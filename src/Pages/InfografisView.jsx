import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import FooterPage from "./FooterPage";
import { getData } from "../API/api";

const InfografisAlbumDetail = () => {
  const [images, setImages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchAlbumImages = async () => {
      try {
        const data = await getData("infografis_album", "id_infografis_album", id);
        setImages(data.infografis_album);
        console.log(data.infografis_album);
      } catch (error) {
        console.error("Error fetching album images:", error);
      }
    };
  
    fetchAlbumImages();
  }, [id]);

  return (
    <div className="pt-24">
      <div className="px-10">
        <Typography variant="fontH1">Infografis Album Detail</Typography>
      </div>
      <div className="flex flex-col justify-center items-center px-12 pb-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {images.map((image, index) => (
            <Link
              to={`${process.env.VUE_APP_API_URL}api/getDownloadInfografis/${process.env.VUE_APP_OPD_ID}/${image.guid}`}
              key={index}
            >
              <div
                key={index}
                className="border rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={`${process.env.VUE_APP_API_URL}image/posting/infografis/${process.env.VUE_APP_OPD_ID}/small/small_${image.guid}`}
                  alt={image.judul}
                  className="w-full h-auto object-fit"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{image.judul}</h2>
                  <p className="text-gray-500 text-sm">
                    {image.tanggal_terbit}
                  </p>
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

export default InfografisAlbumDetail;
