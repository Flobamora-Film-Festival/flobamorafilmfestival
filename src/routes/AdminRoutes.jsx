import React from "react";
import { Routes, Route } from "react-router-dom";

// Halaman Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import EditProfile from "../pages/admin/EditProfile";

// Halaman News
import NewsList from "../pages/admin/news/NewsList";
import NewsCreate from "../pages/admin/news/NewsCreate";
import NewsEdit from "../pages/admin/news/NewsEdit";

// Layout & Protected Route
import AdminLayout from "../components/admin/AdminLayout";
import AdminRoute from "../components/AdminRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route
        path=""
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminRoute>
        }
      />

      {/* Edit Profile */}
      <Route
        path="profile"
        element={
          <AdminRoute>
            <AdminLayout>
              <EditProfile />
            </AdminLayout>
          </AdminRoute>
        }
      />

      {/* News Management */}
      <Route
        path="news"
        element={
          <AdminRoute>
            <AdminLayout>
              <NewsList />
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="news/create"
        element={
          <AdminRoute>
            <AdminLayout>
              <NewsCreate />
            </AdminLayout>
          </AdminRoute>
        }
      />
      <Route
        path="news/:newsId/edit"
        element={
          <AdminRoute>
            <AdminLayout>
              <NewsEdit />
            </AdminLayout>
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
