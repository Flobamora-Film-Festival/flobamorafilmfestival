import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider"; // Update import
import LayarNusantara from "./LayarNusantara";
import LayarInternasional from "./LayarInternasional";

const NonKompetisi = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // Use the custom hook `useLanguage`
  const isDark = theme === "dark";

  const textColor = isDark ? "text-white" : "text-gray-900";
  const bgHeader = isDark ? "bg-gray-900" : "bg-white";
  const bgSectionAlt = isDark ? "bg-gray-900" : "bg-white";
  const bgSectionBase = isDark ? "bg-gray-900" : "bg-white";

  return (
    <div className="min-h-screen transition-all">
      {/* Header */}
      <header className={`${bgHeader} ${textColor} py-14 px-6 lg:px-20 text-center`}>
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-snug">{language === "ID" ? "Program Non-Kompetisi" : "Non-Competition Program"}</h1>
        <p className="text-base lg:text-lg max-w-3xl mx-auto text-opacity-90">
          {language === "ID"
            ? "Program non-kompetisi menampilkan film pendek dari Indonesia dan internasional untuk memperkaya perspektif dan pengalaman menonton."
            : "The non-competition program features short films from Indonesia and abroad to enrich perspectives and cinematic experiences."}
        </p>
      </header>

      {/* Spacer */}
      <div className={`${bgSectionAlt} border-t border-gray-200 dark:border-gray-700`}>
        <div className="h-12 md:h-16 lg:h-20" />
      </div>

      {/* Section: Layar Nusantara */}
      <section className={`${bgSectionAlt} ${textColor} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LayarNusantara />
        </div>
      </section>

      {/* Spacer */}
      <div className={`${bgSectionAlt} border-t border-gray-200 dark:border-gray-700`}>
        <div className="h-12 md:h-16 lg:h-20" />
      </div>

      {/* Section: Layar Internasional */}
      <section className={`${bgSectionBase} ${textColor} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LayarInternasional />
        </div>
      </section>

      {/* Footer Spacer */}
      <div className={bgSectionBase}>
        <div className="h-20" />
      </div>
    </div>
  );
};

export default NonKompetisi;
