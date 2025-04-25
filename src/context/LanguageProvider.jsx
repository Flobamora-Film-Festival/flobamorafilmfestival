// src/context/LanguageProvider.jsx
import React, { createContext, useContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ID");

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

// Custom hook untuk akses context
export const useLanguage = () => useContext(LanguageContext);
