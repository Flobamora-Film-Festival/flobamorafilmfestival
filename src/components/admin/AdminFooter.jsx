import React, { useContext } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { ThemeContext } from "../../context/ThemeContext";

const AdminFooter = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage();

  const textColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`p-4 text-center text-sm ${textColor}`}>
      <p>© 2025 Flobamora Film Festival. {language === "ID" ? "Hak cipta dilindungi." : "All rights reserved."}</p>
    </div>
  );
};

export default AdminFooter;
