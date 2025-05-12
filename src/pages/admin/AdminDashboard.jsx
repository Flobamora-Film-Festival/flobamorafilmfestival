import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useLanguage } from "../../context/LanguageProvider";
import { useTheme } from "../../context/ThemeProvider";
import AdminLayout from "../../components/admin/AdminLayout";
import LanguageToggle from "../../components/LanguageToggle";
import ThemeToggle from "../../components/ThemeToggle";

// Translations
const textsAdminDashboard = {
  ID: {
    dashboardTitle: "Dasbor Admin",
    loggedInAs: "Masuk sebagai",
    postsTitle: "Postingan WordPress",
    noPosts: "Tidak ada postingan ditemukan.",
    logout: "Keluar",
    loading: "Memuat...",
  },
  EN: {
    dashboardTitle: "Admin Dashboard",
    loggedInAs: "Logged in as",
    postsTitle: "WordPress Posts",
    noPosts: "No posts found.",
    logout: "Logout",
    loading: "Loading...",
  },
};

const AdminDashboard = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = textsAdminDashboard[language] || textsAdminDashboard.ID;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: "", roles: [] });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("https://backend.flobamorafilmfestival.com/wp-json/wp/v2/users/me", {
          credentials: "include", // pastikan cookie dibawa
        });

        if (!res.ok) {
          logout();
          navigate("/admin/login");
          return;
        }

        const data = await res.json();
        setUserInfo({ name: data.name || "Admin", roles: data.roles || [] });
      } catch (err) {
        console.error("Error fetching user info", err);
        logout();
        navigate("/admin/login");
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("https://backend.flobamorafilmfestival.com/wp-json/wp/v2/posts", {
          credentials: "include", // pastikan cookie dibawa
        });

        if (!res.ok) {
          logout();
          navigate("/admin/login");
          return;
        }

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
    fetchPosts();
  }, [logout, navigate]);

  return (
    <AdminLayout>
      <div className="absolute top-4 right-4 flex space-x-4">
        <LanguageToggle />
        <ThemeToggle />
        <button onClick={logout} className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm">
          {t.logout}
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">{t.dashboardTitle}</h1>
        {userInfo.name && (
          <p className="text-gray-600 mb-6">
            {t.loggedInAs}: <strong>{userInfo.name}</strong> ({userInfo.roles.join(", ")})
          </p>
        )}

        <h2 className="text-xl font-semibold mb-2">{t.postsTitle}:</h2>
        {loading ? (
          <p className="text-gray-500">{t.loading}</p>
        ) : posts.length > 0 ? (
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.id} className="p-4 border rounded shadow dark:border-gray-700">
                <h3 className="text-lg font-medium">{post.title.rendered}</h3>
                <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">{t.noPosts}</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
