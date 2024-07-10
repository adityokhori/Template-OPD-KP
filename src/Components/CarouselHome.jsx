import React from "react";
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
    <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={true}>
      {imageUrls.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Random ${index + 1}`} />
          <p className="legend">Image {index + 1}</p>
        </div>
      ))}
    </Carousel>
  );
};
export default CarouselHome;
