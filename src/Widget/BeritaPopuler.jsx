import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { getData } from "../API/api";

const BeritaPopuler = () => {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    async function fetchBerita() {
      try {
        const data = await getData("berita", null, null);
        const sortedBerita = data.berita
          .sort((a, b) => b.jum_klik - a.jum_klik)
          .slice(0, 5);
        setBerita(sortedBerita);
      } catch (error) {
        console.error("Error fetching berita data:", error);
      }
    }

    fetchBerita();
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

  return (
    <div className="w-full lg:w-full pb-4">
      <div className="flex flex-row justify-start items-start lg:items-center pb-4"></div>
      <Typography variant="fontH1">Berita Populer</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {berita.map((item, index) => (
              <TableRow key={item.id} className="hover:bg-gray-100">
                <Link
                  to={`/berita/${item.id}`}
                  className="contents"
                  key={item.id}
                  onClick={() => handleNewsClick(item.id)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.judul_post}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <VisibilityIcon
                        fontSize="small"
                        style={{ marginRight: 4 }}
                      />
                      {item.jum_klik}
                    </div>
                  </TableCell>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BeritaPopuler;
