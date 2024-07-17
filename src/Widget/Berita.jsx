import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Berita = () => {
  return (
    <div className="pt-12 scale-95">
      <div className="flex flex-row justify-start items-center pl-8">
        <Typography variant="fontH2">Berita Terkini Diskominfo</Typography>
        <Button
          variant="contained"
          component={Link}
          to="/berita"
          onClick={() => {
            alert("halooo");
          }}
          sx={{
            ml: 4,
          }}
        >
          Selengkapnya
        </Button>
      </div>
      <div className="flex flex-row justify-center items-start pt-4">
        <div className="w-full md:w-2/3">
          <Link>
            <div className="border rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://picsum.photos/320/240?random=12"
                alt="Main News"
                className="w-full h-auto object-fit"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Main News Title</h2>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
                  corrupti itaque ducimus ipsam atque possimus officiis
                  assumenda facilis reprehenderit animi, magni libero beatae ad?
                  Expedita unde ex tempore accusantium? Aspernatur?
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-full md:w-1/3 ml-10">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Link>
                <div
                  key={i}
                  className="border rounded-lg overflow-hidden shadow-lg flex flex-row"
                >
                  <img
                    src={`https://picsum.photos/120/180?random=${12 + i}`}
                    alt={`News ${i}`}
                    className="w-full h-32 object-fit"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">News Title {i}</h3>
                    <p className="text-gray-700 text-base">
                      This is the description for news {i}. It provides a brief
                      overview of the news story.
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
