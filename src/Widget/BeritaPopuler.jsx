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

const BeritaPopuler = () => {
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
        const sortedBerita = data.berita
          .sort((a, b) => b.jum_klik - a.jum_klik)
          .slice(0, 5);
        setBerita(sortedBerita);
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

  return (
    <div className="w-full lg:w-full pb-4">
      <div className="flex flex-row justify-start items-start lg:items-center pb-4"></div>
      <Typography variant="fontH1">Berita Populer</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {berita.map((item, index) => (
              <TableRow key={item.id} className="hover:bg-gray-100">
                <Link to={`/berita/${item.id}`} className="contents" >
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
