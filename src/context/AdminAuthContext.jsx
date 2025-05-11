// src/context/AdminAuthProvider.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fungsi untuk memeriksa autentikasi
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://backend.flobamorafilmfestival.com/wp-json/wp/v2/users/me", {
        method: "GET",
        credentials: "include", // Menggunakan cookie untuk autentikasi
      });

      if (!res.ok) throw new Error("Not authenticated");

      const user = await res.json();
      if (user.roles.includes("administrator")) {
        setIsAuthenticated(true);
        setAdminInfo(user);
      } else {
        setIsAuthenticated(false);
        setAdminInfo(null);
      }
    } catch {
      setIsAuthenticated(false);
      setAdminInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fungsi login, mengharuskan untuk memeriksa autentikasi setelah login
  const login = async () => {
    await checkAuth(); // panggil untuk memeriksa setelah login berhasil
    navigate("/admin/dashboard");
  };

  // Fungsi logout, akan menghapus cookie JWT
  const logout = async () => {
    try {
      // Memanggil endpoint logout untuk menghapus cookie JWT
      await fetch("https://backend.flobamorafilmfestival.com/wp-json/custom/v1/logout", {
        method: "POST",
        credentials: "include", // Menjamin cookie JWT dikirim
      });
    } catch (err) {
      console.warn("Logout error:", err);
    }
    // Menghapus status autentikasi setelah logout
    setIsAuthenticated(false);
    setAdminInfo(null);
    navigate("/admin/login");
  };

  // Mengecek status autentikasi saat komponen pertama kali dimuat
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <AdminAuthContext.Provider value={{ isAuthenticated, adminInfo, loading, login, logout }}>{children}</AdminAuthContext.Provider>;
};

// Custom hook untuk menggunakan autentikasi admin
export const useAdminAuth = () => useContext(AdminAuthContext);
