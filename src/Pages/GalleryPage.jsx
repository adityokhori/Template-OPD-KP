import React from "react";
import { Typography } from "@mui/material";
import Pranala2 from "../Components/Pranala/Pranala2";
import FooterPage from "./FooterPage";
import { Link } from "react-router-dom";

const GalleryPage = () => {
  return (
    <div className="pt-24">
      <div className="px-10">
        <Typography variant="fontH1">Gallery</Typography>
      </div>
      <div className="flex flex-col justify-center items-center px-12">
        <div className="w-full">
          <Link>
            <div className="border rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://picsum.photos/540/240?random=12"
                alt="Main News"
                className="w-full h-auto object-fit"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Main News Title</h2>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
                  corrupti itaque ducimus ipsam atque possimus officiis
                  assumenda facilis reprehenderit animi, magni libero beatae ad?
                  Expedita unde ex tempore accusantium? Aspernatur?
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-4/5">
          <Pranala2 />
        </div>
      </div>

      <FooterPage />
    </div>
  );
};

export default GalleryPage;
