import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";
import { useAdminAuth } from "../../context/AdminAuthContext";
import LanguageToggle from "../../components/LanguageToggle";
import ThemeToggle from "../../components/ThemeToggle";
import { useTheme } from "../../context/ThemeProvider"; // Pastikan context ini meng-eksport useTheme

const translations = {
  ID: {
    title: "Login Admin",
    usernamePlaceholder: "Username",
    passwordPlaceholder: "Kata Sandi",
    loginButton: "Login",
    loginFailed: "Login gagal",
    errorMessage: "Periksa username dan kata sandi",
    networkError: "Terjadi kesalahan saat login",
    noAccess: "Akun ini tidak memiliki akses ke halaman admin.",
  },
  EN: {
    title: "Admin Login",
    usernamePlaceholder: "Username",
    passwordPlaceholder: "Password",
    loginButton: "Login",
    loginFailed: "Login failed",
    errorMessage: "Check your username and password",
    networkError: "An error occurred during login",
    noAccess: "This account doesn't have access to the admin panel.",
  },
};

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { language } = useLanguage();
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const t = translations[language] || translations.ID;

  // Atur tema sesuai waktu
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [setTheme]);

  // Cek apakah sudah terautentikasi sebelum menampilkan halaman login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard"); // Redirect ke dashboard jika sudah login
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend.flobamorafilmfestival.com/wp-json/custom/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // agar cookie diterima
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        let data;
        try {
          data = await response.json();
        } catch {
          data = {};
        }
        alert(`${t.loginFailed}: ${data.message || t.errorMessage}`);
        return;
      }

      // Panggil context login agar state frontend di-set
      await login(); // sudah akan redirect di dalamnya
    } catch (error) {
      console.error("Login error:", error);
      alert(t.networkError);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="absolute top-4 right-4 flex space-x-4">
        {/* Language Toggle */}
        <LanguageToggle />

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md p-6 border rounded shadow dark:bg-gray-800 dark:border-gray-700 mx-4 sm:mx-0">
        <h2 className="text-2xl font-bold mb-4 text-white">{t.title}</h2> {/* Menambahkan teks putih untuk judul */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder={t.usernamePlaceholder}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-300"
            required
          />
          <input
            type="password"
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-300"
            required
          />
          <button type="submit" className="w-full py-2 bg-red-700 text-white rounded hover:bg-red-800">
            {t.loginButton}
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLoginPage;
