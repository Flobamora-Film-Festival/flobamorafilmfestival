import React, { useContext } from "react";
import NewsList from "../../components/news/NewsList"; // Import NewsList
import textsNews from "../../texts/textsNews"; // Import teks untuk berita
import { LanguageContext } from "../../context/LanguageProvider"; // Menggunakan context untuk bahasa

const NewsPage = () => {
  const { language } = useContext(LanguageContext); // Mengambil bahasa dari context

  return (
    <div>
      <h1>{textsNews[language].title}</h1> {/* Judul berita berdasarkan bahasa */}
      <p>{textsNews[language].description}</p> {/* Deskripsi berita berdasarkan bahasa */}
      <NewsList /> {/* Menampilkan daftar berita */}
    </div>
  );
};

export default NewsPage;
