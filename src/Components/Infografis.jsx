import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Infografis = () => {
  const imageUrls = [
    "https://picsum.photos/120/180?random=1",
    "https://picsum.photos/120/180?random=2",
    "https://picsum.photos/120/180?random=3",
    "https://picsum.photos/120/180?random=4",
    "https://picsum.photos/120/180?random=5",
    "https://picsum.photos/120/180?random=6",
    "https://picsum.photos/120/180?random=7",
    "https://picsum.photos/120/180?random=8",
    "https://picsum.photos/120/180?random=9",
    "https://picsum.photos/120/180?random=10",
    "https://picsum.photos/120/180?random=11",
    "https://picsum.photos/120/180?random=12",
  ];

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
        centerSlidePercentage={30}
      >
        {imageUrls.map((url, index) => (
          <Link to="/halo" key={index}>
            <div key={index} className="p-1 lg:p-4">
              <img src={url} alt={`Random ${index + 1}`} />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Infografis;
