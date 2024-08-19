import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ListMenuFooter = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.VUE_APP_API_URL}/api/getOPDInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ kunker: process.env.VUE_APP_OPD_ID }),
    })
      .then((response) => response.json())
      .then((data) => {
        const menuItems = data.menu.lsmenu
          .filter((item) => item.submenu && item.submenu.length > 0)
          .map((parent) => ({
            parentName: parent.nama_menu,
            submenuItems: parent.submenu.map((submenuItem) => ({
              text: submenuItem.nama_menu,
              link: `/${
                submenuItem.route || submenuItem.nama_menu.toLowerCase()
              }`,
              idpost: submenuItem.id_post,
            })),
          }));
        console.log(menuItems.item);
        setMenuItems(menuItems);
      })
      .catch((error) => console.error("Error fetching menu data:", error));
  }, []);

  const handleSubNavClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-center items-start">
      {menuItems.map((menu, index) => (
        <List key={index}>
          <Typography
            variant="h6"
            className="text-start underline underline-offset-8 decoration-2 decoration-orange-500 px-2 whitespace-nowrap"
          >
            {menu.parentName}
          </Typography>
          {menu.submenuItems.map((item, subIndex) => (
            <ListItem key={subIndex}>
              <ListItemText
                primary={
                  <Link
                    to={`/pages${item.link}/${item.idpost}`}
                    className="hover:text-orange-500 "
                    onClick={() => handleSubNavClick(item.idpost)}
                  >
                    {item.text}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      ))}
    </div>
  );
};

export default ListMenuFooter;
