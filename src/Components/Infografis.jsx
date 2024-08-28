import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getData } from "../API/api";

const Infografis = () => {
  const [infografisData, setInfografisData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData('infografis_album', null, null); 
        const filteredData = data.infografis_album.filter(
          (item) => item.guid_gambar !== null
        );
        setInfografisData(filteredData);
      } catch (error) {
        console.error('Error fetching infografis data:', error);
      }
    };

    fetchData();
  }, []);

  if (infografisData.length === 0) {
    return null; 
  }

  return (
    <div className="flex flex-col items-center p-2 lg:p-6 bg-primary">
      <h1 className="text-h2 lg:text-h1 font-semibold text-white">Infografis</h1>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        autoPlay={true}
        infiniteLoop={true}
        centerMode={true}
        centerSlidePercentage={33.33}
        selectedItem={1} 
      >
        {infografisData.map((item, index) => (
          <Link to={`/infografis/${item.id}`} key={index}>
            <div className="p-1 lg:p-2">
              <img
                src={`${process.env.VUE_APP_API_URL}/api/getDownloadInfografis/${process.env.VUE_APP_OPD_ID}/${item.guid_gambar}`}
                alt={item.judul}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Infografis;
