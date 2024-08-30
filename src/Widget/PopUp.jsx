import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getData } from "../API/api";
import { Divider, Typography } from "@mui/material";

const Popup = ({ isOpen, onClose }) => {
  const [popupPage, setPopupPage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      getData("pengumuman", null, null)
        .then((data) => {
          const filteredData = data.pengumuman
            .filter((item) => item.tayang_khusus === "Y" && item.gambar_khusus)
            .sort((a, b) => new Date(b.tgl_terbit) - new Date(a.tgl_terbit));

          if (filteredData.length > 0) {
            setPopupPage(filteredData[0]);
          }
        })
        .catch((error) => console.error("Error fetching event:", error));
    }
  }, [isOpen]);

  if (!isOpen || !popupPage) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg relative scale-90">
        <div className="text-center">
          <Divider>
            <Typography variant="fontH2">Pengumuman Khusus</Typography>
          </Divider>
        </div>
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900 text-3xl pl-2"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="relative pt-1">
          <Link to={`/pengumuman/${popupPage.id}`}>
            <img
              src={`${process.env.VUE_APP_API_URL}image/posting/pengumuman/${process.env.VUE_APP_OPD_ID}/original/${popupPage.gambar_khusus}`}
              alt="Pengumuman Khusus"
              className="max-w-full h-auto "
            />
            <h2 className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-4 ">
              {popupPage.desk_singkat}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popup;
