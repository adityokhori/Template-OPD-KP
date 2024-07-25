import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselHome = () => {
  const imageUrls = [
    "https://picsum.photos/400/150?random=1",
    "https://picsum.photos/400/150?random=2",
    "https://picsum.photos/400/150?random=3",
    "https://picsum.photos/400/150?random=4",
    "https://picsum.photos/400/150?random=5",
  ];

  return (
    <div >
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        autoPlay={true}
        infiniteLoop={true}
      >
        {imageUrls.map((url, index) => (
          <Link to="/halo" key={index}>
            <div >
              <img
                src={url}
                alt={`Random ${index + 1}`}
                className="object-fit"
              />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselHome;
