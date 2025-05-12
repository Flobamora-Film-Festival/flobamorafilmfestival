import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AdminApi } from "../api/AdminApi";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fungsi untuk memeriksa status login admin
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const user = await AdminApi.getCurrentAdmin();
      setIsAuthenticated(true);
      setAdminInfo(user);
    } catch {
      setIsAuthenticated(false);
      setAdminInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fungsi login, panggil login API lalu cek autentikasi
  const login = async (username, password) => {
    try {
      await AdminApi.login({ username, password });
      await checkAuth();
      navigate("/admin/dashboard");
    } catch (err) {
      throw err;
    }
  };

  // Fungsi logout
  const logout = async () => {
    try {
      await AdminApi.logout();
    } catch (err) {
      console.warn("Logout error:", err);
    }
    setIsAuthenticated(false);
    setAdminInfo(null);
    navigate("/admin/login");
  };

  // Cek status autentikasi saat komponen mount
  useEffect(() => {
    checkAuth();
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
