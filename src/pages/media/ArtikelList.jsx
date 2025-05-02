import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageProvider"; // Import hook untuk bahasa

// Dummy data untuk testing jika API tidak tersedia
const dummyArticles = [
  {
    id: 1,
    title: {
      ID: "Profil Sineas Muda NTT yang Bersinar",
      EN: "Profile of Rising Young Filmmakers from NTT",
    },
    summary: {
      ID: "Mengenal lebih dekat para sineas muda Nusa Tenggara Timur yang menorehkan prestasi di FFF 2025.",
      EN: "Getting to know the young filmmakers of East Nusa Tenggara who are making their mark at FFF 2025.",
    },
    image: "/uploads/artikel-images/sineas-muda.jpg",
    date: "2025-05-01", // Tambahkan properti tanggal untuk pengurutan
  },
  {
    id: 2,
    title: {
      ID: "Di Balik Layar Flobamora Film Festival",
      EN: "Behind the Scenes of Flobamora Film Festival",
    },
    summary: {
      ID: "Simak kisah di balik persiapan Flobamora Film Festival 2025 yang penuh tantangan dan semangat kolektif.",
      EN: "Check out the story behind the preparations for the Flobamora Film Festival 2025, full of challenges and collective spirit.",
    },
    image: "/uploads/artikel-images/balik-layar.jpg",
    date: "2025-04-20", // Tambahkan properti tanggal untuk pengurutan
  },
  {
    id: 3,
    title: {
      ID: "Kolaborasi Film Lokal dan Internasional",
      EN: "Collaboration Between Local and International Films",
    },
    summary: {
      ID: "Bagaimana FFF menjadi jembatan kolaborasi antara sineas lokal dan pelaku industri film global.",
      EN: "How FFF becomes a bridge for collaboration between local filmmakers and global film industry professionals.",
    },
    image: "/uploads/artikel-images/kolaborasi.jpg",
    date: "2025-04-15", // Tambahkan properti tanggal untuk pengurutan
  },
];

const ArtikelList = () => {
  const [articles, setArticles] = useState([]);
  const { language } = useLanguage(); // Ambil bahasa dari context

  useEffect(() => {
    // Fetch data dari API
    fetch("/api/articles")
      .then((response) => response.json())
      .then((data) => {
        // Sort berdasarkan tanggal terbaru
        const sortedArticles = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setArticles(sortedArticles.slice(0, 3)); // Ambil 3 artikel terbaru
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setArticles(dummyArticles.slice(0, 3)); // fallback ke dummy data jika API gagal
      });
  }, []);

  return (
    <section className="py-10 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 place-items-center">
          {articles.map((article) => (
            <div key={article.id} className="w-full max-w-md bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center">
              <img src={article.image} alt={article.title[language]} className="w-40 h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{article.title[language]}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{article.summary[language]}</p>
              <a
                href={`/media/artikel/${article.id}`}
                className="inline-block mt-4 px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg hover:text-white hover:bg-red-700 dark:bg-gray-600 dark:text-white dark:hover:bg-red-700 transition-colors duration-300"
              >
                {language === "ID" ? "Baca Selengkapnya →" : "Read More →"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtikelList;
