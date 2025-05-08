import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";

const translations = {
  ID: {
    title: "Login Admin",
    usernamePlaceholder: "Username",
    passwordPlaceholder: "Kata Sandi",
    loginButton: "Login",
    loginFailed: "Login gagal",
    errorMessage: "Periksa username dan kata sandi",
    networkError: "Terjadi kesalahan saat login",
  },
  EN: {
    title: "Admin Login",
    usernamePlaceholder: "Username",
    passwordPlaceholder: "Password",
    loginButton: "Login",
    loginFailed: "Login failed",
    errorMessage: "Check your username and password",
    networkError: "An error occurred during login",
  },
};

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { language } = useLanguage();
  const navigate = useNavigate();

  const t = translations[language] || translations.ID;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend.flobamorafilmfestival.com/wp-json/jwt-auth/v1/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUsername", data.user_display_name || username);
        navigate("/admin/dashboard");
      } else {
        alert(`${t.loginFailed}: ${data.message || t.errorMessage}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(t.networkError);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded shadow dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" placeholder={t.usernamePlaceholder} value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder={t.passwordPlaceholder} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full py-2 bg-red-700 text-white rounded hover:bg-red-800">
            {t.loginButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
