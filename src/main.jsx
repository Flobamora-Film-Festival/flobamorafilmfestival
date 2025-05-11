// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App";
import AdminApp from "./AdminApp";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext"; // pastikan ini ada
import { ThemeProvider } from "./context/ThemeProvider";
import { LanguageProvider } from "./context/LanguageProvider";
import "./index.css";

const RouterEntry = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? (
    <AdminAuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AdminApp />
        </LanguageProvider>
      </ThemeProvider>
    </AdminAuthProvider>
  ) : (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <RouterEntry />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
