import React from "react";
import { Routes, Route } from "react-router-dom";

// Halaman Admin
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import EditProfile from "../pages/admin/EditProfile";

// Protected Routes
import AdminRoute from "../components/AdminRoute"; // Pastikan komponen ini ada

const AdminRoutes = () => {
  return (
    <Routes>
      {" "}
      {/* Pastikan Routes membungkus semua Route */}
      {/* Rute Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* Rute Admin Dashboard dan Edit Profile, dilindungi dengan AdminRoute */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <AdminRoute>
            <EditProfile />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
