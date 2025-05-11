import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext"; // Pastikan ini diimpor
import { ThemeProvider } from "./context/ThemeProvider"; // Pastikan ini diimpor
import { LanguageProvider } from "./context/LanguageProvider"; // Pastikan ini diimpor

// Halaman admin
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

const AdminApp = () => {
  return (
    <AdminAuthProvider>
      {/* Pembungkus untuk menyediakan context autentikasi admin */}
      <LanguageProvider>
        {/* Pembungkus untuk menyediakan context bahasa */}
        <ThemeProvider>
          {/* Pembungkus untuk menyediakan context tema */}
          <Routes>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            {/* Tambahkan route lain jika perlu */}
          </Routes>
        </ThemeProvider>
      </LanguageProvider>
    </AdminAuthProvider>
  );
};

export default AdminApp;
