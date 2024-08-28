import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getOPDInfo } from "../API/api";

const CarouselHome = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    getOPDInfo()
      .then((data) => {
        if (Array.isArray(data.banner) && data.banner.length > 0) {
          setCarouselData(data.banner);
        } else {
          setCarouselData([]); 
        }
      })
      .catch((error) => console.error("Error fetching carousel home data:", error));
  }, []);

  if (carouselData.length === 0) {
    return null;
  }

  return (
    <div className="pb-4">
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        autoPlay={true}
        infiniteLoop={true}
      >
        {carouselData.map((imageName, index) => {
          console.log(`Image Name [${index}]:`, imageName);
          return (
            <Link to="/halo" key={index}>
              <div>
                <img
                  src={`${process.env.VUE_APP_API_URL}/image/banner/${process.env.VUE_APP_OPD_ID}/${imageName}`}
                  alt={`Banner ${index}`} 
                  className="object-fit"
                />
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselHome;
