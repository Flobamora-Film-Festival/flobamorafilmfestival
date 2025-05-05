import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, FileTextIcon, ImageIcon, UsersIcon, SettingsIcon, FolderPlusIcon, TagIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider"; // Import useLanguage
import logoLight from "../../assets/logo.png";
import logoDark from "../../assets/logo_dark.png";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // Mengakses bahasa yang aktif
  const logoSrc = theme === "dark" ? logoDark : logoLight;

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"}
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}
      `}
    >
      {/* Sidebar Header */}
      <div
        className={`
          flex items-center px-4 py-4 border-b min-h-16 transition-all duration-300
          ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
        `}
      >
        <img src={logoSrc} alt="Logo" className="h-9 object-contain max-w-[40px]" />
        <div
          className={`ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap
            ${isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"}
          `}
        >
          <span className="text-base font-semibold tracking-tight">{language === "ID" ? "Flobamora Film Festival" : "Flobamora Film Festival"}</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto mt-2 pt-4">
        <ul className="space-y-1 px-2">
          <SidebarItem icon={<HomeIcon size={18} />} label={language === "ID" ? "Dasbor" : "Dashboard"} to="/admin" isOpen={isOpen} />
          <SidebarItem icon={<FileTextIcon size={18} />} label={language === "ID" ? "Postingan" : "Posts"} to="/admin/posts" isOpen={isOpen} />
          <SidebarItem icon={<FolderPlusIcon size={18} />} label={language === "ID" ? "Kategori" : "Categories"} to="/admin/categories" isOpen={isOpen} />
          <SidebarItem icon={<TagIcon size={18} />} label={language === "ID" ? "Tag" : "Tags"} to="/admin/tags" isOpen={isOpen} />
          <SidebarItem icon={<ImageIcon size={18} />} label={language === "ID" ? "Media" : "Media"} to="/admin/media" isOpen={isOpen} />
          <SidebarItem icon={<UsersIcon size={18} />} label={language === "ID" ? "Pengguna" : "Users"} to="/admin/users" isOpen={isOpen} />
          <SidebarItem icon={<SettingsIcon size={18} />} label={language === "ID" ? "Pengaturan" : "Settings"} to="/admin/settings" isOpen={isOpen} />
        </ul>
      </nav>

      {/* Vertical Separator */}
      <div
        className={`absolute top-0 right-0 h-full w-px transition-colors duration-300
          ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}
        `}
      />

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className={`
          w-full flex items-center transition-all duration-300
          ${isOpen ? "px-2 py-3 justify-start gap-2" : "p-3 justify-center"}
          ${theme === "dark" ? "text-gray-100 hover:bg-gray-700" : "text-gray-800 hover:bg-gray-200"}
        `}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        <span
          className={`transition-all duration-300 overflow-hidden origin-left
            ${isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"}
          `}
        >
          {language === "ID" ? "Tutup Menu" : "Collapse menu"}
        </span>
      </button>
    </aside>
  );
};

const SidebarItem = ({ icon, label, to, isOpen }) => (
  <li>
    <NavLink
      to={to}
      title={label} // Fallback title
      className={({ isActive }) =>
        `
          flex items-center py-2 rounded transition-all duration-300
          ${isOpen ? "px-4" : "px-3 justify-center"}
          ${isActive ? "bg-red-600 text-white font-semibold" : "hover:bg-gray-300 dark:hover:bg-gray-700"}
        `
      }
    >
      <div className="w-5 flex-shrink-0">{icon}</div>

      {/* Teks hanya tampil saat sidebar terbuka */}
      <span
        className={`ml-2 transition-all duration-200 overflow-hidden whitespace-nowrap
          ${isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"}
        `}
      >
        {label}
      </span>
    </NavLink>

    {/* Tooltip muncul saat sidebar collapse */}
    {!isOpen && (
      <div
        className={`
          absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 rounded-md text-sm whitespace-nowrap z-50
          opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none
          ${window.matchMedia("(prefers-color-scheme: dark)").matches ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}
        `}
      >
        {label}
      </div>
    )}
  </li>
);

export default AdminSidebar;
