import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminContent from "../../components/admin/AdminContent";

const AdminDashboard = () => {
  // Menyimpan state apakah sidebar terbuka atau tertutup
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AdminLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
      <AdminContent isSidebarOpen={isSidebarOpen} />
    </AdminLayout>
  );
};

export default AdminDashboard;
