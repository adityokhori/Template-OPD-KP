import React from "react";
import { List, ListItem, ListItemText, Container } from "@mui/material";

const TextList = () => {
  const items = [
    "Jalan Daeng Celak, Komplek Perkantoran, Gedung C Lantai 1 & 2, Senggarang, Kecamatan Tanjungpinang Kota, Tanjungpinang, Kepulauan Riau",
  ];

  return (
    <List className="text-start">
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

export default TextList;
