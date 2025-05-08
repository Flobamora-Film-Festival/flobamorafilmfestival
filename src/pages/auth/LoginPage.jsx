import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";

const translations = {
  ID: {
    title: "Login",
    emailPlaceholder: "Email / Username",
    passwordPlaceholder: "Kata Sandi",
    loginButton: "Login",
    loginFailed: "Login gagal",
    errorMessage: "Periksa email dan kata sandi",
    networkError: "Terjadi kesalahan saat login",
    noAccount: "Belum punya akun?",
    registerHere: "Daftar di sini",
  },
  EN: {
    title: "Login",
    emailPlaceholder: "Email / Username",
    passwordPlaceholder: "Password",
    loginButton: "Login",
    loginFailed: "Login failed",
    errorMessage: "Check your email and password",
    networkError: "An error occurred during login",
    noAccount: "Don't have an account?",
    registerHere: "Register here",
  },
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { language } = useLanguage();

  const t = translations[language] || translations.ID;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend.flobamorafilmfestival.com/wp-json/jwt-auth/v1/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userName", data.user_display_name || email);
        localStorage.setItem("userEmail", email);
        navigate(-1); // kembali ke halaman sebelumnya
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
          <input type="text" placeholder={t.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder={t.passwordPlaceholder} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700">
            {t.loginButton}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          {t.noAccount}{" "}
          <Link to="/register" className="text-red-400 hover:underline">
            {t.registerHere}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
