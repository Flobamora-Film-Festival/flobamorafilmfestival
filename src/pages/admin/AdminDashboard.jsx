import React, { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminContent from "./components/AdminContent";
import AdminFooter from "./components/AdminFooter";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Konten Utama */}
      <div className="flex flex-col flex-1">
        <AdminHeader isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto">
          <AdminContent isSidebarOpen={isSidebarOpen} />
        </main>
        <AdminFooter isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default AdminDashboard;
