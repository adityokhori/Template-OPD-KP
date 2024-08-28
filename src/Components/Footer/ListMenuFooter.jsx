import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getOPDInfo } from "../../API/api";

const ListMenuFooter = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getOPDInfo()
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
    <div className="flex justify-center items-start space-x-4">
      {menuItems.map((menu, index) => (
        <List key={index}>
          <Typography
            variant="fontH3"
            className="text-start underline underline-offset-8 decoration-2 decoration-orange-500 whitespace-nowrap"
          >
            {menu.parentName}
          </Typography>
          {menu.submenuItems.map((item, subIndex) => (
            <ListItem
              key={subIndex}
              sx={{
                padding: "1px 0",
              }}
            >
              <ListItemText
                primary={
                  <Link
                    to={`/pages${item.link}/${item.idpost}`}
                    className=" hover:text-orange-500"
                    onClick={() => handleSubNavClick(item.idpost)}
                  >
                    <Typography variant="teks">{item.text}</Typography>
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
