import React from "react";
import Footer from "../Components/Footer/Footer";
import FooterEnd from "../Components/Footer/FooterEnd";
import {Box,  Container} from "@mui/material";

const FooterPage = () => {
  return (
    <Box sx={{ bgcolor: "primary.main" }}>
      <Container sx={{ bgcolor: "primary.main" }}>
        <Footer />
        <FooterEnd />
      </Container>
    </Box>
  );
};

export default FooterPage;
