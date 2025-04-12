import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "./ThemeContext"; // Pastikan path ini sesuai

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Ambil theme dari localStorage atau default ke 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Simpan ke localStorage
    localStorage.setItem("theme", theme);

    // Tambahkan atau hapus class 'dark' di <html>
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
