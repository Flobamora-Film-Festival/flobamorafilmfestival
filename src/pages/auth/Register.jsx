import React, { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { useLanguage } from "../../context/LanguageProvider";
import { ThemeContext } from "../../context/ThemeContext"; // Use this for theme

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Language and Theme context
  const { language, setLanguage } = useLanguage();
  const { theme } = useContext(ThemeContext); // Use context for theme

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className={`w-full max-w-md rounded-lg p-8 shadow-lg border ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">{language === "ID" ? "Buat Akun" : "Create an Account"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={language === "ID" ? "Email" : "Email"}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={language === "ID" ? "Kata Sandi" : "Password"}
            className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700">
            {language === "ID" ? "Daftar" : "Sign Up"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}

        {/* Link Back to Login */}
        <div className="mt-4 text-center">
          <span>
            {language === "ID" ? "Sudah punya akun? " : "Already have an account? "}
            <button onClick={() => navigate("/login")} className="text-blue-500 hover:text-blue-700">
              {language === "ID" ? "Masuk di sini" : "Log in here"}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
