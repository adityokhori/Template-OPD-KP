import React, { useState, useEffect } from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import FooterEnd from "../Components/Footer/FooterEnd";
import Footer from "../Components/Footer/Footer";
import Infografis from "../Components/Infografis";
import CarouselHome from "../Components/CarouselHome";
import Pranala1 from "../Components/Pranala/Pranala1";
import Berita from "../Widget/Berita";
import WidgetKominfo from "../WidgetKominfo";
import Modal from "../Widget/PopUp";

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
      <div className="mx-10 flex flex-col justify-center items-center">
        <CarouselHome />
        <Berita />
        <Infografis />
      </div>
      <div className="grid grid-cols-2 gap-8 gap-x-20 py-8 mx-10">
        <Pranala1 />
        <Pranala1 />
        <Pranala1 />
        <Pranala1 />
      </div>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Container sx={{ bgcolor: "primary.main" }}>
          <Footer />
          <FooterEnd />
        </Container>
      </Box>
      <WidgetKominfo />
    </div>
  );
};

export default HomePage;
