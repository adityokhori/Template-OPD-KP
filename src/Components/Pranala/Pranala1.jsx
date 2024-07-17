import React from "react";
import {Box, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Pranala1 = () => {
  const imageUrls = [
    "https://picsum.photos/120/60?random=1",
    "https://picsum.photos/120/60?random=2",
    "https://picsum.photos/120/60?random=3",
    "https://picsum.photos/120/60?random=4",
    "https://picsum.photos/120/60?random=5",
    "https://picsum.photos/120/60?random=6",
    "https://picsum.photos/120/60?random=7",
    "https://picsum.photos/120/60?random=8",
    "https://picsum.photos/120/60?random=9",
    "https://picsum.photos/120/60?random=10",
    "https://picsum.photos/120/60?random=11",
    "https://picsum.photos/120/60?random=12",
  ];

  return (
    <div className="p-6">
        <Typography variant="fontH2">
            Pranala Website Tanjungpinang
        </Typography>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        autoPlay={true}
        infiniteLoop={true}
        centerMode={true}
        centerSlidePercentage={25}
        showArrows={true}
      >
        {imageUrls.map((url, index) => (
          <Link to="/halo" key={index}>
            <div key={index} className="p-4 bg-gray-200">
              <img src={url} alt={`Random ${index + 1}`} />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};
export default Pranala1;
