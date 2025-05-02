import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, HomeIcon, LayoutDashboardIcon, HelpCircleIcon, MonitorIcon, UserIcon, SunIcon, MoonIcon } from "lucide-react";
import { useLanguage } from "../../../context/LanguageProvider";
import { ThemeContext } from "../../../context/ThemeContext";

const AdminHeader = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Fungsi untuk mengganti bahasa
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <header
      className={`flex justify-between items-center px-6 py-4 border-b ${theme === "dark" ? "bg-gray-900 text-white border-gray-800" : "bg-gray-100 text-black border-gray-300"} transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}
    >
      {/* Kiri: Shortcut */}
      <div className="flex items-center gap-6">
        <button onClick={() => navigate("/admin/add")} className="flex items-center gap-2 hover:text-red-400">
          <PlusIcon size={18} /> <span>{language === "ID" ? "Tambah Baru" : "Add New"}</span>
        </button>
        <button onClick={() => window.open("/", "_blank")} className="flex items-center gap-2 hover:text-red-400">
          <HomeIcon size={18} /> <span>{language === "ID" ? "Halaman Utama" : "Your Site"}</span>
        </button>
        <button onClick={() => navigate("/admin")} className="flex items-center gap-2 hover:text-red-400">
          <LayoutDashboardIcon size={18} /> <span>{language === "ID" ? "Dasbor" : "Dashboard"}</span>
        </button>
        <button onClick={() => alert("Coming soon")} className="flex items-center gap-2 hover:text-red-400">
          <MonitorIcon size={18} /> <span>{language === "ID" ? "Opsi Layar" : "Display Options"}</span>
        </button>
        <button onClick={() => alert("Help page not available yet")} className="flex items-center gap-2 hover:text-red-400">
          <HelpCircleIcon size={18} /> <span>{language === "ID" ? "Bantuan" : "Help"}</span>
        </button>
      </div>

      {/* Kanan: Language Toggle, Theme Toggle and Dropdown */}
      <div className="flex items-center gap-6">
        {/* Language Toggle */}
        <div className="flex space-x-2">
          {["ID", "EN"].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`text-sm px-3 py-1 border rounded transition
        ${language === lang ? "border-red-600 font-semibold" : theme === "dark" ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"}
        ${theme === "dark" ? "hover:bg-red-700" : "hover:bg-red-500 hover:text-white"}
      `}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-red-600">
          {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>

        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <UserIcon size={18} />
            <span className="text-sm">
              {language === "ID" ? "Halo, " : "Howdy, "} <strong>Admin</strong>
            </span>
          </div>
          {dropdownOpen && (
            <div className={`absolute right-0 mt-2 w-48 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"} rounded shadow-lg z-50`}>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/admin/profile");
                }}
                className="w-full text-left px-4 py-2 hover:bg-red-600"
              >
                {language === "ID" ? "Edit Profil" : "Edit Profile"}
              </button>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-600">
                {language === "ID" ? "Logout" : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
