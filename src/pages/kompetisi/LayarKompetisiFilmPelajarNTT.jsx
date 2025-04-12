import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

// Dummy data slot Kompetisi Film Pelajar NTT
const slotData = [
  {
    slotTitle: {
      ID: "Kompetisi Film Pelajar NTT - Slot 1",
      EN: "Student Film Competition - Slot 1",
    },
    films: [
      {
        title: { ID: "Langkah Awal", EN: "First Step" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Seorang pelajar menemukan semangat baru lewat dunia perfilman.",
          EN: "A student discovers a new passion through filmmaking.",
        },
        duration: "10 menit",
        theme: "Inspiratif",
        director: "Andi Rato",
        country: "Indonesia",
      },
      {
        title: { ID: "Cahaya di Balik Jendela", EN: "Light Behind the Window" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Kisah siswa penyandang disabilitas yang ingin bersekolah.",
          EN: "The story of a student with disabilities striving for education.",
        },
        duration: "11 menit",
        theme: "Drama",
        director: "Lidia Sone",
        country: "Indonesia",
      },
      {
        title: { ID: "Harapan di Lembah", EN: "Hope in the Valley" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Perjuangan siswa di pedalaman untuk menggapai cita-cita.",
          EN: "A rural student’s struggle to achieve dreams.",
        },
        duration: "13 menit",
        theme: "Pendidikan",
        director: "Raka Meko",
        country: "Indonesia",
      },
      {
        title: { ID: "Sepeda Tua", EN: "Old Bicycle" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Sepeda tua membawa kenangan dan harapan baru bagi seorang anak.",
          EN: "An old bicycle brings back memories and hope to a child.",
        },
        duration: "12 menit",
        theme: "Keluarga",
        director: "Diana Leo",
        country: "Indonesia",
      },
      {
        title: { ID: "Surat untuk Masa Depan", EN: "Letter to the Future" },
        poster: "https://via.placeholder.com/300x400",
        synopsis: {
          ID: "Anak muda menulis surat untuk dirinya di masa depan.",
          EN: "A young person writes a letter to their future self.",
        },
        duration: "9 menit",
        theme: "Reflektif",
        director: "Yani Meko",
        country: "Indonesia",
      },
    ],
  },
];

const LayarKompetisiFilmPelajarNTT = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isDark = theme === "dark";

  const [selectedFilm, setSelectedFilm] = useState(null);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-10">
        {language === "ID"
          ? "Kompetisi Film Pelajar NTT"
          : "NTT Student Film Competition"}
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

      {/* Modal Pop-up */}
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

export default LayarKompetisiFilmPelajarNTT;
