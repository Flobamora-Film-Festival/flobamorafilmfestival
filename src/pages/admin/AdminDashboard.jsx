import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      navigate("/admin/login"); // redirect jika belum login
      return;
    }

    const validateToken = async () => {
      try {
        const res = await fetch("https://backend.flobamorafilmfestival.com/wp-json/jwt-auth/v1/token/validate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("userToken");
          navigate("/admin/login");
        } else {
          fetchPosts(token);
        }
      } catch (err) {
        console.error("Token validation failed", err);
        navigate("/admin/login");
      }
    };

    const fetchPosts = async (token) => {
      try {
        const res = await fetch("https://backend.flobamorafilmfestival.com/wp-json/wp/v2/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts", err);
        setLoading(false);
      }
    };

    validateToken();
  }, [navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">WordPress Posts:</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-medium">{post.title.rendered}</h3>
            <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
