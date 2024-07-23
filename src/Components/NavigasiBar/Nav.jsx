import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import LoginIcon from "@mui/icons-material/Login";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { IoChevronDown } from "react-icons/io5";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const Links = [
    { name: "Beranda", link: "/" },
    { name: "Berita", link: "/berita" },
    {
      name: "Profil",
      link: "/Profil",
      dropdown: [
        { name: "Visi & Misi", link: "/profil/visi-misi" },
        { name: "Struktur Organisasi", link: "/profil/struktur-organisasi" },
        { name: "Tugas & Fungsi", link: "/profil/tugas-fungsi" },
      ],
    },
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
        <div className="flex flex-row justify-center items-center">
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 md:my-0 my-7 relative">
              {link.dropdown ? (
                <div >
                  <button
                    className={`${
                      activeLink === link.name ? "text-blue-600" : "text-black"
                    } hover:text-blue-600 py-1 duration-500 flex justify-center items-center`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {link.name}
                    <IoChevronDown className="ml-1" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.link}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              handleLinkClick(item.name);
                              setDropdownOpen(false);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={link.link}
                  className={`${
                    activeLink === link.name ? "text-blue-600" : "text-black"
                  } hover:text-blue-600 py-1 duration-500`}
                  onClick={() => handleLinkClick(link.name)}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
          <div className="pl-20 flex flex-row justify-center items-center">
            
            {/* <div>
              <Link to="/">
                <DarkModeOutlinedIcon className="hover:text-blue-500" />
              </Link>
            </div> */}

            <div className="pl-4">
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
