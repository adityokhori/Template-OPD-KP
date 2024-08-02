import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const BeritaNEWS = () => {
    const [berita, setBerita] = useState([]);

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
          setBerita(data.berita);
          console.log(
            `${process.env.VUE_APP_API_URL}image/posting/berita/${process.env.VUE_APP_OPD_ID}/original/${data.berita[3].post_gambar}`
          );
          console.log(data.berita[3].post_gambar);
        })
        .catch((error) => console.error("Error fetching berita data:", error));
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
  
    const mainNewsImage = getImageSrcFromIsiPost(beritaTerbaru.isi_post);
  return (
    <div className="w-full lg:w-full ">
      <div className=" flex flex-row justify-start items-start lg:items-center pb-4">
        <Typography variant="fontH2">Berita Terkini Diskominfo</Typography>
      </div>
      <Link to={`/berita/${beritaTerbaru.id}`}>
        <div className="border rounded-lg overflow-hidden shadow-lg">
          <img
            /* src={`${process.env.VUE_APP_API_URL}/image/posting/berita/${process.env.VUE_APP_OPD_ID}/original/${beritaTerbaru.post_gambar}`} */
            src={mainNewsImage}
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
