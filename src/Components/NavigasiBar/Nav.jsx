import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { IoChevronDown } from "react-icons/io5";
import { Typography } from "@mui/material";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [dropdownsOpen, setDropdownsOpen] = useState({});

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLinkClick = (name) => {
    setActiveLink(name);
    setOpen(false);
    // Close all dropdowns
    setDropdownsOpen({});
  };

  const toggleDropdown = (name) => {
    setDropdownsOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [menuData, setMenuData] = useState([]);
  const [nunkerData, setNunkerData] = useState([]);

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
        const menuItems = data.menu.lsmenu.map((item) => ({
          name: item.nama_menu,
          link: `/${item.nama_menu.toLowerCase()}`,
          link2: `/${item.route}`,
          id2: item.id_post,
          nunker: item.nunker,
          submenu: item.submenu || [],
        }));
        setMenuData(menuItems);
      })
      .catch((error) => console.error("Error fetching menu data:", error));
  }, []);

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
        setNunkerData(data.unker);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div
      className={`fixed text-sm z-20 shadow-md w-full top-0 left-0 font-bold transition-colors duration-300 ${
        scrolled ? "bg-white" : "bg-white"
      }`}
    >
      <div onClick={toggleMenu} className="text-3xl cursor-pointer md:hidden">
        {open ? <IoClose /> : <IoMenu />}
      </div>

      <ul
        className={`py-2 px-8 md:flex md:items-center flex flex-col lg:flex-row lg:justify-between items-center md:static absolute w-full left-0 md:w-auto transition-all duration-500 ease-in ${
          open ? "top-30 bg-white bg-opacity-80" : "top-[-800px]"
        }`}
      >
        {/* logo text */}
        <Link to="/">
          <div className="font-bold cursor-pointer flex flex-row items-center space-x-2">
            <img src="/TPI-Logo.png" className="w-10 h-auto" alt="Logo" />
            <Typography variant="fontH3">{nunkerData.nunker}</Typography>
            {/* Separator line */}
            <div className="hidden lg:block border-l-2 border-gray-300 h-6 mx-4"></div>
          </div>
        </Link>

        <div className="flex flex-col lg:flex-row justify-end items-start">
          {menuData.map((link) => (
            <li key={link.name} className="md:ml-4 md:my-0 my-7 relative">
              {link.submenu.length > 0 ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`flex items-center ${
                      activeLink === link.name ? "text-blue-600" : "text-black"
                    } hover:text-blue-600 duration-500 whitespace-nowrap`}
                  >
                    {link.name} <IoChevronDown />
                  </button>
                  <ul
                    className={`absolute left-0 mt-2 bg-white shadow-lg rounded-lg transition-transform duration-300 ${
                      dropdownsOpen[link.name]
                        ? "transform scale-100"
                        : "transform scale-0"
                    }`}
                  >
                    {link.submenu.map((subLink) => (
                      <li key={subLink.nama_menu} className="my-0">
                        <Link
                          to={
                            subLink.route
                              ? `/pages/${subLink.route}/${subLink.id_post}`
                              : subLink.hyperlink || "#"
                          }
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => {
                            handleLinkClick(subLink.nama_menu);
                          }}
                        >
                          {subLink.nama_menu}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={
                    link.link2 && link.id2
                      ? `/pages${link.link2}/${link.id2}`
                      : `/${link.name.toLowerCase()}`
                  }
                  className={`${
                    activeLink === link.name
                      ? "text-blue-600 underline underline-offset-4"
                      : "text-black"
                  } hover:text-blue-600 duration-500 whitespace-nowrap`}
                  onClick={() => handleLinkClick(link.name)}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}

          <div className="lg:pl-8 flex flex-row justify-center items-center">
            <div>
              <a
                href="https://icms.tanjungpinangkota.go.id/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LoginIcon className="hover:text-blue-500" />
              </a>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Nav;
