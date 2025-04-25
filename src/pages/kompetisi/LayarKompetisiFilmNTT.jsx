import React, { useContext, useState } from "react";
import { useLanguage } from "../../context/LanguageProvider"; // Gunakan custom hook untuk LanguageContext
import { ThemeContext } from "../../context/ThemeContext"; // Gunakan useContext untuk ThemeContext
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

// Dummy data untuk Kompetisi Film NTT
const slotData = [
  {
    slotTitle: {
      ID: "Kompetisi Film NTT - Slot 1",
      EN: "NTT Competition - Slot 1",
    },
    films: [
      {
        title: { ID: "Suara Hutan", EN: "Voice of the Forest" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Kisah tentang perjuangan masyarakat adat menjaga hutan mereka.",
          EN: "A story about indigenous people fighting to protect their forest.",
        },
        duration: "15 menit",
        theme: "Lingkungan",
        director: "Yanto Benu",
        country: "Indonesia",
      },
      {
        title: { ID: "Batu Hitam", EN: "The Black Stone" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Legenda batu keramat yang masih hidup di desa terpencil.",
          EN: "A sacred stone legend that still lives in a remote village.",
        },
        duration: "13 menit",
        theme: "Misteri",
        director: "Nina Talo",
        country: "Indonesia",
      },
      {
        title: { ID: "Air dan Api", EN: "Water and Fire" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Dua saudara bersaing dalam dunia tari tradisional dan modern.",
          EN: "Two siblings clash in the worlds of traditional and modern dance.",
        },
        duration: "16 menit",
        theme: "Drama",
        director: "Leo Seko",
        country: "Indonesia",
      },
      {
        title: { ID: "Jejak di Tanah Merah", EN: "Footsteps on Red Soil" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Seorang pemuda menemukan warisan tersembunyi leluhurnya.",
          EN: "A young man discovers his ancestors' hidden legacy.",
        },
        duration: "12 menit",
        theme: "Sejarah",
        director: "Vera Kana",
        country: "Indonesia",
      },
      {
        title: { ID: "Matahari di Timur", EN: "Sunrise from the East" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Cerita inspiratif tentang guru di pedalaman Flores.",
          EN: "An inspiring story about a teacher in rural Flores.",
        },
        duration: "14 menit",
        theme: "Inspiratif",
        director: "Fredi Meko",
        country: "Indonesia",
      },
    ],
  },
];

const LayarKompetisiFilmNTT = () => {
  const { theme } = useContext(ThemeContext); // Mengambil nilai theme dari ThemeContext
  const { language } = useLanguage(); // Mengambil nilai language menggunakan custom hook
  const isDark = theme === "dark"; // Memeriksa apakah tema gelap (dark mode)

  const [selectedFilm, setSelectedFilm] = useState(null);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-10">{language === "ID" ? "Kompetisi Film NTT" : "NTT Film Competition"}</h1>

      {slotData.map((slot, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">🎞️ {slot.slotTitle[language]}</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {slot.films.map((film, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFilm(film)}
                className={`cursor-pointer transition-transform hover:scale-105 rounded-lg overflow-hidden border shadow-md ${isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
              >
                <img src={film.poster} alt={film.title[language]} className="w-full h-auto object-cover" />
                <div className="p-3 text-center">
                  <p className="text-sm font-medium">{film.title[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedFilm && (
        <Dialog open={!!selectedFilm} onClose={() => setSelectedFilm(null)} className="relative z-50" static>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-2xl rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
              <DialogTitle className="text-xl font-bold mb-2">{selectedFilm?.title?.[language]}</DialogTitle>
              <div className="flex gap-4 flex-col md:flex-row">
                <img src={selectedFilm?.poster} alt={selectedFilm?.title?.[language]} className="w-full max-w-[200px] rounded-lg shadow" />
                <div>
                  <p className="text-sm mb-2">
                    <strong>🎬 {language === "ID" ? "Durasi" : "Duration"}:</strong> {selectedFilm?.duration}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>🎥 {language === "ID" ? "Sutradara" : "Director"}:</strong> {selectedFilm?.director}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>🌍 {language === "ID" ? "Negara" : "Country"}:</strong> {selectedFilm?.country}
                  </p>
                  <p className="text-sm mt-2">{selectedFilm?.synopsis?.[language]}</p>
                </div>
              </div>
              <button onClick={() => setSelectedFilm(null)} className="mt-6 text-sm text-gray-600 hover:underline dark:text-gray-300">
                {language === "ID" ? "Tutup" : "Close"}
              </button>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default LayarKompetisiFilmNTT;
