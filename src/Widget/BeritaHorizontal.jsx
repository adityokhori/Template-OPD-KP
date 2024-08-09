import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Pagination, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const BeritaHorizontal = () => {
  const [page, setPage] = useState(1);
  const [newsData, setNewsData] = useState([]);
  const itemsPerPage = 3;

  useEffect(() => {
    fetch(
      `${process.env.VUE_APP_API_URL}/api/getData/${process.env.VUE_APP_OPD_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ req: "berita" }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.berita);
      })
      .catch((error) => console.error("Error fetching berita data:", error));
  }, []);

  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeNews = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const newsToDisplay = newsData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getImageSrcFromIsiPost = (isiPost) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(isiPost, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.src : null;
  };

  return (
    <div className="pt-4 ">
      <Box
        sx={{
          width: "100%",
          bgcolor: "primary.main",
        }}
        className="w-full flex flex-col p-2 lg:p-8 bg-black"
      >
        {/* berita */}
        <div className="w-full">
          <div className="flex justify-start items-center align-middle">
            <Typography variant="fontH1" className="text-white">
              Berita lainnya
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/berita"
              sx={{
                ml: 2,
                bgcolor: "secondary.main",
                "&:hover": {
                  bgcolor: "secondary.dark",
                },
              }}
            >
              <Typography variant="teksButton">Selengkapnya</Typography>
            </Button>
          </div>
          <Grid container spacing={2}>
            {newsToDisplay.map((news) => {
              const NewsImageUnique = getImageSrcFromIsiPost(news.isi_post);
              const imageUrl =
                NewsImageUnique ||
                `${process.env.VUE_APP_API_URL}/image/posting/berita/${process.env.VUE_APP_OPD_ID}/original/${news.post_gambar}`;

              return (
                <Grid item xs={12} sm={6} md={4} key={news.id}>
                  <Link to={`/berita/${news.id}`} onClick={handleChangeNews}>
                    <div className="border rounded-lg shadow-lg mb-4 text-white">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={`News ${news.id}`}
                          className="w-full h-48 object-cover"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <div className="p-4 ">
                        <h3 className="text-lg font-bold mb-2 overflow-hidden line-clamp-2 text-white">
                          {news.judul_post}
                        </h3>
                        <p className="text-gray-100 text-base line-clamp-2 overflow-hidden ">
                          {news.isi}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Grid>
              );
            })}
          </Grid>

          {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box> */}

          {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "primary.main", // Optional: Adjust the background color for the selected page
                  color: "white",
                },
              }}
            />
          </Box> */}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white", // Warna nomor angka
                },
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "gray", // Warna lingkaran penanda nomor yang terpilih
                  color: "white", // Warna nomor angka yang terpilih
                },
                "& .MuiPaginationItem-ellipsis": {
                  color: "white", // Warna elipsis
                },
              }}
            />
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default BeritaHorizontal;
