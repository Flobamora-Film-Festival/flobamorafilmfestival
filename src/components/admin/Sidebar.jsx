import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const Sidebar = () => {
  const { isAuthenticated, userRole } = useAdminAuth(); // Ambil isAuthenticated dan userRole dari useAdminAuth
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchCategories = async () => {
        try {
          // Kirim permintaan untuk mengambil kategori
          const res = await fetch("https://backend.flobamorafilmfestival.com/wp-json/wp/v2/categories", {
            credentials: "include", // Pastikan cookie dikirim bersama dengan permintaan
          });

          if (!res.ok) {
            throw new Error("Failed to fetch categories");
          }

          const data = await res.json();
          setCategories(data);
        } catch (err) {
          console.error("Error fetching categories", err);
          setError("Terjadi kesalahan saat memuat kategori");
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    }
  }, [isAuthenticated]); // Pastikan fetchCategories dipanggil saat isAuthenticated berubah

  const linkClass = "block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition";
  const activeClass = "bg-gray-300 dark:bg-gray-700 font-semibold";

  if (!isAuthenticated) return null; // Jika belum login, jangan tampilkan Sidebar

  return (
    <div className="h-full p-4 space-y-2">
      <h2 className="text-lg font-bold mb-4">Menu</h2>

      {/* Menu untuk semua pengguna */}
      <NavLink to="/admin/dashboard" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
        Dashboard
      </NavLink>

      {/* Menu berdasarkan peran Admin */}
      {userRole === "admin" && (
        <>
          <NavLink to="/admin/posts" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Posts
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Settings
          </NavLink>
        </>
      )}

      {/* Menu berdasarkan kategori dari WordPress */}
      {loading && <p className="text-gray-500">Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {categories.length > 0 &&
        categories.map((category) => (
          <NavLink key={category.id} to={`/admin/category/${category.slug}`} className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            {category.name}
          </NavLink>
        ))}
    </div>
  );
};

export default Sidebar;
