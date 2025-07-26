import React, { useContext } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { ThemeContext } from "../../context/ThemeContext";
import SpecialScreening from "./SpecialScreening";
import LayarNusantara from "./LayarNusantara";
import LayarInternasional from "./LayarInternasional";

const NonKompetisi = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage();
  const isDark = theme === "dark";

  const textColor = isDark ? "text-white" : "text-gray-900";
  const bgBase = isDark ? "bg-gray-900" : "bg-white";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";

  const SectionSpacer = () => (
    <div className={`${bgBase} border-t ${borderColor}`}>
      <div className="h-12 md:h-16 lg:h-20" />
    </div>
  );

  return (
    <div className="min-h-screen transition-all">
      {/* Header */}
      <header className={`${bgBase} ${textColor} py-14 px-6 lg:px-20 text-center`}>
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-snug">{language === "ID" ? "Program Non-Kompetisi" : "Non-Competition Program"}</h1>
        <p className="text-base lg:text-lg max-w-3xl mx-auto text-opacity-90">
          {language === "ID"
            ? "Program non-kompetisi menampilkan film pendek dari Indonesia dan internasional untuk memperkaya perspektif dan pengalaman menonton."
            : "The non-competition program features short films from Indonesia and abroad to enrich perspectives and cinematic experiences."}
        </p>
      </header>

      <SectionSpacer />

      {/* Special Screening */}
      <section className={`${bgBase} ${textColor} pt-10 pb-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpecialScreening />
        </div>
      </section>

      <SectionSpacer />

      {/* Layar Nusantara (gabungan open & kolaborasi) */}
      <section className={`${bgBase} ${textColor} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LayarNusantara />
        </div>
      </section>

      <SectionSpacer />

      {/* Layar Internasional */}
      <section className={`${bgBase} ${textColor} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LayarInternasional />
        </div>
      </section>

      {/* Footer Spacer */}
      <div className={bgBase}>
        <div className="h-20" />
      </div>
    </div>
  );
};

export default NonKompetisi;
