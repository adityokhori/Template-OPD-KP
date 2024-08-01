import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Berita = () => {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    fetch("https://icms.tanjungpinangkota.go.id/api/getData/7225000000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ req: "berita" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBerita(data.berita);
      })
      .catch((error) => console.error("Error fetching berita data:", error));
  }, []);

  if (berita.length === 0) {
    return <p>Loading...</p>;
  }

  const beritaTerbaru = berita[0];
  const beritaLainnya = berita.slice(1, 6); // Get up to 5 other news items

  return (
    <div className="pt-12 scale-95">
      <div className="flex flex-row justify-start items-start lg:items-center pl-0 lg:pl-8">
        <Typography variant="fontH2">Berita Terkini Diskominfo</Typography>
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

      <div className="flex flex-col lg:flex-row justify-center items-start pt-4">
        <div className="w-full md:w-2/3">
          <Link to={`/berita/${beritaTerbaru.id}`}>
            <div className="border rounded-lg overflow-hidden shadow-lg">
              <img
                src={beritaTerbaru.post_gambar || "https://picsum.photos/320/200?random=12"}
                alt={beritaTerbaru.judul_post}
                className="w-full h-auto object-fit"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{beritaTerbaru.judul_post}</h2>
                <p className="text-gray-700 text-base">{beritaTerbaru.isi_ringkasan}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-full ml-0 lg:ml-10 pt-4 lg:pt-0">
          <div className="space-y-4">
            {beritaLainnya.map((item, index) => (
              <Link key={item.id} to={`/berita/${item.id}`}>
                <div className="border rounded-lg overflow-hidden shadow-lg flex flex-row">
                  <img
                    src={item.post_gambar || `https://picsum.photos/240/180?random=${12 + index + 1}`}
                    alt={item.judul_post}
                    className="w-1/2 h-auto object-fit"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{item.judul_post}</h3>
                    <p className="text-gray-700 text-base">{item.isi_ringkasan}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Berita;
