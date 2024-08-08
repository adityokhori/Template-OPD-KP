import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Infografis = () => {
  const [infografisData, setInfografisData] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ req: "infografis_album" }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.infografis_album.filter(
          (item) => item.guid_gambar !== null
        );
        setInfografisData(filteredData);
      })
      .catch((error) => console.error("Error fetching infografis data:", error));
  }, []);

  // Return null or a placeholder component if infografisData is empty
  if (infografisData.length === 0) {
    return null; // Or you can return a placeholder, e.g., <div>No infographics available</div>
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
        centerSlidePercentage={33.33} // Adjust to fit 3 images
        selectedItem={1} // Adjust the initial slide to center the images
      >
        {infografisData.map((item, index) => (
          <Link to="/infografis" key={index}>
            <div className="p-1 lg:p-2">
              <img
                src={`${process.env.VUE_APP_API_URL}/api/getDownloadInfografis/${process.env.VUE_APP_OPD_ID}/${item.guid_gambar}`}
                alt={item.judul}
                style={{ width: "100%", height: "auto" }} // Adjust width to fill the space
              />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Infografis;
