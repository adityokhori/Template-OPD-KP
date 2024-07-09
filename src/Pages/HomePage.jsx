import React from "react";
import { Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FooterEnd from "../Components/Footer/FooterEnd";
import Footer from "../Components/Footer/Footer";
import ScrollToTopButton from "../Components/ScrollToTop";
import ListData from "../Components/ListData";
import MapKominfo from "../Components/MapKominfo";
import Infografis from "../Components/Infografis";

const HomePage = () => {

  return (
    <div className="pt-40 text-4xl flex flex-col justify-center items-center mx-20">
      <Infografis/>
      <Typography variant="fontH2">
        LLorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, facere.
        Veritatis laboriosam iusto, similique non, ea magnam nulla voluptatem
        aperiam tempora soluta voluptate neque, facere iste quisquam quo! Et,
        consequatur?
      </Typography>

      <Typography variant="fontH2">
        2Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, facere.
        Veritatis laboriosam iusto, similique non, ea magnam nulla voluptatem
        aperiam tempora soluta voluptate neque, facere iste quisquam quo! Et,
        consequatur?
      </Typography>

      <Button variant="contained" color="primary" startIcon={<DeleteIcon />}>
        Click Me
      </Button>

      <ListData />
      <MapKominfo/>
      <ScrollToTopButton />
      <Footer />
      <FooterEnd />
    </div>
  );
};

export default HomePage;
