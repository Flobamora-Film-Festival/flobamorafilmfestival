import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "./LanguageContext"; // Import Context

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ID",
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const switchLanguage = () => {
    setLanguage((prev) => (prev === "ID" ? "EN" : "ID"));
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
