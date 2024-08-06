import React, {useState, useEffect} from "react";
import { Box, Typography } from "@mui/material";
import ListMenuFooter from "./ListMenuFooter";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import MapKominfo from "../MapKominfo";

const Footer = () => {

  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getOPDInfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kunker: process.env.VUE_APP_OPD_ID}),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFooterData(data.unker);
        console.log(data.unker)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      <div className="flex flex-col lg:flex-row justify-center items-start">
        <div className="flex flex-col justify-center items-center w-full lg:w-2/5">
          <div className="flex flex-col px-0 lg:px-10 pt-2">
            <div className="flex flex-row justify-center items-center space-x-2">
              <img src="/TPI-Logo.png" className="w-16 lg:w-20 h-auto" />
              <img src="/diskominfo_kota.png" className="w-52 lg:w-64 h-auto" />
            </div>

            <Typography
              variant="fontH2"
              lineHeight={1}
              className="pt-4 text-center lg:text-start "
            >
              {footerData.nunker}
            </Typography>
            <Typography
              variant="teks"
              lineHeight={1.2}
              className="text-center lg:text-start pt-4"
            >
              {footerData.alamat}
            </Typography>
            <div className="text-center lg:text-start flex flex-col pt-2">
              <Typography variant="teks">
                <EmailIcon /> {footerData.email}
              </Typography>
              <Typography variant="teks">
                <CallIcon /> {footerData.telp}
              </Typography>
            </div>
          </div>
        </div>

        <div className="w-3/5 lg:flex justify-between items-center pt-8 lg:pt-8">
          <div className="flex justify-between items-center">
            <ListMenuFooter />
          </div>
          <MapKominfo />
        </div>
      </div>
    </Box>
  );
};

export default Footer;
