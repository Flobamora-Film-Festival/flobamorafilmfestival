import React, { useContext } from "react";
import { useLanguage } from "../../../context/LanguageProvider";
import { ThemeContext } from "../../../context/ThemeContext";

const AdminContent = ({ isSidebarOpen }) => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage();

  const stats = [
    {
      title: language === "ID" ? "Artikel" : "Articles",
      value: 10,
      description: language === "ID" ? "Jumlah artikel yang dipublikasikan" : "Number of published articles",
    },
    {
      title: language === "ID" ? "Kompetisi" : "Competitions",
      value: 5,
      description: language === "ID" ? "Jumlah kompetisi yang sedang berlangsung" : "Ongoing competitions",
    },
    {
      title: language === "ID" ? "Pengguna" : "Users",
      value: 100,
      description: language === "ID" ? "Jumlah pengguna terdaftar" : "Total registered users",
    },
  ];

  return (
    <div className={`flex-grow p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"} ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
      <h1 className="text-3xl font-semibold mb-6">{language === "ID" ? "Selamat Datang di Dashboard Admin" : "Welcome to Admin Dashboard"}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <h3 className={`text-xl font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{stat.title}</h3>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContent;
