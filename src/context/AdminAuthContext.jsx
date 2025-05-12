import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdminApi } from "../../api/adminApi"; // Pastikan AdminApi diatur untuk memanfaatkan cookie HttpOnly

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fungsi untuk memeriksa status login admin dengan token JWT dari cookie HttpOnly
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await AdminApi.getCurrentAdmin(); // Memanggil endpoint yang mengembalikan data admin jika token valid
      if (res && res.data) {
        setIsAuthenticated(true);
        setAdminInfo(res.data); // Menyimpan informasi admin
      } else {
        setIsAuthenticated(false);
        setAdminInfo(null);
      }
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
      await AdminApi.login({ username, password }); // Mengirimkan data login dan biarkan plugin Simple JWT mengelola cookie HttpOnly
      await checkAuth(); // Verifikasi status login admin setelah login berhasil
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Fungsi logout, panggil endpoint logout dari plugin Simple JWT Login
  const logout = async () => {
    try {
      await AdminApi.logout(); // Hapus cookie JWT di server (server yang akan menghapusnya)
    } catch (err) {
      console.warn("Logout error:", err);
    }
    setIsAuthenticated(false);
    setAdminInfo(null);
    navigate("/admin/login"); // Navigasi ke halaman login setelah logout
  };

  // Cek status autentikasi saat komponen mount
  useEffect(() => {
    checkAuth(); // Periksa status autentikasi saat komponen pertama kali di-render
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

export const useAdminAuth = () => useContext(AdminAuthContext);
