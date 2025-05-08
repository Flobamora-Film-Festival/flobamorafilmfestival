import React, { useContext } from "react";
import NewsList from "../../components/news/NewsList";
import textsNews from "../../texts/textsNews";
import { LanguageContext } from "../../context/LanguageProvider";

const NewsPage = () => {
  const { language } = useContext(LanguageContext); // Mengambil bahasa dari context

  return (
    <div>
      <p>{textsNews[language].description}</p> {/* Deskripsi berita */}
      <NewsList language={language} /> {/* Mengirimkan prop language ke NewsList */}
    </div>
  );
};

export default NewsPage;
