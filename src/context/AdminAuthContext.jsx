import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminApi } from "../../api/adminApi";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Cek status login dari endpoint /me
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const user = await AdminApi.getCurrentAdmin();
      if (!isAuthenticated) setIsAuthenticated(true);
      if (!adminInfo) setAdminInfo(user);
      return user;
    } catch (error) {
      if (isAuthenticated) setIsAuthenticated(false);
      if (adminInfo !== null) setAdminInfo(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, adminInfo]);

  // Login dan arahkan bila berhasil
  const login = async (username, password) => {
    try {
      await AdminApi.login({ username, password });

      const user = await checkAuth();
      if (!user) throw new Error("Autentikasi gagal");

      // Hanya arahkan jika belum di dashboard
      if (location.pathname !== "/admin/dashboard") {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Logout & arahkan ke login
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
        checkAuth,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
