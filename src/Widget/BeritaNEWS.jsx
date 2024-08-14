import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const BeritaNEWS = () => {
  const [beritaTerbaru, setBeritaTerbaru] = useState(null);
  const [loading, setLoading] = useState(true);

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
        if (data.berita && data.berita.length > 0) {
          const sortedBerita = data.berita.sort(
            (a, b) => new Date(b.tgl_terbit) - new Date(a.tgl_terbit)
          );
          setBeritaTerbaru(sortedBerita[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching berita data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!beritaTerbaru) {
    return <p>No news available</p>;
  }

  const getImageSrcFromIsiPost = (isiPost) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(isiPost, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.src : null;
  };

  const handleNewsClick = async (newsId) => {
    try {
      const data = { id: newsId.toString() };
      await axios.post(
        `${process.env.VUE_APP_API_URL}/api/setData/${process.env.VUE_APP_OPD_ID}`,
        { req: "klik_berita", data }
      );
      console.log(`Berita ${newsId} clicked`);
    } catch (error) {
      console.error("Error sending click data:", error);
    }
  };

  const mainNewsImage = getImageSrcFromIsiPost(beritaTerbaru.isi_post);
  const imageUrl =
    mainNewsImage ||
    `${process.env.VUE_APP_API_URL}/image/posting/berita/${process.env.VUE_APP_OPD_ID}/original/${beritaTerbaru.post_gambar}`;

  return (
    <div className="w-full lg:w-full">
      <div className="flex flex-row justify-start items-start lg:items-center">
        <Typography variant="fontH1">Berita Terkini Diskominfo</Typography>
      </div>
      <Link
        to={`/berita/${beritaTerbaru.id}`}
        key={beritaTerbaru.id}
        onClick={() => handleNewsClick(beritaTerbaru.id)}
      >
        <div className="border rounded-lg overflow-hidden shadow-lg">
          <img
            src={imageUrl}
            alt={beritaTerbaru.judul_post}
            className="w-full h-auto object-cover"
            onError={(e) => (e.target.src = null)}
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">
              {beritaTerbaru.judul_post}
            </h2>
            <p className="text-gray-700 text-base">{beritaTerbaru.isi}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BeritaNEWS;
