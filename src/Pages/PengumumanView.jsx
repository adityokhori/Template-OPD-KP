import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import FooterPage from "./FooterPage";
import BeritaNEWS from "../Widget/BeritaNEWS";
import { useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";


const PengumumanView = () => {
  const { id } = useParams();
  const [pengumuman, setPengumuman] = useState(null);

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
        const foundPengumuman = data.pengumuman.find((item) => item.id === id);
        setPengumuman(foundPengumuman);
        console.log(foundPengumuman);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  return (
    <div className="mt-24 w-full ">
      <div className="flex flex-row p-10">
        <div className="p-2 w-2/3 ">
          {pengumuman ? (
            <Card key={pengumuman.id} sx={{ mb: 2 }}>
              <Typography variant="fontH1">
                {pengumuman.judul_pengumuman}
              </Typography>
              {pengumuman.gambar && (
                <img
                  src={`${process.env.VUE_APP_API_URL}image/posting/pengumuman/${process.env.VUE_APP_OPD_ID}/original/${pengumuman.gambar}`}
                  alt={`Pengumuman ${pengumuman.id}`}
                  className="w-1/2 h-auto object-cover mr-4"
                />
              )}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <div
                    dangerouslySetInnerHTML={{ __html: pengumuman.isi }}
                    className="leading-relaxed"
                  />
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  justifyContent="end"
                  paddingTop={4}
                >
                  Penulis:
                  <PersonIcon
                    fontSize="small"
                    style={{ marginLeft: 8, marginRight: 4 }}
                  />
                  {pengumuman.penulis}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Loading...
            </Typography>
          )}
        </div>

        <div className="w-1/3 pl-8">
          <div>
            <BeritaNEWS />
          </div>
        </div>
      </div>

      <FooterPage />
    </div>
  );
};

export default PengumumanView;
