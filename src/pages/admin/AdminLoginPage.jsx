import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";
import { useAdminAuth } from "../../context/AdminAuthContext"; // ✅ digunakan
import LanguageToggle from "../../components/LanguageToggle";
import ThemeToggle from "../../components/ThemeToggle";
import { useTheme } from "../../context/ThemeProvider";

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
  const { login, isAuthenticated } = useAdminAuth(); // ✅ digunakan dengan benar
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const t = translations[language] || translations.ID;

  useEffect(() => {
    const hour = new Date().getHours();
    setTheme(hour >= 18 || hour < 6 ? "dark" : "light");
  }, [setTheme]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      // Redirect ke halaman yang dituju sebelum login
      navigate(from, { replace: true });
    } catch (err) {
      const message = err?.message?.includes("403") || err?.message?.includes("401") ? t.noAccess : `${t.loginFailed}: ${err.message || t.errorMessage}`;
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div className="absolute top-4 right-4 flex space-x-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md p-6 border rounded shadow dark:bg-gray-800 dark:border-gray-700 mx-4 sm:mx-0">
        <h2 className="text-2xl font-bold mb-4 text-white">{t.title}</h2>
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
