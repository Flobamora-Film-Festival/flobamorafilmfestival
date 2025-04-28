import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeProvider";
import { LanguageProvider } from "./context/LanguageProvider";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <HelmetProvider>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <App />
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </HelmetProvider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);
