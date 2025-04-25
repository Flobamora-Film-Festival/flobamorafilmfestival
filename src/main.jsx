import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeProvider";
import { LanguageProvider } from "./context/LanguageProvider";
import { AuthProvider } from "./context/AuthContext"; // Pastikan AuthContext sudah ada
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        {" "}
        {/* Membungkus aplikasi dengan AuthProvider */}
        <ThemeProvider>
          <LanguageProvider>
            <App /> {/* Pastikan App di sini */}
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
