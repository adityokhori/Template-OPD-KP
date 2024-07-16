import React from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Container,
  Typography,
} from "@mui/material";
import Footer from "../Components/Footer/Footer";
import FooterEnd from "../Components/Footer/FooterEnd";
import SearchIcon from "@mui/icons-material/Search";

const BeritaPage = () => {
  return (
    <div className="pt-4">
      <div className="w-full flex flex-row p-20">
        <div className="w-3/5">
          <Typography variant="fontH1">Berita</Typography>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              bgcolor: "searchbg.main",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <div className="w-full md:w-4/5 h-1/2 pt-8">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg overflow-hidden shadow-lg flex flex-row"
                >
                  <img
                    src={`https://picsum.photos/180/120?random=${12 + i}`}
                    alt={`News ${i}`}
                    className="w-full h-auto object-fit"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">News Title {i}</h3>
                    <p className="text-gray-700 text-base line-clamp-3">
                      This is the description for news {i}. It provides a brief
                      overview of the news story. This is the description for news {i}. It provides a brief
                      overview of the news story.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-2/5">
          <Typography variant="fontH1">Video Terbaru</Typography>
        </div>
      </div>

      {/* footer */}
      <Box sx={{ bgcolor: "primary.main" }}>
        <Container sx={{ bgcolor: "primary.main" }}>
          <Footer />
          <FooterEnd />
        </Container>
      </Box>
    </div>
  );
};

export default BeritaPage;
