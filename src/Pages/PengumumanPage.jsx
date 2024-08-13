import React, { useState, useEffect } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import FooterPage from "./FooterPage";
import BeritaNEWS from "../Widget/BeritaNEWS";
import { Link } from "react-router-dom";

const itemsPerPage = 5;

const PengumumanPage = () => {
  const [page, setPage] = useState(1);
  const [pengumumanPage, setPengumumanPage] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          req: "pengumuman",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.pengumuman) {
          setPengumumanPage(data.pengumuman);
        } else {
          setPengumumanPage([]);
        }
        setLoading(false);
        console.log(data.pengumuman);
      })
      .catch((error) => {
        setError("Error fetching data.");
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const totalPages = Math.ceil(pengumumanPage.length / itemsPerPage);
  const newsToDisplay = pengumumanPage.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="pt-4">
      <div className="w-full flex flex-row p-20">
        {/* berita */}
        <div className="w-3/5">
          <Typography variant="fontH1">Pengumuman</Typography>
          <div className="w-full">
            {loading ? (
              <Typography variant="body1">Loading...</Typography>
            ) : error ? (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            ) : pengumumanPage.length === 0 ? (
              <Typography variant="body1">Tidak ada pengumuman yang tersedia.</Typography>
            ) : (
              <div className="flex flex-col gap-4">
                {newsToDisplay.map((item) => (
                  <Link to={`/pengumuman/${item.id}`} key={item.id}>
                    <div
                      className="flex items-center border rounded-lg overflow-hidden shadow-lg p-4"
                    >
                      <img
                        src={`${process.env.VUE_APP_API_URL}image/posting/pengumuman/${process.env.VUE_APP_OPD_ID}/original/${item.gambar}`}
                        alt={`News ${item.id}`}
                        className="w-32 h-24 object-cover mr-4"
                      />
                      <div className="flex-1">
                        <Typography variant="h6" className="font-bold mb-1">
                          {item.judul_pengumuman}
                        </Typography>
                        <Typography variant="body2">
                          {item.desk_singkat}
                        </Typography>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="flex justify-center mt-4">
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-2/5 pl-8">
          <div>
            <BeritaNEWS />
          </div>
        </div>
      </div>

      {/* footer */}
      <FooterPage />
    </div>
  );
};

export default PengumumanPage;
