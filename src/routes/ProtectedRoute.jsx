// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Mengecek token pengguna, bisa disesuaikan nanti jika menggunakan token khusus untuk user
  const token = localStorage.getItem("userToken"); // Token untuk user login (akan ditambahkan nanti)

  // Jika token tidak ada, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika token ada, tampilkan konten yang diakses
  return children;
};

export default ProtectedRoute;
// Nantinya, setelah fitur login untuk pengguna siap, Anda bisa mengganti localStorage.getItem("userToken")
// dengan token atau sistem autentikasi yang relevan untuk pengguna.Anda dapat menggunakan ProtectedRoute
// di route tertentu seperti halnya AdminRoute, untuk melindungi akses ke halaman form submit film.
