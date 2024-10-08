import React, { useState, useEffect } from "react";
import { Box, Typography, Pagination, Divider } from "@mui/material";
import FooterPage from "./FooterPage";
import { Link } from "react-router-dom";
import BeritaNEWS from "../Widget/BeritaNEWS";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import { getData } from "../API/api";

const ArtikelPage = () => {
  const [page, setPage] = useState(1);
  const [artikelData, setArtikelData] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData("artikel");
        setArtikelData(data.artikel);
      } catch (error) {
        console.error("Error fetching berita data:", error);
      }
    }

    fetchData();
  }, []);
  
  const totalPages = Math.ceil(artikelData.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const artikelToDisplay = artikelData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getImageSrcFromIsiPost = (isiPost) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(isiPost, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.src : null;
  };

  return (
    <div className="pt-4">
      <div className="w-full flex flex-col lg:flex-row p-20">
        {/* berita */}
        <div className="w-full lg:w-3/5 p-4">
          <Typography variant="fontH1">Artikel</Typography>
          <div>
            <div>
              {artikelToDisplay.map((artikel) => {
                const NewsImageUnique = getImageSrcFromIsiPost(
                  artikel.isi_post
                );
                const imageUrl =
                  NewsImageUnique ||
                  `${process.env.VUE_APP_API_URL}/image/posting/artikel/${process.env.VUE_APP_OPD_ID}/original/${artikel.post_gambar}`;

                return (
                  <Link to={`/artikel/${artikel.id}`} key={artikel.id}>
                    <div className="border rounded-lg  shadow-lg flex flex-row mb-4">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={`News ${artikel.id}`}
                          className="w-64 h-auto object-fit"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-2 overflow-hidden">
                          {artikel.judul_post}
                        </h3>
                        <p className="text-gray-700 text-base line-clamp-3 overflow-hidden">
                          <EventIcon
                            fontSize="small"
                            style={{ marginRight: 4 }}
                          />
                          {artikel.tanggal_terbit} - Oleh{" "}
                          <PersonIcon
                            fontSize="small"
                            style={{ marginRight: 4 }}
                          />
                          {artikel.penulis}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          </div>
        </div>
        <Divider orientation="vertical" flexItem />

        <div className="w-full lg:w-2/5 pl-4">
          {/* <div>
            <Typography variant="fontH1">Video Terbaru</Typography>
            <div className="flex justify-center items-center border rounded-lg overflow-hidden shadow-lg p-4">
              <iframe
                width="80%"
                height="200"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div> */}
          <BeritaNEWS />
        </div>
      </div>

      {/* footer */}
      <FooterPage />
    </div>
  );
};

export default ArtikelPage;
