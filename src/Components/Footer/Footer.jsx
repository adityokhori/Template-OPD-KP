import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ListMenuFooter from "./ListMenuFooter";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import MapKominfo from "../MapKominfo";

const Footer = () => {
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.VUE_APP_API_URL}/api/getOPDInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ kunker: process.env.VUE_APP_OPD_ID }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFooterData(data.unker);
        console.log(data.unker);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    // <div className="flex flex-col lg:flex-row justify-center items-center bg-green-300">
    //   {/* div green */}
      <div className="w-full flex flex-row text-white">

        <div className="flex flex-col justify-center items-center w-1/2">
          <div className="flex flex-col pt-2 ">

            <div className="flex flex-row justify-start items-center space-x-2 pb-2">
              <img src="/TPI-Logo.png" className="w-16 lg:w-12 h-auto" />
              <img src="/diskominfo_kota.png" className="w-52 lg:w-52 h-auto" />
            </div>
            
            <div>
              <Typography
                variant="fontH3"
                lineHeight={1}
                className="pt-4 text-center lg:text-start"
              >
                {footerData.nunker}
              </Typography>
              <br />
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
        </div>

        <div className=" flex flex-col lg:flex-row justify-between items-start pt-8 lg:pt-8">
          <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 w-full">
            <div className="flex-1 ">
              <ListMenuFooter />
            </div>
            <div className="flex-1">
              <MapKominfo />
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Footer;
