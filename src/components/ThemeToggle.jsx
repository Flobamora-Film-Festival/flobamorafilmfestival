// src/components/ThemeToggle.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Perbaiki impor ini
import sun_icon from "../assets/sun_icon.png";
import moon_icon from "../assets/moon_icon.png";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  return (
    <button onClick={toggleTheme} aria-label="Toggle dark mode" className="transition-all duration-300">
      <img src={isDarkMode ? sun_icon : moon_icon} alt="Theme Icon" className="w-6 transition-transform duration-300" />
    </button>
  );
};

export default ThemeToggle;
