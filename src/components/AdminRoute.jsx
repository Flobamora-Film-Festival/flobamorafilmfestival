import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken"); // Periksa token admin

  if (!token) {
    // Jika tidak ada token admin, arahkan ke halaman login admin
    return <Navigate to="/admin/login" replace />;
  }

  return children; // Jika ada token admin, tampilkan konten yang diakses
};

export default AdminRoute;
