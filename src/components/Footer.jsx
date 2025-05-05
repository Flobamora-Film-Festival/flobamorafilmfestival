/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const Footer = () => {
  const { language } = useLanguage();
  const isIndonesian = language === "ID"; // Menggunakan bahasa yang dipilih dari Navbar
  // Fungsi untuk mengarahkan ke halaman dan scroll ke atas
  const handleNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-sm sm:text-base bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-t border-gray-300 dark:border-gray-700"
    >
      <footer className="bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center md:text-left">
          {/* Kontak */}
          <div>
            <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">{isIndonesian ? "Kontak" : "Contact"}</h4>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <a href="https://maps.app.goo.gl/r4KNtwBaKzZnoJvP6" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition">
                Jl. Kejora No.4, {isIndonesian ? "Kota Kupang" : "Kupang City"}
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:contact@flobamorafilmfestival.com" className="hover:text-red-600 transition">
                contact@flobamorafilmfestival.com
              </a>
            </p>
            <div className="flex justify-center md:justify-start gap-3 mt-3 text-lg">
              <a href="https://www.facebook.com/profile.php?id=61551863112603" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-red-600">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://www.instagram.com/flobamorafilmfestival/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-red-600">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.youtube.com/channel/UC9zLYkF5-VuU2vKdrutK-0w" target="_blank" rel="noopener noreferrer" aria-label="Youtube" className="hover:text-red-600">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://www.tiktok.com/@flobamorafilmfestival" target="_blank" rel="noopener noreferrer" aria-label="Tiktok" className="hover:text-red-600">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="flex-1 sm:ml-4 lg:ml-10">
            <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">{isIndonesian ? "Navigasi" : "Navigation"}</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/" onClick={handleNavigation} className="hover:text-red-600">
                  {isIndonesian ? "Beranda" : "Home"}
                </Link>
              </li>
              <li>
                <Link to="/media" onClick={handleNavigation} className="hover:text-red-600">
                  Media
                </Link>
              </li>
              <li>
                <Link to="/tentang" onClick={handleNavigation} className="hover:text-red-600">
                  {isIndonesian ? "Tentang" : "About"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Acara */}
          <div className="flex-1 sm:ml-4 lg:ml-10">
            <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">{isIndonesian ? "Acara" : "Event"}</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/jadwal" onClick={handleNavigation} className="hover:text-red-600">
                  {isIndonesian ? "Jadwal" : "Schedule"}
                </Link>
              </li>
              <li>
                <Link to="/tiket" onClick={handleNavigation} className="hover:text-red-600">
                  {isIndonesian ? "Tiket" : "Ticket"}
                </Link>
              </li>
              <li>
                <Link to="/venue" onClick={handleNavigation} className="hover:text-red-600">
                  {isIndonesian ? "Peta Venue" : "Venue Map"}
                </Link>
              </li>
              <li>
                <Link to="/katalog" onClick={handleNavigation} className="hover:text-red-600">
                  Katalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Program */}
          <div className="flex-1 sm:ml-4 lg:ml-10">
            <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">{isIndonesian ? "Program" : "Programs"}</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/bioskop-pasiar" onClick={handleNavigation} className="hover:text-red-600">
                  Bioskop Pasiar
                </Link>
              </li>
              <li>
                <Link to="/kompetisi" onClick={handleNavigation} className="hover:text-red-600">
                  {isIndonesian ? "Kompetisi" : "Competition"}
                </Link>
              </li>
              <li>
                <Link to="/non-kompetisi" onClick={handleNavigation} className="hover:text-red-600">
                  {isIndonesian ? "Non Kompetisi" : "Non Competition"}
                </Link>
              </li>
              <li>
                <Link to="/kfk-film-lab" onClick={handleNavigation} className="hover:text-red-600">
                  KFK Film Lab
                </Link>
              </li>
              <li>
                <Link to="/bakumpul-komunitas" onClick={handleNavigation} className="hover:text-red-600">
                  Bakumpul Komunitas
                </Link>
              </li>
              <li>
                <Link to="/baomong-film" onClick={handleNavigation} className="hover:text-red-600">
                  Baomong Film
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center w-full pt-4 border-t border-gray-400 text-xs sm:text-sm">
          <p>© 2025 Flobamora Film Festival. {isIndonesian ? "Hak cipta dilindungi." : "All rights reserved."}</p>
        </div>
      </footer>
    </motion.footer>
  );
};

export default Footer;
