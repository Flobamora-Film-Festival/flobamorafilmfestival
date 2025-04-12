import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

// Dummy slot dan data film
const slotData = [
  {
    slotTitle: { ID: "Slot Pagi", EN: "Morning Slot" },
    films: [
      {
        title: { ID: "Pelangi Timur", EN: "Eastern Rainbow" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Seorang anak mengejar mimpi jadi pelukis di desa kecilnya.",
          EN: "A child chases their dream to become a painter in a small village.",
        },
        duration: "15 menit",
        theme: "Remaja",
        director: "Ardi Meko",
        country: "Indonesia",
      },
      {
        title: { ID: "Jejak Hujan", EN: "Rain’s Footsteps" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Kisah cinta yang tumbuh dari kenangan saat hujan.",
          EN: "A love story that grows from memories in the rain.",
        },
        duration: "12 menit",
        theme: "Romansa",
        director: "Nadia Pah",
        country: "Indonesia",
      },
      {
        title: { ID: "Langkah Kecil", EN: "Little Steps" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Seorang gadis belajar menari dari neneknya.",
          EN: "A girl learns to dance from her grandmother.",
        },
        duration: "17 menit",
        theme: "Keluarga",
        director: "Yosef Ledu",
        country: "Indonesia",
      },
      {
        title: { ID: "Pulang", EN: "Homecoming" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Seorang perantau kembali ke desa dengan luka lama.",
          EN: "A wanderer returns home carrying old wounds.",
        },
        duration: "14 menit",
        theme: "Drama",
        director: "Maria Laka",
        country: "Indonesia",
      },
      {
        title: { ID: "Ritus", EN: "Ritual" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Ritual tahunan yang menguak rahasia keluarga.",
          EN: "An annual ritual uncovers a family’s secret.",
        },
        duration: "16 menit",
        theme: "Misteri",
        director: "Kornelis Lado",
        country: "Indonesia",
      },
    ],
  },
];

const LayarNusantara = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isDark = theme === "dark";

  const [selectedFilm, setSelectedFilm] = useState(null);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-10">
        {language === "ID" ? "Layar Nusantara" : "Nusantara Film Screening"}
      </h1>

      {slotData.map((slot, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            🎞️ {slot.slotTitle[language]}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {slot.films.map((film, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedFilm(film)}
                className={`cursor-pointer transition-transform hover:scale-105 rounded-lg overflow-hidden border shadow-md ${
                  isDark
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <img
                  src={film.poster}
                  alt={film.title[language]}
                  className="w-full h-auto object-cover"
                />
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
        <Dialog
          open={!!selectedFilm}
          onClose={() => setSelectedFilm(null)}
          className="relative z-50"
          static
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-2xl rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
              <DialogTitle className="text-xl font-bold mb-2">
                {selectedFilm?.title?.[language]}
              </DialogTitle>
              <div className="flex gap-4 flex-col md:flex-row">
                <img
                  src={selectedFilm?.poster}
                  alt={selectedFilm?.title?.[language]}
                  className="w-full max-w-[200px] rounded-lg shadow"
                />
                <div>
                  <p className="text-sm mb-2">
                    <strong>
                      🎬 {language === "ID" ? "Durasi" : "Duration"}:
                    </strong>{" "}
                    {selectedFilm?.duration}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>
                      🎥 {language === "ID" ? "Sutradara" : "Director"}:
                    </strong>{" "}
                    {selectedFilm?.director}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>
                      🌍 {language === "ID" ? "Negara" : "Country"}:
                    </strong>{" "}
                    {selectedFilm?.country}
                  </p>
                  <p className="text-sm mt-2">
                    {selectedFilm?.synopsis?.[language]}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFilm(null)}
                className="mt-6 text-sm text-gray-600 hover:underline dark:text-gray-300"
              >
                {language === "ID" ? "Tutup" : "Close"}
              </button>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default LayarNusantara;
