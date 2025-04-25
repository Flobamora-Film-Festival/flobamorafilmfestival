import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Gunakan custom hook

const DurationInputField = ({ label, name, value, onChange, error, required = false }) => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // Access the language context

  const inputClassName = `w-full px-4 py-2 border border-gray-300 rounded-md mt-2 ${theme === "dark" ? "bg-white text-black" : "bg-white text-gray-900"}`;

  // Untuk pesan error multibahasa (jika perlu)
  const errorMessages = {
    ID: "Format durasi harus MM:SS",
    EN: "Duration format must be MM:SS",
  };

  const handleInputChange = (e) => {
    let raw = e.target.value.replace(/[^\d]/g, "");
    if (raw.length > 4) raw = raw.slice(0, 4);

    let formatted = raw;
    if (raw.length > 2) {
      const minutes = raw.slice(0, raw.length - 2);
      const seconds = raw.slice(-2);
      if (parseInt(seconds) > 59) return; // validasi detik
      formatted = `${minutes}:${seconds}`;
    }

    onChange({
      target: {
        name,
        value: formatted,
      },
    });
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-lg font-medium">{label}</label>}
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        required={required}
        placeholder="MM:SS"
        className={inputClassName}
        inputMode="numeric"
        pattern="^\d{1,2}:\d{2}$"
        title={errorMessages[language] || errorMessages.ID}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DurationInputField;
