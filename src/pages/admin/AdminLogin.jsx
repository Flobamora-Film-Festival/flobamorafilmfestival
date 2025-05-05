import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useLanguage } from "../../context/LanguageProvider";
import { ThemeContext } from "../../context/ThemeContext";

const AdminLogin = () => {
  const [email, setEmail] = useState(""); // Email sekarang pakai state
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Tambahkan loading state
  const navigate = useNavigate();

  const { language } = useLanguage();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on new login attempt

    if (!email || !password) {
      setError(language === "ID" ? "Email dan password wajib diisi!" : "Email and password are required!");
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(language === "ID" ? "Email tidak valid!" : "Invalid email format!");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email === email) {
        localStorage.setItem("adminToken", user.uid);
        navigate("/admin");
      } else {
        setError(language === "ID" ? "Anda bukan admin!" : "You are not an admin!");
      }
    } catch (err) {
      setError(language === "ID" ? "Login gagal!" : "Login failed!");
    } finally {
      setLoading(false); // Stop loading after login attempt
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className={`w-full max-w-md rounded-lg p-8 shadow-lg border ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">{language === "ID" ? "Masuk Admin" : "Admin Login"}</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input
            type="password"
            placeholder={language === "ID" ? "Kata Sandi" : "Password"}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700"
            disabled={loading} // Disable button while loading
          >
            {loading ? (language === "ID" ? "Memuat..." : "Loading...") : language === "ID" ? "Masuk" : "Log In"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
