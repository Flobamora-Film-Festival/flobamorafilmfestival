/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/@fortawesome/fontawesome-free/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(200px, 1fr))",
      },
      fontFamily: {
        Outfit: ["Outfit", "sans-serif"],
        Ovo: ["Ovo", "serif"],
        comic: ["Comic Helvetic", "sans-serif"],
      },
      animation: {
        spin_slow: "spin 6s linear infinite",
      },
      transitionProperty: {
        theme: "background-color, color, border-color",
      },
      colors: {
        lightHover: "#fcf4ff",
        darkHover: "#1f2937",
        darkTheme: "#111827",
      },
      boxShadow: {
        black: "4px 4px 0 #000",
        white: "4px 4px 0 #fff",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
