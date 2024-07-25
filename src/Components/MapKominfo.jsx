import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {Link} from "react-router-dom";

const MapKominfo = () => {
  return (
    <div className="p-2 flex flex-col justify-center items-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31914.05422838448!2d104.41068291664122!3d0.9612961588387722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d9711ad7dbca3f%3A0x376fd724965d5ace!2sDinas%20Komunikasi%20dan%20Informatika%20Kota%20Tanjungpinang%20(Diskominfo%20Kota%20Tanjungpinang)!5e0!3m2!1sid!2sid!4v1720597483178!5m2!1sid!2sid"
        width="320"
        height="220"
        style={{ border: 5 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="grid grid-cols-3 gap-4 pt-4">
        <Link to="https://www.google.co.id/">
          <InstagramIcon/>
        </Link>
        <Link to="https://www.google.co.id/">
          <FacebookIcon />
        </Link>
        <Link to="https://www.youtube.com/">
          <YouTubeIcon />
        </Link>
      </div>
    </div>
  );
};

export default MapKominfo;
