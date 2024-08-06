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
      <div className="p-8 space-x-8 flex flex-row justify-center items-center">
        <StatistikData/>
        <PetaLokasi/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 py-4 mx-10">
        <Pranala1 />
        <Pranala2 />
        <Pranala3 />
      </div>
      <FooterPage />
      <WidgetKominfo />
    </div>
  );
};

export default HomePage;
