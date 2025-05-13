import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdminApi } from "../../api/adminApi"; // Gunakan AdminApi yang baru

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fungsi untuk memeriksa status login admin dengan cookie HttpOnly
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const user = await AdminApi.getCurrentAdmin();
      console.log("User admin:", user); // Debugging, cek user
      setIsAuthenticated(true);
      setAdminInfo(user); // Simpan user langsung
    } catch (error) {
      console.error("Authentication failed:", error);
      setIsAuthenticated(false);
      setAdminInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fungsi login
  const login = async (username, password) => {
    try {
      await AdminApi.login({ username, password });
      console.log("Login successful, checking auth..."); // Debugging
      await checkAuth();
      navigate("/admin/dashboard"); // Redirect ke dashboard
    } catch (err) {
      console.error("Login error:", err);
      throw err; // Meneruskan error untuk ditangani di halaman login
    }
  };

  // Fungsi logout
  const logout = async () => {
    try {
      await AdminApi.logout(); // Hapus cookie di server (plugin custom yang akan menghapusnya)
    } catch (err) {
      console.warn("Logout error:", err);
    }
    setIsAuthenticated(false);
    setAdminInfo(null);
    navigate("/admin/login");
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
