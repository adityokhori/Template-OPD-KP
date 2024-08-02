import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Berita = () => {
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

        //image berita ada link didalanm isi post ada yang ada di post_gambar.
        //jika post_gambar null maka akan mengambil sepenuhnya isi post karena didalam isi post itulah ada link gambarnya
        //link di isi post memiliki api dari /ckeditor/

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
  const beritaLainnya = berita.slice(1, 6);

  //ambil url didalam isi_Post
  const mainNewsImage = getImageSrcFromIsiPost(beritaTerbaru.isi_post);

  return (
    <div className="w-full pt-12 scale-95">
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start pt-4 ">
        <div className="w-full lg:w-1/2 ">
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

        <div className="w-full lg:w-1/2 ml-0 lg:ml-10 pt-4 lg:pt-0">
          <div className="pt-8 lg:pt-0 ">
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
            {beritaLainnya.map((item, index) => (
              <Link key={index} to={`/berita/${item.id}`}>
                <div className="border rounded-lg overflow-hidden shadow-lg flex flex-row mb-4">
                  {/*                   <img
                    src={`${process.env.VUE_APP_API_URL}/image/posting/berita/${process.env.VUE_APP_OPD_ID}/original/${berita[index].post_gambar}`}
                    alt={item.judul_post}
                    className="w-64 h-52 object-fit bg-yellow-300"
                  /> */}

                  <div className="p-4 ">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {item.judul_post}
                    </h3>
                    <p className="text-gray-700 text-base line-clamp-3">
                      {item.isi}
                    </p>
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
