import React, { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import { getOPDInfo } from "../API/api";

const MapKominfo = () => {
  const [sosmedData, setSosmedData] = useState({});
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    getOPDInfo()
      .then((data) => {
        try {
          const parsedData = JSON.parse(data.unker.medsos);
          setSosmedData(parsedData);
          setCoordinates(data.unker.latlng); // Extract the latlng data

        } catch (error) {
          console.error("Error parsing medsos data:", error);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  const generateMapUrl = () => {
    if (!coordinates) return "";
  
    const [lat, lng] = coordinates
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map(coord => coord.trim());
  
    return `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;
  };
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <iframe
          src={generateMapUrl()}
          width="320"
          height="220"
          style={{ border: 5 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4">
        {sosmedData.instagram && (
          <Link to={sosmedData.instagram}>
            <InstagramIcon />
          </Link>
        )}
        {sosmedData.facebook && (
          <Link to={sosmedData.facebook}>
            <FacebookIcon />
          </Link>
        )}
        {sosmedData.youtube && (
          <Link to={sosmedData.youtube}>
            <YouTubeIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MapKominfo;
