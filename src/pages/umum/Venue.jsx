import React, { useContext, Suspense } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider";
import LeafletMapComponent from "../../components/LeafletMapComponent";

const Venue = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage();

  const content = {
    ID: {
      title: "Peta Venue",
      description: "Lokasi utama Flobamora Film Festival.",
      addressLabel: "Alamat:",
      address: "Jl. Kejora Oepoi No.1, Oebufu, Kec. Oebobo, Kota Kupang, Nusa Tenggara Timur 85142",
      directions: "Petunjuk Arah",
    },
    EN: {
      title: "Venue Map",
      description: "Main locations of the Flobamora Film Festival.",
      addressLabel: "Address:",
      address: "Jl. Kejora Oepoi No.1, Oebufu, Oebobo District, Kupang City, East Nusa Tenggara 85142, Indonesia",
      directions: "Get Directions",
    },
  };

  const t = content[language];
  const mapLink = "https://www.google.com/maps/search/?api=1&query=Jl.+Kejora+Oepoi+No.1,+Kupang";

  return (
    <div className={`min-h-screen py-10 px-5 lg:px-20 transition-all duration-300 font-Outfit ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Helmet>
        <title>{t.title} | Flobamora Film Festival</title>
        <meta name="description" content={t.description} />
      </Helmet>

      <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">{t.title}</h1>
        <p className="text-center mb-4 text-base sm:text-lg">{t.description}</p>
        <p className="text-center mb-6 text-sm sm:text-base">
          <span className="font-semibold">{t.addressLabel}</span> {t.address}
        </p>

        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 relative z-0 min-h-[400px] mb-6">
          <Suspense fallback={<div className="text-center py-20 text-gray-500 dark:text-gray-400">Loading map...</div>}>
            <LeafletMapComponent />
          </Suspense>
        </div>

        <div className="text-center">
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm sm:text-base transition duration-200">
            {t.directions}
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Venue;
