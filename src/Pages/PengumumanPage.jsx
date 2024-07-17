import React, { useState } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import FooterPage from "./FooterPage";

const dummyNewsData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `News Title ${i + 1}`,
  description: `This is the description for news ${
    i + 1
  }. It provides a brief overview of the news story. It provides a brief overview of the news story.`,
  imageUrl: `https://picsum.photos/180/120?random=${12 + i}`,
}));

const PengumumanPage = () => {
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
      <div className="w-full flex flex-row p-20">
        {/* berita */}
        <div className="w-3/5">
          <Typography variant="fontH1">Pengumuman</Typography>
          <div className="w-full h-1/2 ">
            <div className="grid grid-cols-2 gap-4">
              {newsToDisplay.map((news) => (
                <div
                  key={news.id}
                  className="border rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={news.imageUrl}
                    alt={`News ${news.id}`}
                    className="w-full h-auto object-fit"
                  />
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

        <div className="w-2/5 pl-8">
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

export default PengumumanPage;
