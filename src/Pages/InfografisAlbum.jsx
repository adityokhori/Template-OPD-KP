import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Pranala2 from "../Components/Pranala/Pranala2";
import FooterPage from "./FooterPage";
import { Link } from "react-router-dom";

const InfografisAlbum = () => {
    const [infografisData, setInfografisData] = useState([]);

    useEffect(() => {
      fetch(
        `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ req: "infografis_album" }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setInfografisData(
            data.infografis_album.filter((item) => item.guid_gambar !== null)
          );
          console.log(
            `${process.env.VUE_APP_API_URL}/api/getDownloadInfografis/${process.env.VUE_APP_OPD_ID}/${data.infografis_album[0].guid_gambar}`
          );
        })
        .catch((error) => console.error("Error fetching infografis data:", error));
    }, []);

  return (
    <div className="pt-24">
      <div className="px-10">
        <Typography variant="fontH1">Album Infografis</Typography>
      </div>
      <div className="flex flex-col justify-center items-center px-12 pb-8 ">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {infografisData.map((item) => (
            <Link to={`/infografis/${item.id}`} key={item.id}>
              <div className="border rounded-lg overflow-hidden shadow-lg ">
                <img
                  src={`${process.env.VUE_APP_API_URL}/api/getDownloadInfografis/${process.env.VUE_APP_OPD_ID}/${item.guid_gambar}`}
                  alt={item.judul}
                  className="w-full h-auto object-fit"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{item.judul}</h2>
                  <p className="text-gray-500 text-sm">{item.tanggal_terbit}</p>
                  <p className="text-gray-500 text-sm">Jumlah: {item.jum_gambar} gambar</p>
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

export default InfografisAlbum;
