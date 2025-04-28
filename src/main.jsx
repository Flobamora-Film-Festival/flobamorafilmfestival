import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeProvider";
import { LanguageProvider } from "./context/LanguageProvider";
import { AuthProvider } from "./context/AuthContext"; // Pastikan AuthContext sudah ada
import { HelmetProvider } from "react-helmet-async";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        {" "}
        {/* Membungkus aplikasi dengan AuthProvider */}
        <ThemeProvider>
          <LanguageProvider>
            <GoogleReCaptchaProvider
              reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              scriptProps={{
                async: true,
                defer: true,
                appendTo: "head",
                nonce: undefined,
              }}
            >
              <App />
            </GoogleReCaptchaProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
