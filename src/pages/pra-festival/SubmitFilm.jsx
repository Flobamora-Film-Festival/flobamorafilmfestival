// ... (import tetap)
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Gunakan custom hook
import { ThemeContext } from "../../context/ThemeContext";

const SubmitFilm = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // ✅ Gunakan custom hook untuk mengambil language
  const isDark = theme === "dark";

  const textColor = isDark ? "text-white" : "text-gray-900";
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const cardBg = isDark ? "dark:hover:bg-darkHover" : "hover:bg-lightHover";

  return (
    <div className={`min-h-screen w-full py-16 px-4 lg:px-20 ${bgColor} ${textColor}`}>
      <div className="text-center max-w-3xl mx-auto">
        <h4 className="mb-2 text-lg font-Outfit">Flobamora Film Festival</h4>
        <h2 className="text-4xl lg:text-5xl font-bold font-Outfit">{language === "ID" ? "Submit Film Anda" : "Submit Your Film"}</h2>
        <p className="mt-6 mb-12 text-base lg:text-lg font-Outfit">
          {language === "ID"
            ? "Silakan pilih kategori yang sesuai untuk film yang Anda kirim. Klik kategori untuk melihat persyaratannya."
            : "Please choose the appropriate category for your film submission. Click a category to view its requirements."}
        </p>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Pelajar */}
        <div className={`border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black hover:-translate-y-1 duration-500 ${cardBg} dark:hover:shadow-white text-center`}>
          <h3 className="text-sm lg:text-base my-4 font-Outfit font-bold">{language === "ID" ? "Kompetisi Film Pelajar NTT 2025" : "NTT Student Film Competition 2025"}</h3>

          <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
            {language === "ID" ? "Kompetisi untuk pelajar SMA/SMK di NTT. Tunjukkan bakat sinema lewat film pendekmu." : "Competition for high school students in NTT. Show your talent through a short film."}
          </p>

          {/* Link internal (dinonaktifkan sementara) */}
          {/* 
          <Link to="/submit/form-kompetisi-pelajar-2025" className="cursor-pointer flex items-center justify-center gap-2 text-sm mt-3 font-Outfit font-medium hover:text-red-600 dark:hover:text-red-400">
         {language === "ID" ? "Kirim Film Anda" : "Submit Your Film"}
          <FaArrowRight />
         </Link> 
        */}

          {/* Link eksternal ke Google Form, buka tab baru */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfG7i-tDph9TMV3MDdIr8GzpuWAakGdXs_ucDBTHfbwJFw0lQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex items-center justify-center gap-2 text-sm mt-3 font-Outfit font-medium hover:text-red-600 dark:hover:text-red-400"
          >
            {language === "ID" ? "Kirim Film Anda" : "Submit Your Film"}
            <FaArrowRight />
          </a>
        </div>

        {/* Umum */}
        <div className={`border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black hover:-translate-y-1 duration-500 ${cardBg} dark:hover:shadow-white text-center`}>
          <h3 className="text-lg my-4 font-Outfit font-bold">{language === "ID" ? "Kompetisi Film NTT 2025" : "NTT Film Competition 2025"}</h3>
          <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
            {language === "ID"
              ? "Terbuka untuk sineas dari seluruh wilayah NTT. Ekspresikan cerita lokal lewat film pendekmu yang unik dan kreatif."
              : "Open to filmmakers from across NTT. Express local stories through your creative and unique short films."}
          </p>
          {/* Link internal (dinonaktifkan sementara) */}
          {/* 
          <Link to="/submit/form-kompetisi-ntt-2025" className="cursor-pointer flex items-center justify-center gap-2 text-sm mt-3 font-Outfit font-medium hover:text-red-600 dark:hover:text-red-400">
            {language === "ID" ? "Kirim Film Anda" : "Submit Your Film"}
            <FaArrowRight />
          </Link>
          */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSejZuBYF2045S0M1sg4iuoEC2aFDyofSlyhgrFZRhPgmSxANA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex items-center justify-center gap-2 text-sm mt-3 font-Outfit font-medium hover:text-red-600 dark:hover:text-red-400"
          >
            {language === "ID" ? "Kirim Film Anda" : "Submit Your Film"}
            <FaArrowRight />
          </a>
        </div>

        {/* Layar Nusantara */}
        <div className={`border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black hover:-translate-y-1 duration-500 ${cardBg} dark:hover:shadow-white text-center`}>
          <h3 className="text-lg my-4 font-Outfit font-bold">{language === "ID" ? "Layar Nusantara 2025" : "Nusantara Film Screening 2025"}</h3>
          <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
            {language === "ID"
              ? "Program pemutaran film dari berbagai daerah di Indonesia. Tampilkan ragam budaya dan perspektif unik lewat sinema."
              : "A screening program for films from across Indonesia. Share diverse cultures and unique perspectives through cinema."}
          </p>

          {/* Link internal (dinonaktifkan sementara) */}
          {/* 
          <Link to="/submit/form-layar-nusantara-2025" className="cursor-pointer flex items-center justify-center gap-2 text-sm mt-3 font-Outfit font-medium hover:text-red-600 dark:hover:text-red-400">
            {language === "ID" ? "Kirim Film Anda" : "Submit Your Film"}
            <FaArrowRight />
          </Link>
          */}

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe_TCRZT1puRP9X8EvCMLaCxsCT9WB29lt-fsV-C8NTho9B3A/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex items-center justify-center gap-2 text-sm mt-3 font-Outfit font-medium hover:text-red-600 dark:hover:text-red-400"
          >
            {language === "ID" ? "Kirim Film Anda" : "Submit Your Film"}
            <FaArrowRight />
          </a>
        </div>

        {/* KFK Film Lab */}
        <div className={`border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black hover:-translate-y-1 duration-500 ${cardBg} dark:hover:shadow-white text-center`}>
          <h3 className="text-lg my-4 font-Outfit font-bold">{language === "ID" ? "KFK Film Lab 2025" : "KFK Film Lab 2025"}</h3>
          <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
            {language === "ID"
              ? "Lokakarya naskah fiksi bagi sineas NTT. Terbuka untuk umum dan komunitas, dengan mentor nasional dan forum pitching."
              : "Fiction script lab for NTT filmmakers. Open to individuals and communities with national mentors and pitching forum."}
          </p>

          {/* Link internal (dinonaktifkan sementara) */}
          {/*
          <Link to="/submit/form-kfk-film-lab-2025" className="cursor-pointer flex items-center justify-center gap-2 text-sm mt-3 font-Outfit font-medium hover:text-red-600 dark:hover:text-red-400">
            {language === "ID" ? "Kirim Naskah Anda" : "Submit Your Script"}
            <FaArrowRight />
          </Link>
          */}

          {/* Link eksternal ke Google Form, buka tab baru */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScjRGUKsEUup8Dko-ozbXApZtAv5Y3eFrcASnX5P-dbLfAzyQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex items-center justify-center gap-2 text-sm mt-3 font-Outfit font-medium hover:text-red-600 dark:hover:text-red-400"
          >
            {language === "ID" ? "Kirim Naskah Anda" : "Submit Your Script"}
            <FaArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubmitFilm;
