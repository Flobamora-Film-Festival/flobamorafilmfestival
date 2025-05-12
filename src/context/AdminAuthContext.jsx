import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdminApi } from "../../api/adminApi";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fungsi untuk memeriksa status login admin dengan token JWT
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const user = await AdminApi.getCurrentAdmin(); // Mengambil data admin menggunakan JWT
      setIsAuthenticated(true);
      setAdminInfo(user);
    } catch (error) {
      setIsAuthenticated(false);
      setAdminInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fungsi login, panggil login API dari plugin Simple JWT Login
  const login = async (username, password) => {
    try {
      await AdminApi.login({ username, password }); // Login dengan API dari plugin Simple JWT
      await checkAuth(); // Verifikasi status login admin
      navigate("/admin/dashboard");
    } catch (err) {
      throw err;
    }
  };

  // Fungsi logout, hapus cookie JWT
  const logout = async () => {
    try {
      await AdminApi.logout(); // Hapus token dari cookie
    } catch (err) {
      console.warn("Logout error:", err);
    }
    setIsAuthenticated(false);
    setAdminInfo(null);
    navigate("/admin/login"); // Navigasi ke halaman login
  };

  // Cek status autentikasi saat komponen mount
  useEffect(() => {
    checkAuth(); // Periksa autentikasi saat komponen pertama kali di-render
  }, [checkAuth]);

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminInfo,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook untuk akses context
export const useAdminAuth = () => useContext(AdminAuthContext);
