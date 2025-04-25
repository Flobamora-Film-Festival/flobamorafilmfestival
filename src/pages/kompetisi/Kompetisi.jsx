import React, { useContext } from "react";
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Gunakan custom hook
import { ThemeContext } from "../../context/ThemeContext"; // Tetap gunakan useContext untuk ThemeContext
import LayarKompetisiFilmNTT from "./LayarKompetisiFilmNTT";
import LayarKompetisiFilmPelajarNTT from "./LayarKompetisiFilmPelajarNTT";

const Kompetisi = () => {
  const { theme } = useContext(ThemeContext); // ✅ Tetap menggunakan useContext untuk ThemeContext
  const { language } = useLanguage(); // ✅ Gunakan custom hook untuk mengambil language
  const isDark = theme === "dark";

  const textColor = isDark ? "text-white" : "text-gray-900";
  const bgHeader = isDark ? "bg-gray-900" : "bg-white";
  const bgSectionAlt = isDark ? "bg-gray-900" : "bg-white";
  const bgSectionBase = isDark ? "bg-gray-900" : "bg-white";

  return (
    <div className="min-h-screen transition-all">
      {/* Header */}
      <header className={`${bgHeader} ${textColor} py-14 px-6 lg:px-20 text-center`}>
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-snug">{language === "ID" ? "Program Kompetisi" : "Competition Program"}</h1>
        <p className="text-base lg:text-lg max-w-3xl mx-auto text-opacity-90">
          {language === "ID"
            ? "Program kompetisi menampilkan film pendek dari sineas NTT dan pelajar NTT dalam dua kategori utama."
            : "The competition program presents short films from filmmakers and students of East Nusa Tenggara in two main categories."}
        </p>
      </header>

      {/* Spacer */}
      <div className={`${bgSectionAlt} border-t border-gray-200 dark:border-gray-700`}>
        <div className="h-12 md:h-16 lg:h-20" />
      </div>

      {/* Section: Kompetisi Film NTT */}
      <section className={`${bgSectionAlt} ${textColor} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LayarKompetisiFilmNTT />
        </div>
      </section>

      {/* Spacer */}
      <div className={`${bgSectionAlt} border-t border-gray-200 dark:border-gray-700`}>
        <div className="h-12 md:h-16 lg:h-20" />
      </div>

      {/* Section: Kompetisi Film Pelajar NTT */}
      <section className={`${bgSectionBase} ${textColor} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LayarKompetisiFilmPelajarNTT />
        </div>
      </section>

      {/* Footer Spacer */}
      <div className={bgSectionBase}>
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Kompetisi;
