// src/components/AdminROute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  const location = useLocation();

  if (!token) {
    // Redirect ke halaman login admin, dengan state agar bisa kembali ke halaman sebelumnya setelah login
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;
