import React, { useContext } from "react";
import { useLanguage } from "../../../context/LanguageProvider"; // Asumsi sudah ada LanguageProvider
import { ThemeContext } from "../../../context/ThemeContext";

const AdminFooter = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // Mendapatkan bahasa dari context

  return (
    <div className={`p-4 text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
      <p>{language === "ID" ? "&copy; 2025 Flobamora Film Festival. Hak cipta dilindungi." : "&copy; 2025 Flobamora Film Festival. All rights reserved."}</p>
    </div>
  );
};

export default AdminFooter;
