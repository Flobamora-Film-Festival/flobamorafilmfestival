import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext"; // Mengimpor dari Context

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth(); // Mengambil status autentikasi dan loading dari Context

  // Menampilkan loading jika autentikasi sedang diperiksa
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Memeriksa autentikasi admin...</p>
      </div>
    );
  }

  // Jika tidak terautentikasi, alihkan ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Jika sudah terautentikasi, tampilkan children (halaman yang dilindungi)
  return children;
};

export default AdminProtectedRoute;
