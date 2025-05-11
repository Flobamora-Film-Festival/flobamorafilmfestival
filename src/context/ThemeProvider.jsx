// src/context/ThemeProvider.jsx
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "./ThemeContext"; // Pastikan ini

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) return storedTheme;
  const hour = new Date().getHours();
  return hour < 6 || hour >= 18 ? "dark" : "light";
};

// Hook untuk menggunakan tema
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
