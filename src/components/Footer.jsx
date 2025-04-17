/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const isIndonesian = language === "ID"; // Menggunakan bahasa yang dipilih dari Navbar
  // Fungsi untuk mengarahkan ke halaman dan scroll ke atas
  const handleNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-t border-gray-300 dark:border-gray-700">
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-t border-gray-300 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Kontak */}
          <div>
            <h4 className="font-bold mb-3">{isIndonesian ? "Kontak" : "Contact"}</h4>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <a href="https://maps.app.goo.gl/r4KNtwBaKzZnoJvP6" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition">
                Jl. Kejora No.4, {isIndonesian ? "Kota Kupang, NTT." : "Kupang City, NTT."}
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:contact@flobamorafilmfestival.com" className="hover:text-red-600 transition">
                contact@flobamorafilmfestival.com
              </a>
            </p>
            {/* Ikon Media Sosial */}
            <div className="flex justify-center md:justify-start gap-4 mt-4 text-xl">
              <a href="https://www.facebook.com/profile.php?id=61551863112603" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://www.instagram.com/flobamorafilmfestival/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.youtube.com/channel/UC9zLYkF5-VuU2vKdrutK-0w" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition" aria-label="Youtube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://www.tiktok.com/@flobamorafilmfestival" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition" aria-label="Tiktok">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-bold mb-3">{isIndonesian ? "Navigasi" : "Navigation"}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {isIndonesian ? "Beranda" : "Home"}
                </Link>
              </li>

              <li>
                <Link to="/media" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {isIndonesian ? "Media" : "Media"}
                </Link>
              </li>
              <li>
                <Link to="/tentang" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {isIndonesian ? "Tentang" : "About"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Acara */}
          <div>
            <h4 className="font-bold mb-3">{isIndonesian ? "Acara" : "Event"}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/jadwal" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {isIndonesian ? "Jadwal" : "Schedule"}
                </Link>
              </li>
              <li>
                <Link to="/tiket" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {isIndonesian ? "Tiket" : "Ticket"}
                </Link>
              </li>
              <li>
                <Link to="/venue" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {isIndonesian ? "Peta Venue" : "Venue Map"}
                </Link>
              </li>
              <li>
                <Link to="/katalog" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {"Katalog"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Program */}
          <div>
            <h4 className="font-bold mb-3">{isIndonesian ? "Program" : "Programs"}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/bioskop-pasiar" onClick={handleNavigation} className="hover:text-red-600 transition">
                  Bioskop Pasiar
                </Link>
              </li>
              <li>
                <Link to="/kompetisi" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {isIndonesian ? "Kompetisi" : "Competition"}
                </Link>
              </li>
              <li>
                <Link to="/non-kompetisi" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {isIndonesian ? "Non Kompetisi" : "Non Competition"}
                </Link>
              </li>
              <li>
                <Link to="/kfk-film-lab" onClick={handleNavigation} className="hover:text-red-600 transition">
                  KFK Film Lab
                </Link>
              </li>
              <li>
                <Link to="/bakumpul-komunitas" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {isIndonesian ? "Bakumpul Komunitas" : "Bakumpul Komunitas"}
                </Link>
              </li>
              <li>
                <Link to="/baomong-film" onClick={handleNavigation} className="hover:text-red-600 transition">
                  {isIndonesian ? "Baomong Film" : "Baomong Film"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center w-full pt-6 border-t border-gray-400">
          <p>© 2025 Flobamora Film Festival. {isIndonesian ? "Hak cipta dilindungi." : "All rights reserved."}</p>
        </div>
      </footer>
    </motion.footer>
  );
};

export default Footer;
