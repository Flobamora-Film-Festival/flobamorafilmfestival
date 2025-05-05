import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageProvider";
import { Helmet } from "react-helmet-async";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const Katalog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const { language } = useLanguage();

  const handleOpenCatalog = (year) => {
    if (isMobile) {
      window.open(`/katalog/Flobamora-Film-Festival-${year}.pdf`, "_blank");
    } else {
      setSelectedCatalog(year);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCatalog(null);
  };

  const text = {
    ID: {
      title: "Katalog Festival",
      description: "Kumpulan katalog Flobamora Film Festival dari tahun ke tahun yang menampilkan program film, acara, dan dokumentasi festival.",
      button: "Lihat Selengkapnya",
    },
    EN: {
      title: "Festival Catalogue",
      description: "A collection of Flobamora Film Festival catalogues over the years, featuring film programs, events, and festival documentation.",
      button: "See More",
    },
  };

  return (
    <div className="min-h-screen py-10 px-5 lg:px-20 dark:bg-gray-900 transition-all font-Outfit">
      <Helmet>
        <title>{text[language].title} | Flobamora Film Festival</title>
      </Helmet>

      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{text[language].title}</h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">{text[language].description}</p>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {["2025", "2024", "2023", "2022"].map((year, index) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 dark:text-white mb-4">Flobamora Film Festival {year}</h3>
            <img src={`/assets/Flobamora-Film-Festival-${year}-thumbnail.jpg`} alt={`Thumbnail Flobamora Film Festival ${year}`} className="w-full h-auto rounded-md mb-4" />
            <button onClick={() => handleOpenCatalog(year)} className="text-gray-500 dark:text-white hover:underline transform transition-all duration-200 hover:scale-105 hover:text-red-600 dark:hover:text-red-300">
              {text[language].button}
            </button>
          </motion.div>
        ))}
      </section>

      {/* Modal PDF untuk desktop */}
      <AnimatePresence>
        {isModalOpen && selectedCatalog && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-4 pt-10 w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 max-w-screen-xl relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Tombol Close */}
              <button onClick={handleCloseModal} className="absolute top-4 right-4 z-10 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white" aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Iframe PDF */}
              <div className="relative w-full">
                <iframe src={`/katalog/Flobamora-Film-Festival-${selectedCatalog}.pdf`} title={`Katalog Festival ${selectedCatalog}`} className="w-full h-[80vh] rounded" loading="lazy" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Katalog;
