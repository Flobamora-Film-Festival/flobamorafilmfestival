import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewsAdminList = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/api/news");
        setNewsList(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      try {
        await axios.delete(`/api/news?id=${id}`);
        setNewsList(newsList.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting news:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin - News</h1>
      <Link to="/admin/news/create" className="bg-blue-500 text-white p-2 rounded-md mb-4 inline-block">
        Create News
      </Link>
      <div className="bg-white p-4 shadow-md rounded-lg">
        {newsList.length === 0 ? (
          <p>No news found.</p>
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
              {newsList.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <Link to={`/admin/news/edit/${item.id}`} className="text-yellow-500 hover:underline">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="ml-4 text-red-500 hover:underline">
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

export default NewsAdminList;
