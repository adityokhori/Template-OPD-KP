import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FooterPage from "./FooterPage";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Typography, Container } from "@mui/material";

const PagesView = () => {
  const [pageData, setPageData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          req: "halaman",
          svar: "id",
          sval: id,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        if (data && data.halaman) {
          setPageData(data.halaman);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching page data:", error));
  }, [id]);

  if (!pageData) {
    return <div>Loading...</div>;
  }

  const imageUrl = pageData.post_gambar
    ? `${process.env.VUE_APP_API_URL}/image/posting/halaman/${process.env.VUE_APP_OPD_ID}/original/${pageData.post_gambar}`
    : null;

  return (
    <div className=" pt-20">
      <div className="mx-14 flex flex-col justify-center items-center p-6 bg-gray-100">
        <h1 className="text-h1">{pageData.judul_post}</h1>
        <div className="flex flex-col mt-2 justify-center items-center">
          <img src={imageUrl} className="w-1/2"/>
          <div className="px-4 flex flex-col mt-4">
            <div dangerouslySetInnerHTML={{ __html: pageData.isi_post }} />
            <div className="flex flex-row space-x-2 pt-16">
              <Typography>
                <EventIcon fontSize="small" /> {pageData.tanggal_tulis}
              </Typography>
              <Typography>
                <PersonIcon fontSize="small" /> <strong>oleh:</strong>{" "}
                {pageData.penulis}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default PagesView;
