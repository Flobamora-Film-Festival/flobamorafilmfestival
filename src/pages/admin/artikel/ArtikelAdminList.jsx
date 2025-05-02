import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ArtikelAdminList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data artikel dari API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Hapus artikel
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await await axios.delete(`/api/articles?id=${id}`);
        setArticles(articles.filter((article) => article.id !== id));
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin - Articles</h1>
      <Link to="/admin/artikel/create" className="bg-blue-500 text-white p-2 rounded-md mb-4 inline-block">
        Create New Article
      </Link>
      <div className="bg-white p-4 shadow-md rounded-lg">
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="border p-2">{article.title}</td>
                  <td className="border p-2">{new Date(article.created_at).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <Link to={`/admin/artikel/edit/${article.id}`} className="text-yellow-500 hover:underline">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(article.id)} className="ml-4 text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ArtikelAdminList;
