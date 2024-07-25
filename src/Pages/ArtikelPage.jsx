import React, { useState } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import FooterPage from "./FooterPage";

const dummyNewsData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Articles Title ${i + 1}: Articlesddadwadcafhlj`,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita sed quasi est. Mollitia tempora neque porro enim minima at. Consequatur, obcaecati asperiores odio quasi architecto molestiae accusantium repellat nam possimus?",
  imageUrl: `https://picsum.photos/180/120?random=${12 + i}`,
}));

const ArtikelPage = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(dummyNewsData.length / itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const newsToDisplay = dummyNewsData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="pt-4">
      <div className="w-full flex flex-col lg:flex-row p-20">
        {/* berita */}
        <div className="w-full lg:w-3/5 ">
          <Typography variant="fontH1">Artikel</Typography>
          <div>
            <div>
              {newsToDisplay.map((news) => (
                <div
                  key={news.id}
                  className="border rounded-lg overflow-hidden shadow-lg flex flex-row my-4 lg:my-2"
                >
                  <img
                    src={news.imageUrl}
                    alt={`News ${news.id}`}
                    className="w-1/3 h-auto object-fit"
                  />
                  <div className="p-2">
                    <Typography variant="fontH2">{news.title}</Typography>
                    <br />
                    <Typography variant="teks">{news.description}</Typography>
                  </div>
                </div>
              ))}
            </div>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          </div>
        </div>

        <div className="w-full lg:w-2/5 pl-8 pt-8">
          <div>
            <Typography variant="fontH1">Video Terbaru</Typography>
            <div className="flex justify-center items-center border rounded-lg overflow-hidden shadow-lg p-4">
              <iframe
                width="80%"
                height="200"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="pt-8 ">
            <Typography variant="fontH1">Berita Terbaru</Typography>
            <div className="flex justify-center items-center border rounded-lg overflow-hidden shadow-lg p-4">
              <iframe
                width="80%"
                height="200"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <FooterPage />
    </div>
  );
};

export default ArtikelPage;
