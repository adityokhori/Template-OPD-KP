import React from "react";
import { Box, Typography } from "@mui/material";
import ListMenuFooter from "./ListMenuFooter";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import MapKominfo from "../MapKominfo";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "footer.main",
        color: "white",
      }}
    >
      <div className="px-8 flex flex-row justify-center items-center">
        <div className="flex justify-center items-center w-2/5 bg-yellow-300">
          <img src="/TPI-Logo.png" className="w-40 h-auto p-4" />
          <div className="flex flex-col">
            <Typography variant="fontH2" lineHeight={1} className="text-start">
              Dinas Komunikasi dan Informatika
            </Typography>
            <Typography
              variant="teks"
              lineHeight={1.2}
              className="text-start pt-4"
            >
              Jalan Daeng Celak, Komplek Perkantoran, Gedung C Lantai 1 & 2,
              Senggarang, Kecamatan Tanjungpinang Kota, Tanjungpinang, Kepulauan
              Riau
            </Typography>
            <div className="text-start flex flex-col">
              <Typography variant="teks">
                <CallIcon /> +62812676732579
              </Typography>
              <Typography variant="teks">
                <EmailIcon /> 12345678@gmail.com
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center bg-red-300 w-3/5">
          <ListMenuFooter />
          <ListMenuFooter />
          <MapKominfo/>
        </div>
      </div>
    </Box>
  );
};

export default Footer;
