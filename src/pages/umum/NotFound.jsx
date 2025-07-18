import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Halaman tidak ditemukan.</p>
      <Link
        to="/"
        className="text-blue-600 underline hover:text-blue-800 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
