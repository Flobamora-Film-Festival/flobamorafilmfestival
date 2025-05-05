import React, { useContext } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { ThemeContext } from "../../context/ThemeContext";
import { BarChart3, Users, FileText } from "lucide-react";

const AdminContent = ({ isSidebarOpen }) => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage();
  const contentMargin = isSidebarOpen ? "ml-64" : "ml-16";

  const stats = [
    {
      title: language === "ID" ? "Artikel" : "Articles",
      value: 10,
      description: language === "ID" ? "Jumlah artikel yang dipublikasikan" : "Number of published articles",
      icon: <FileText className="w-8 h-8 text-blue-500" />,
    },
    {
      title: language === "ID" ? "Kompetisi" : "Competitions",
      value: 5,
      description: language === "ID" ? "Jumlah kompetisi yang sedang berlangsung" : "Ongoing competitions",
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
    },
    {
      title: language === "ID" ? "Pengguna" : "Users",
      value: 100,
      description: language === "ID" ? "Jumlah pengguna terdaftar" : "Total registered users",
      icon: <Users className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <div
      className={`flex-grow min-h-screen transition-colors duration-300 px-6 pt-6
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <h1 className="text-3xl font-bold mb-8">{language === "ID" ? "Dashboard Admin" : "Admin Dashboard"}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center gap-6 p-6 rounded-md border transition-all duration-300 hover:shadow-md
              ${theme === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-100"}`}
          >
            <div>{stat.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContent;
