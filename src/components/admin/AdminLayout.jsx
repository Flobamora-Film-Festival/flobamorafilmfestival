import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AdminFooter from "./AdminFooter";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar untuk desktop */}
      <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-md">
        <Sidebar />
      </aside>

      {/* Sidebar untuk mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
          <div className="flex-1 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <header className="shadow bg-white dark:bg-gray-800 md:pl-64">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </header>

        <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">{children}</main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 text-sm text-center text-gray-500 dark:text-gray-400">
          <AdminFooter />
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
