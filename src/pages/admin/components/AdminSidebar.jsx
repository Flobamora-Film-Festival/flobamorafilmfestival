import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, FileTextIcon, ImageIcon, UsersIcon, SettingsIcon, FolderPlusIcon, TagIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { ThemeContext } from "../../../context/ThemeContext";

import logoLight from "../../../assets/logo.png";
import logoDark from "../../../assets/logo_dark.png";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const { theme } = useContext(ThemeContext);

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const logoSrc = theme === "dark" ? logoDark : logoLight;

  return (
    <aside
      className={`h-screen fixed top-0 left-0 flex flex-col transition-all duration-300 z-50
        ${isOpen ? "w-64" : "w-16"}
        ${theme === "dark" ? "bg-gray-900 text-white border-gray-800" : "bg-white text-black border-gray-200"}
      `}
    >
      {/* Header Logo */}
      <div
        className={`p-4 border-b flex items-center gap-3
          ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
        `}
      >
        <img src={logoSrc} alt="Logo" className="h-8 w-auto" />
        {isOpen && <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">Flobamora Film Festival</span>}
      </div>

      {/* Menu Utama */}
      <nav className="flex-1 overflow-y-auto mt-2">
        <ul className="space-y-1 px-2">
          <SidebarItem icon={<HomeIcon size={18} />} label="Dashboard" to="/admin" isOpen={isOpen} />
          <SidebarItem icon={<FileTextIcon size={18} />} label="Posts" to="/admin/posts" isOpen={isOpen} />
          <SidebarItem icon={<FolderPlusIcon size={18} />} label="Categories" to="/admin/categories" isOpen={isOpen} />
          <SidebarItem icon={<TagIcon size={18} />} label="Tags" to="/admin/tags" isOpen={isOpen} />
          <SidebarItem icon={<ImageIcon size={18} />} label="Media" to="/admin/media" isOpen={isOpen} />
          <SidebarItem icon={<UsersIcon size={18} />} label="Users" to="/admin/users" isOpen={isOpen} />
          <SidebarItem icon={<SettingsIcon size={18} />} label="Settings" to="/admin/settings" isOpen={isOpen} />
        </ul>
      </nav>

      {/* Collapse Menu di Bawah */}

      <button
        onClick={toggleSidebar}
        className={`w-full flex items-center gap-2 px-2 py-1 rounded
            ${theme === "dark" ? "text-gray-100 hover:bg-gray-700" : "text-gray-800 hover:bg-gray-200"}
          `}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        {isOpen && <span>Collapse menu</span>}
      </button>
    </aside>
  );
};

const SidebarItem = ({ icon, label, to, isOpen }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded transition
        ${isActive ? "bg-red-600 text-white font-semibold" : "hover:bg-gray-300 dark:hover:bg-gray-700"}`
      }
    >
      {icon}
      {isOpen && label}
    </NavLink>
  </li>
);

export default AdminSidebar;
