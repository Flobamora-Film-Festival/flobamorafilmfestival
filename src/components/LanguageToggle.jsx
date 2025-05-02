// src/components/LanguageToggle.jsx
import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider"; // pastikan context ini sudah ada

const LanguageToggle = ({ toggleTheme, isDarkMode, toggleMenu, isMenuOpen }) => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="flex items-center gap-4">
      <div className="flex space-x-4">
        <button onClick={() => setLanguage("ID")} className={`text-sm font-semibold ${language === "ID" ? "border-2 border-red-500 text-red-500 px-2 py-1" : "text-gray-500"}`}>
          ID
        </button>

        <button onClick={() => setLanguage("EN")} className={`text-sm font-semibold ${language === "EN" ? "border-2 border-red-500 text-red-500 px-2 py-1" : "text-gray-500"}`}>
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;
