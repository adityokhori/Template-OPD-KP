import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
  listItem: { opacity: 0, y: -20 },
  list: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const Links = [
    { name: "Beranda", link: "/" },
    { name: "Berita", link: "/berita" },
    { name: "Profil", link: "/Profil" },
    { name: "Kalender Event", link: "/kalender-event" },
    { name: "Pengumuman", link: "/pengumuman" },
    { name: "Gallery", link: "/gallery" },
    { name: "Artikel", link: "/artikel" },
  ];

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLinkClick = (name) => {
    setActiveLink(name);
    setOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-20 shadow-md w-full top-0 left-0 font-bold transition-colors duration-300 ${
        scrolled ? "bg-white" : "bg-white"
      }`}
    >
      <div onClick={toggleMenu} className="text-3xl cursor-pointer md:hidden ">
        {open ? <IoClose /> : <IoMenu />}
      </div>

      <ul
        className={`px-20 md:flex md:items-center flex justify-between items-center md:static absolute w-full left-0 md:w-auto transition-all duration-500 ease-in ${
          open ? "top-30 bg-white bg-opacity-80" : "top-[-490px]"
        }`}
      >
        <Link to="/">
          <div className="font-bold text-2xl cursor-pointer flex items-center">
            <img src="/diskominfo_kota.png" className="w-100 h-20" />
          </div>
        </Link>
        <div className="flex flex-row">
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 md:my-0 my-7">
              <Link
                to={link.link}
                className={`${
                  activeLink === link.name ? "text-blue-600" : "text-black"
                } hover:text-blue-600 py-1 duration-500`}
                onClick={() => handleLinkClick(link.name)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <div className="pl-20 flex flex-row justify-center items-center">
            <div>
              <Link to="/">
                <DarkModeOutlinedIcon className="hover:text-blue-500" />
              </Link>
            </div>
            <div className="pl-4">
              <Link to="https://icms.tanjungpinangkota.go.id/login">
                <LoginIcon className="hover:text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Nav;
