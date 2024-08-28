import React, { useState, useEffect } from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import FooterEnd from "../Components/Footer/FooterEnd";
import Footer from "../Components/Footer/Footer";
import Infografis from "../Components/Infografis";
import CarouselHome from "../Components/CarouselHome";
import Pranala1 from "../Components/Pranala/Pranala1";
import Pranala2 from "../Components/Pranala/Pranala2";
import Pranala3 from "../Components/Pranala/Pranala3";
import Berita from "../Widget/Berita";
import WidgetKominfo from "../WidgetKominfo";
import Modal from "../Widget/PopUp";
import FooterPage from "./FooterPage";
import Statistik from "../Widget/ExtraStatistik";
import StatistikData from "../Widget/StatistikData";
import PetaLokasi from "../Widget/PetaLokasi";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="pt-28">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <div className=" flex flex-col justify-center items-center">
        <CarouselHome />
        <Berita />
        <Infografis />
      </div>
      <div className="p-8 mx-8 flex flex-col justify-center items-center space-y-20">
        <div className="w-2/3 pt-4">
          <StatistikData />
        </div>
        <div className="w-full">
          <PetaLokasi />
        </div>
      </div>

      <div className="py-4 mx-10">
        <hr className="my-4 border-t border-gray-300" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 py-4">
          <Pranala1 />
          <Pranala2 />
          <Pranala3 />
        </div>
      </div>

      <FooterPage />
      <WidgetKominfo />
    </div>
  );
};

export default HomePage;
