import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Gunakan custom hook

const SubmitButton = ({ label, isSubmitting }) => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // Access the language context

  const isDark = theme === "dark";

  return (
    <div className="mt-4 text-center">
      <button
        type="submit"
        disabled={isSubmitting}
        className={`mx-auto flex justify-center items-center bg-gradient-to-r from-purple-600 to-orange-500 text-white px-10 py-3 rounded-full text-lg transition-opacity ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
      >
        {isSubmitting ? (language === "ID" ? "Mengirim..." : "Submitting...") : label}
      </button>
    </div>
  );
};

export default SubmitButton;
