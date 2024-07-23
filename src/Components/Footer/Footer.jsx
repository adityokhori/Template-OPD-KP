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
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center w-2/5">
          <div className="flex flex-col px-10 pt-2">
            <div className="flex flex-row">
              <img src="/TPI-Logo.png" className="w-20 h-auto" />
              <img src="/diskominfo_kota.png" className="w-64 h-auto" />
            </div>
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
            <div className="text-start flex flex-col pt-2">
              <Typography variant="teks">
                <CallIcon /> +62812676732579
              </Typography>
              <Typography variant="teks">
                <EmailIcon /> 12345678@gmail.com
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-3/5">
          <ListMenuFooter />
          <ListMenuFooter />
          <MapKominfo />
        </div>
      </div>
    </Box>
  );
};

export default Footer;
