import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";

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
    { name: "Berita", link: "/Berita" },
    { name: "Profil", link: "/Profil" },
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
      <div className="flex items-center justify-between p-4 md:px-8 lg:px-40">
        <Link to="/">
          <div className="font-bold text-2xl cursor-pointer flex items-center ">
            <img src="/TPI-Logo.png" className="w-8 h-10" />
            <h1 className="pl-4">DINAS KOMUNIKASI DAN INFORMATIKA</h1>
          </div>
        </Link>
      </div>
      <div onClick={toggleMenu} className="text-3xl cursor-pointer md:hidden ">
        {open ? <IoClose /> : <IoMenu />}
      </div>

      <ul
        className={`md:flex md:items-center flex justify-center items-center md:static absolute w-full left-0 md:w-auto transition-all duration-500 ease-in ${
          open ? "top-30 bg-white bg-opacity-80" : "top-[-490px]"
        }`}
      >
        {Links.map((link) => (
          <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
            <Link
              to={link.link}
              className={`${
                activeLink === link.name ? "text-blue-600" : "text-black"
              } hover:text-blue-600 py-1 duration-500 flex justify-center items-center`}
              onClick={() => handleLinkClick(link.name)}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
