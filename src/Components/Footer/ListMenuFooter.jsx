import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ListMenuFooter = () => {
  const items = [
    { text: "Item Pertama", link: "/item1" },
    { text: "Item Kedua", link: "/item2" },
    { text: "Item Ketiga", link: "/item3" },
    { text: "Item Keempat", link: "/item4" },
  ];

  return (
    <List className="">
      <Typography
        variant="h6"
        className="text-start underline underline-offset-8 decoration-4 decoration-orange-500"
      >
        List Data
      </Typography>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={
              <Link to={item.link} className="hover:text-orange-500">
                {item.text}
              </Link>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ListMenuFooter;
