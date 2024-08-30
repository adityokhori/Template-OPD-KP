import React, { useState, useEffect } from "react";
import { Box, Typography, Pagination, Divider } from "@mui/material";
import FooterPage from "./FooterPage";
import BeritaNEWS from "../Widget/BeritaNEWS";
import { Link } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning";
import InboxIcon from "@mui/icons-material/Inbox";
import { getData } from "../API/api";

const itemsPerPage = 5;

const PengumumanPage = () => {
  const [page, setPage] = useState(1);
  const [pengumumanPage, setPengumumanPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData("pengumuman");
        if (data.pengumuman) {
          setPengumumanPage(data.pengumuman);
        } else {
          setPengumumanPage([]);
        }
      } catch (error) {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
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
      <div className="w-full flex flex-col lg:flex-row p-20">
        {/* berita */}
        <div className="w-3/5 p-4">
          <Typography variant="fontH1">Pengumuman</Typography>
          <div className="w-full">
            {loading ? (
              <Typography variant="body1">Loading...</Typography>
            ) : error ? (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            ) : pengumumanPage.length === 0 ? (
              <div className="flex items-center justify-center flex-col mt-20">
                <InboxIcon style={{ fontSize: 40, marginBottom: 10 }}/>
                <Typography variant="body1">
                  Tidak ada pengumuman yang tersedia.
                </Typography>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {newsToDisplay.map((item) => (
                  <Link to={`/pengumuman/${item.id}`} key={item.id}>
                    <div className="flex items-center border rounded-lg lg:overflow-hidden shadow-lg p-4 ">
                      <img
                        src={`${process.env.VUE_APP_API_URL}image/posting/pengumuman/${process.env.VUE_APP_OPD_ID}/original/${item.gambar}`}
                        alt={`News ${item.id}`}
                        className="w-32 h-24 object-cover mr-4"
                      />
                      <div className="lg:flex-1">
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
        <Divider orientation="vertical" flexItem />

        <div className="w-2/5 pl-4">
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
