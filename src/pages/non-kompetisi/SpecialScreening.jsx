import React, { useContext, useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { ThemeContext } from "../../context/ThemeContext";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const SpecialScreening = () => {
  const { language } = useLanguage();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const res = await fetch("https://backend.flobamorafilmfestival.com/wp-json/flobamora/v1/non-kompetisi");
        const data = await res.json();

        const filtered = data
          .filter((film) => film.screening_slot?.value === "spesial")
          .map((film) => ({
            ...film,
            stills: [film.still1, film.still2, film.still3].filter(Boolean), // <-- Buat array stills manual
          }));

        setFilms(filtered);
      } catch (err) {
        console.error("Gagal fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  const labels = {
    ID: {
      genre: "Genre",
      director: "Sutradara",
      producer: "Produser",
      productionHouse: "Rumah Produksi",
      originCountry: "Asal & Negara",
      productionYear: "Tahun Produksi",
      duration: "Durasi",
      synopsis: "Sinopsis",
      stills: "Stills",
      close: "Tutup",
    },
    EN: {
      genre: "Genre",
      director: "Director",
      producer: "Producer",
      productionHouse: "Production House",
      originCountry: "Origin Country",
      productionYear: "Production Year",
      duration: "Duration",
      synopsis: "Synopsis",
      stills: "Stills",
      close: "Close",
    },
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">{language === "ID" ? "Memuat film..." : "Loading films..."}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-10">{language === "ID" ? "Spesial Screening" : "Special Screening"}</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {films.map((film) => (
          <div
            key={film.id}
            onClick={() => setSelectedFilm(film)}
            className={`cursor-pointer transition-transform hover:scale-105 rounded-lg overflow-hidden border shadow-md ${isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
          >
            <div className="w-full h-[360px] bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
              <img src={film.poster || "/placeholder.jpg"} alt={film.title} className="h-full object-contain" />
            </div>
            <div className="p-3 text-center">
              <p className="text-sm font-medium">{film.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail */}
      {selectedFilm && (
        <Dialog open={!!selectedFilm} onClose={() => setSelectedFilm(null)} className="relative z-50" static>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-4xl rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl max-h-[90vh] overflow-y-auto relative">
              <DialogTitle className="text-xl font-bold mb-4 pr-12">{selectedFilm.title}</DialogTitle>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full lg:w-[300px] cursor-pointer" onClick={() => setPreviewImage(selectedFilm.poster)}>
                  <img src={selectedFilm.poster || "/placeholder.jpg"} alt={selectedFilm.title} className="rounded-lg shadow object-cover aspect-[3/4] w-full" />
                </div>

                <div className="flex-1 text-sm text-gray-800 dark:text-gray-200 space-y-2">
                  <div className="flex">
                    <span className="w-[150px] font-semibold">{labels[language].genre}</span>
                    <span className="mx-1">:</span>
                    <span>{language === "ID" ? selectedFilm.genre : selectedFilm.genre_en}</span>
                  </div>
                  <div className="flex">
                    <span className="w-[150px] font-semibold">{labels[language].director}</span>
                    <span className="mx-1">:</span>
                    <span>{selectedFilm.director}</span>
                  </div>
                  {selectedFilm.producer && (
                    <div className="flex">
                      <span className="w-[150px] font-semibold">{labels[language].producer}</span>
                      <span className="mx-1">:</span>
                      <span>{selectedFilm.producer}</span>
                    </div>
                  )}
                  <div className="flex">
                    <span className="w-[150px] font-semibold">{labels[language].productionHouse}</span>
                    <span className="mx-1">:</span>
                    <span>{selectedFilm.production_house}</span>
                  </div>
                  <div className="flex">
                    <span className="w-[150px] font-semibold">{labels[language].originCountry}</span>
                    <span className="mx-1">:</span>
                    <span>{selectedFilm.origin_country}</span>
                  </div>
                  <div className="flex">
                    <span className="w-[150px] font-semibold">{labels[language].productionYear}</span>
                    <span className="mx-1">:</span>
                    <span>{selectedFilm.production_year}</span>
                  </div>
                  <div className="flex">
                    <span className="w-[150px] font-semibold">{labels[language].duration}</span>
                    <span className="mx-1">:</span>
                    <span>{selectedFilm.duration}</span>
                  </div>

                  {/* Sinopsis */}
                  <div className="pt-4">
                    <h3 className="font-semibold mb-2">{labels[language].synopsis}</h3>
                    <div className="text-justify whitespace-pre-line leading-relaxed">{language === "ID" ? selectedFilm.synopsis : selectedFilm.synopsis_en}</div>
                  </div>
                </div>
              </div>

              {/* Stills */}
              {Array.isArray(selectedFilm.stills) && selectedFilm.stills.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">{labels[language].stills}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedFilm.stills.map((url, index) => (
                      <img key={index} src={url} alt={`Still ${index + 1}`} onClick={() => setPreviewImage(url)} className="rounded shadow w-full object-cover cursor-pointer hover:opacity-90 transition" />
                    ))}
                  </div>
                </div>
              )}

              <div className="text-end mt-6">
                <button onClick={() => setSelectedFilm(null)} className="text-sm text-gray-600 hover:underline dark:text-gray-300">
                  {labels[language].close}
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}

      {/* Modal Preview Gambar */}
      {previewImage && (
        <Dialog open={!!previewImage} onClose={() => setPreviewImage(null)} className="relative z-50" static>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <DialogPanel className="bg-white dark:bg-gray-900 rounded-lg p-4 max-w-3xl w-full shadow-xl">
              <div className="relative">
                <img src={previewImage} alt="Preview" className="w-full max-h-[80vh] object-contain rounded" />
                <div className="mt-4 flex justify-end gap-4">
                  <button onClick={() => setPreviewImage(null)} className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
                    {labels[language].close}
                  </button>
                  <a href={previewImage} download className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    {language === "ID" ? "Unduh Gambar" : "Download Image"}
                  </a>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default SpecialScreening;
