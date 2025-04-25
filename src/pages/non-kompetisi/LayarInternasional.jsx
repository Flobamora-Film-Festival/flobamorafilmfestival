import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider"; // Update import
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const slotData = [
  {
    slotTitle: { ID: "Slot Internasional 1", EN: "International Slot 1" },
    films: [
      {
        title: { ID: "Bayangan Senja", EN: "Twilight Shadows" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Sebuah film tentang bayang-bayang masa lalu di tengah senja.",
          EN: "A film about shadows of the past at twilight.",
        },
        duration: "14 menit",
        theme: "Drama",
        director: "Lucas Monteiro",
        country: "Brazil",
      },
      {
        title: { ID: "Jejak Cahaya", EN: "Traces of Light" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Perjalanan seorang anak menemukan makna harapan.",
          EN: "A child's journey to find the meaning of hope.",
        },
        duration: "12 menit",
        theme: "Inspiratif",
        director: "Aya Nakamura",
        country: "Japan",
      },
      {
        title: { ID: "Anak Salju", EN: "Snow Child" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Misteri anak kecil yang hidup di tengah badai salju.",
          EN: "The mystery of a child living through a snowstorm.",
        },
        duration: "11 menit",
        theme: "Fantasi",
        director: "Olga Petrova",
        country: "Russia",
      },
      {
        title: { ID: "Lautan Tanpa Nama", EN: "Nameless Sea" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Seorang pelaut menulis surat untuk lautan yang tak dikenal.",
          EN: "A sailor writes letters to the nameless sea.",
        },
        duration: "13 menit",
        theme: "Puisi Visual",
        director: "Amani Malik",
        country: "Morocco",
      },
      {
        title: { ID: "Langkah Kecil Dunia", EN: "Tiny Steps of the World" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Kisah anak-anak dari berbagai benua melangkah bersama.",
          EN: "Stories of children from around the world taking steps together.",
        },
        duration: "10 menit",
        theme: "Dokumenter",
        director: "Sarah Kim",
        country: "South Korea",
      },
    ],
  },
];

const LayarInternasional = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // Use the custom hook `useLanguage`
  const isDark = theme === "dark";

  const [selectedFilm, setSelectedFilm] = useState(null);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-10">{language === "ID" ? "Layar Internasional" : "International Film Screening"}</h1>

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

export default LayarInternasional;
