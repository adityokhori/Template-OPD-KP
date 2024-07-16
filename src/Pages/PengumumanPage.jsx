import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Footer from "../Components/Footer/Footer";
import FooterEnd from "../Components/Footer/FooterEnd";

const PengumumanPage = () => {
  return (
    <div className="pt-20">
      <Typography variant="fontH1">Ini Pengumuman</Typography>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Container sx={{ bgcolor: "primary.main" }}>
          <Footer />
          <FooterEnd />
        </Container>
      </Box>
    </div>
  );
};

export default PengumumanPage;
