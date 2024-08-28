import React, { useEffect, useState } from "react";
import { Typography, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { getData } from "../API/api";
import EventIcon from "@mui/icons-material/Event";

const Berita = () => {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData("berita");
        setBerita(data.berita);
      } catch (error) {
        console.error("Error fetching berita data:", error);
      }
    }
    fetchData();
  }, []);

  if (berita.length === 0) {
    return <p>Loading...</p>;
  }

  const getImageSrcFromIsiPost = (isiPost) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(isiPost, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.src : null;
  };

  const beritaTerbaru = berita[0];
  const beritaLainnya = berita.slice(1, 6);

  const mainNewsImage =
    getImageSrcFromIsiPost(beritaTerbaru.isi_post) ||
    `${process.env.VUE_APP_API_URL}/image/posting/berita/${process.env.VUE_APP_OPD_ID}/original/${beritaTerbaru.post_gambar}`;

  return (
    <div className="w-full scale-95">
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start">
        <div className="w-full lg:w-3/5 p-4 ">
          <div className="flex justify-start items-center lg:items-center pb-4">
            <Typography variant="fontH2">Berita Terkini</Typography>
          </div>
          <Link to={`/berita/${beritaTerbaru.id}`}>
            <div className="hover:bg-gray-100 border rounded-lg overflow-hidden shadow-lg">
              <img
                src={mainNewsImage}
                alt={beritaTerbaru.judul_post}
                className="w-full h-auto object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {beritaTerbaru.judul_post}
                </h2>
                <div className="flex items-center text-sm mb-2">
                  <EventIcon className="mr-1" />
                  <p className="line-clamp-1 underline">
                    {beritaTerbaru.tanggal_terbit}
                  </p>
                </div>
                <p className="text-gray-700 text-base">{beritaTerbaru.isi}</p>
              </div>
            </div>
          </Link>
        </div>
        <Divider orientation="vertical" flexItem />

        <div className="w-full lg:w-2/5 ml-0 lg:ml-4 p-4 lg:pt-4 ">
          <div className="pt-8 lg:pt-0">
            <div className="pb-4">
              <Typography variant="fontH2">Berita Lainnya</Typography>
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
            {beritaLainnya.map((item) => {
              const imageUrl =
                getImageSrcFromIsiPost(item.isi_post) ||
                `${process.env.VUE_APP_API_URL}/image/posting/berita/${process.env.VUE_APP_OPD_ID}/original/${item.post_gambar}`;

              return (
                <Link key={item.id} to={`/berita/${item.id}`}>
                  <div className="hover:bg-gray-100 border rounded-lg overflow-hidden shadow-lg flex flex-row mb-4 justify-center items-center pl-4">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={item.judul_post}
                        className="w-32 h-32 object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">
                        {item.judul_post}
                      </h3>
                      <div className="flex items-center text-sm mb-2">
                        <EventIcon className="mr-1" />
                        <p className="line-clamp-1 underline">
                          {item.tanggal_terbit}
                        </p>
                      </div>
                      <p className="text-gray-700 text-base line-clamp-3">
                        {item.isi}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Berita;
