import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";
import { Link } from "react-router-dom"; // Pastikan untuk mengimpor Link

const translations = {
  ID: {
    title: "Daftar",
    emailPlaceholder: "Email / Username",
    passwordPlaceholder: "Kata Sandi",
    confirmPasswordPlaceholder: "Konfirmasi Kata Sandi",
    registerButton: "Daftar",
    registerSuccess: "Pendaftaran berhasil",
    registerFailed: "Pendaftaran gagal",
    errorMessage: "Periksa email dan kata sandi",
    networkError: "Terjadi kesalahan saat pendaftaran",
    alreadyHaveAccount: "Sudah punya akun?",
    loginHere: "Login di sini",
  },
  EN: {
    title: "Register",
    emailPlaceholder: "Email / Username",
    passwordPlaceholder: "Password",
    confirmPasswordPlaceholder: "Confirm Password",
    registerButton: "Register",
    registerSuccess: "Registration successful",
    registerFailed: "Registration failed",
    errorMessage: "Check your email and password",
    networkError: "An error occurred during registration",
    alreadyHaveAccount: "Already have an account?",
    loginHere: "Login here",
  },
};

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { language } = useLanguage();

  const t = translations[language] || translations.ID;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert(t.errorMessage); // Jika password dan konfirmasi tidak cocok
      return;
    }

    try {
      const response = await fetch("https://backend.flobamorafilmfestival.com/wp-json/jwt-auth/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userName", data.user_display_name || email);
        localStorage.setItem("userEmail", email);
        alert(t.registerSuccess); // Berhasil daftar
        navigate("/login"); // Setelah berhasil, arahkan ke halaman login
      } else {
        alert(`${t.registerFailed}: ${data.message || t.errorMessage}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(t.networkError);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded shadow dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder={t.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder={t.passwordPlaceholder} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder={t.confirmPasswordPlaceholder} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700">
            {t.registerButton}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          {t.alreadyHaveAccount}{" "}
          <Link to="/login" className="text-red-400 hover:underline">
            {t.loginHere}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
