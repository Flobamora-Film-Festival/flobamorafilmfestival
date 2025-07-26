import React, { useEffect, useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { useLanguage } from "../../context/LanguageProvider";
import { ThemeContext } from "../../context/ThemeContext";

const LayarInternasional = () => {
  const { language } = useLanguage();
  const { theme } = useContext(ThemeContext);
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-gray-900";

  const title = language === "ID" ? "Layar Internasional" : "International Screen";
  const desc = language === "ID" ? "Program kurasi film pendek internasional non-kompetisi dari berbagai negara." : "Curated program of international non-competition short films from various countries.";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/wp-json/flobamora/v1/non-kompetisi`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((film) => film.acf.screening_type === "nonkompetisi" && film.acf.screening_slot === "internasional");
        setFilms(filtered);
      });
  }, []);

  const openModal = (film) => {
    setSelectedFilm(film);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFilm(null);
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      <p className={`mb-10 max-w-3xl ${textColor}`}>{desc}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {films.map((film) => (
          <button key={film.id} onClick={() => openModal(film)} className="focus:outline-none">
            <img src={film.acf.poster?.url} alt={film.title.rendered} className="w-full h-auto rounded-lg shadow-md hover:opacity-80 transition" />
          </button>
        ))}
      </div>

      <Dialog open={isModalOpen} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-3xl w-full shadow-xl">
            {selectedFilm && (
              <>
                <Dialog.Title className="text-xl font-bold mb-2">{selectedFilm.title.rendered}</Dialog.Title>
                <p className="mb-1 text-sm">
                  <span className="font-semibold">{language === "ID" ? "Sutradara" : "Director"}:</span> {selectedFilm.acf.sutradara}
                </p>
                <p className="mb-1 text-sm">
                  <span className="font-semibold">{language === "ID" ? "Produser" : "Producer"}:</span> {selectedFilm.acf.produser}
                </p>
                <p className="mb-1 text-sm">
                  <span className="font-semibold">{language === "ID" ? "Durasi" : "Duration"}:</span> {selectedFilm.acf.durasi}
                </p>
                <p className="mb-4 text-sm">
                  <span className="font-semibold">{language === "ID" ? "Tahun" : "Year"}:</span> {selectedFilm.acf.tahun}
                </p>
                <div className="mb-4">
                  <p className="text-sm">{language === "ID" ? selectedFilm.acf.sinopsis : selectedFilm.acf.sinopsis_en}</p>
                </div>
                <button onClick={closeModal} className="mt-4 px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black">
                  {language === "ID" ? "Tutup" : "Close"}
                </button>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default LayarInternasional;
