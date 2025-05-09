import React from "react";
import { useLanguage } from "../context/LanguageProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

// Define translations
const footerTranslations = {
  ID: {
    contact: "Kontak",
    address: "Kota Kupang",
    rights: "Hak cipta dilindungi.",
  },
  EN: {
    contact: "Contact",
    address: "Kupang City",
    rights: "All rights reserved.",
  },
};

const Footer = () => {
  const { language } = useLanguage();
  const t = footerTranslations[language];

  const socialMediaLinks = [
    { icon: faFacebookF, url: "https://www.facebook.com/profile.php?id=61551863112603", label: "Facebook" },
    { icon: faInstagram, url: "https://www.instagram.com/flobamorafilmfestival/", label: "Instagram" },
    { icon: faYoutube, url: "https://www.youtube.com/channel/UC9zLYkF5-VuU2vKdrutK-0w", label: "YouTube" },
    { icon: faTiktok, url: "https://www.tiktok.com/@flobamorafilmfestival", label: "TikTok" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-sm sm:text-base bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-t border-gray-300 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-center justify-center space-y-4">
        {/* Contact Section */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex justify-center gap-3 mt-3 text-lg">
            {socialMediaLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon icon={social.icon} />
              </motion.a>
            ))}
          </div>
          <p className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <a href="https://maps.app.goo.gl/r4KNtwBaKzZnoJvP6" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 dark:hover:text-red-400">
              Jl. Kejora No.4, {t.address}
            </a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="mailto:contact@flobamorafilmfestival.com" aria-label="Email Flobamora Film Festival" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 dark:hover:text-red-400">
              contact@flobamorafilmfestival.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center w-full pt-2 pb-4 border-t border-gray-400 text-xs sm:text-sm">
        <p>© 2025 Flobamora Film Festival. {t.rights}</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
