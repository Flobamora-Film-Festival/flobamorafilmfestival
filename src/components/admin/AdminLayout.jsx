import React, { useContext, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { ThemeContext } from "../../context/ThemeContext";

const AdminLayout = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarMargin = isSidebarOpen ? "ml-64" : "ml-16";

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-grow transition-all duration-300">
        <div className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${sidebarMargin}`}>
          <AdminHeader isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        <main className={`flex-grow pt-24 px-6 transition-all duration-300 ${sidebarMargin}`}>{children}</main>

        <div className={`transition-all duration-300 ${sidebarMargin}`}>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
