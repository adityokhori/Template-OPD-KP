import React from "react";
import { Box, Typography} from "@mui/material";
import ListMenuFooter from "./ListMenuFooter";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "footer.main",
        color: "white",
        textAlign: "center",
        py: 2,
        mt: "auto",
        boxShadow: 2,
      }}
    >
      <div className="px-16 grid grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
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
        <div className="grid grid-cols-3">
          <ListMenuFooter />
          <ListMenuFooter />
          <ListMenuFooter />
        </div>
      </div>
    </Box>
  );
};

export default Footer;
