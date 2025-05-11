import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        {/* Tombol untuk membuka sidebar di mobile */}
        <button className="md:hidden text-gray-600 dark:text-gray-400" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Admin Panel</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">Welcome, Admin</span>
        {/* Logout Button */}
        <button className="text-sm text-red-600 hover:underline">Logout</button>
      </div>
    </div>
  );
};

export default Header;
