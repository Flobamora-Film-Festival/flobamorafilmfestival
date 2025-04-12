/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import logo from "../assets/logo.png";
import logo_dark from "../assets/logo_dark.png";
import moon_icon from "../assets/moon_icon.png";
import sun_icon from "../assets/sun_icon.png";
import arrow_icon from "../assets/arrow-icon.png";
import arrow_icon_dark from "../assets/arrow-icon-dark.png";
import menu_black from "../assets/menu-black.png";
import menu_white from "../assets/menu-white.png";
import close_black from "../assets/close-black.png";
import close_white from "../assets/close-white.png";
import { motion } from "framer-motion";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // 🔹 Ambil `theme` & `toggleTheme`
  const { language, switchLanguage } = useContext(LanguageContext); // 🔹 Ambil bahasa

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ✅ Sync state lokal dengan theme dari ThemeProvider
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  // ✅ State untuk mendeteksi scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ Simpan tema global di localStorage & cek saat komponen pertama kali dimuat
  useEffect(() => {
    setIsDarkMode(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");

    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Event listener untuk scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // Navbar memiliki efek rounded setelah scroll
      } else {
        setIsScrolled(false); // Navbar tanpa efek rounded saat di atas
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Bersihkan event listener saat komponen di-unmount

    return () => document.removeEventListener("click", handleClickOutside);
  }, [theme]);

  // ✅ Toggle Theme (Sinkron dengan ThemeProvider)
  const handleToggleTheme = () => {
    toggleTheme(); // 🔹 Langsung panggil `toggleTheme`
  };

  // ✅ Pastikan semua menu tertutup setelah navigasi
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // ✅ Fungsi untuk toggle dropdown & menutup dropdown lain jika sudah terbuka
  const handleDropdownToggle = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const [isMobileDarkMode, setIsMobileDarkMode] = useState(() => {
    const savedMobileTheme = localStorage.getItem("mobileTheme");
    return savedMobileTheme
      ? savedMobileTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // ✅ Fungsi untuk scroll ke atas & tutup menu dropdown
  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
    setActiveDropdown(null); // Tutup dropdown saat navigasi
  };

  const menuItems = [
    { label: language === "ID" ? "Beranda" : "Home", link: "/" },
    {
      label: language === "ID" ? "Acara" : "Event",
      submenu: [
        { label: language === "ID" ? "Jadwal" : "Schedule", link: "/jadwal" },
        { label: language === "ID" ? "Tiket" : "Ticket", link: "/tiket" },
        {
          label: language === "ID" ? "Peta Venue" : "Venue Map",
          link: "/venue",
        },
        { label: "Katalog", link: "/katalog" },
      ],
    },
    {
      label: language === "ID" ? "Program" : "Programs",
      submenu: [
        {
          label: language === "ID" ? "Bioskop Pasiar" : "Bioskop Pasiar",
          link: "/bioskop-pasiar",
        },
        {
          label: language === "ID" ? "Kompetisi" : "Competition",
          link: "/kompetisi",
        },
        {
          label: language === "ID" ? "Non-Kompetisi" : "Non-Competition",
          link: "/non-kompetisi",
        },
        { label: "KFK Film Lab", link: "/kfk-film-lab" },
        {
          label:
            language === "ID" ? "Bakumpul Komunitas" : "Bakumpul Komunitas",
          link: "/bakumpul-komunitas",
        },
        {
          label: language === "ID" ? "Baomong Film" : "Baomong Film",
          link: "/baomong-film",
        },
      ],
    },
    { label: language === "ID" ? "Media" : "Media", link: "/media" },
    { label: language === "ID" ? "Tentang" : "About", link: "/tentang" },
  ];

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <nav
      className={`w-full sticky top-0 px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 bg-white dark:bg-gray-900 shadow-md transition-all ${isScrolled ? "rounded-full" : ""}`}
    >
      {" "}
      {/* Logo */}
      <Link to="/" onClick={handleNavClick}>
        <img
          src={isDarkMode ? logo_dark : logo}
          alt="Logo"
          className="w-10 cursor-pointer"
        />
      </Link>
      {/* Menu Desktop */}
      <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-Outfit">
        {menuItems.map((item, index) => (
          <li key={index} className="relative">
            {/* Jika item punya submenu */}
            {item.submenu ? (
              <>
                <button
                  onClick={() => handleDropdownToggle(item.label)}
                  className="flex items-center gap-1"
                  aria-expanded={activeDropdown === item.label}
                >
                  {item.label}
                  <img
                    src={
                      activeDropdown === item.label
                        ? arrow_icon_dark
                        : arrow_icon
                    }
                    alt="Dropdown"
                    className={`w-3 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === item.label && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 lg:right-0 mt-2 w-60 bg-white dark:bg-gray-800 shadow-md rounded-md"
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.link}
                          onClick={handleNavClick}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </>
            ) : (
              <Link
                to={item.link}
                onClick={handleNavClick}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      {/* Tombol Mode dan Bahasa */}
      <div className="flex items-center gap-4">
        <div className="flex space-x-4">
          <button
            onClick={() => switchLanguage("ID")}
            className={`text-sm font-semibold ${language === "ID" ? "border-2 border-red-500 text-red-500 px-2 py-1" : "text-gray-500"}`}
          >
            {language === "ID" ? "ID" : "ID"}
          </button>

          <button
            onClick={() => switchLanguage("EN")}
            className={`text-sm font-semibold ${language === "EN" ? "border-2 border-red-500 text-red-500 px-2 py-1" : "text-gray-500"}`}
          >
            {language === "EN" ? "EN" : "EN"}
          </button>
        </div>

        <button onClick={toggleTheme} aria-label="Toggle dark mode">
          <img
            src={isDarkMode ? sun_icon : moon_icon}
            alt="Theme Icon"
            className="w-6"
          />
        </button>

        <button onClick={toggleMenu} className="md:hidden">
          <img
            src={
              isMenuOpen
                ? isDarkMode
                  ? close_white
                  : close_black
                : isDarkMode
                  ? menu_white
                  : menu_black
            }
            alt="Menu Icon"
            className="w-6"
          />
        </button>
      </div>
      {/* Menu Mobile */}
      {isMenuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={mobileMenuVariants}
          className="fixed top-0 right-0 w-3/5 md:w-2/5 lg:w-1/3 h-screen bg-white dark:bg-gray-900 flex flex-col items-center py-6 z-50 shadow-lg rounded-l-lg border-l border-gray-300 dark:border-gray-700"
        >
          <button onClick={handleNavClick} className="absolute top-4 right-4">
            <img
              src={isDarkMode ? close_white : close_black}
              alt="Close Menu"
              className="w-4"
            />
          </button>

          {/* Daftar Menu */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 text-base font-Outfit mt-5 w-full text-center"
          >
            {menuItems.map((item, index) => (
              <li key={index} className="relative w-full">
                {/* Jika ada submenu */}
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(item.label)}
                      className="flex items-center gap-1 justify-center w-full"
                    >
                      {item.label}
                      <img
                        src={
                          activeDropdown === item.label
                            ? isMobileDarkMode
                              ? arrow_icon_dark
                              : arrow_icon
                            : arrow_icon
                        }
                        alt="Dropdown"
                        className={`w-3 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex} className="py-1">
                            <Link
                              to={subItem.link}
                              onClick={handleNavClick}
                              className="block px-4 py-1 hover:text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.link}
                    onClick={handleNavClick}
                    className="block px-4 py-1 hover:text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
