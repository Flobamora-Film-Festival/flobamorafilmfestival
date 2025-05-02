import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("userToken"); // Periksa token user

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  return children; // Jika ada token, tampilkan konten yang diakses
};

export default PrivateRoute;
