import React, { useEffect, useState } from "react";
import NewsForm from "../../../components/news/NewsForm";
import { useNavigate, useParams } from "react-router-dom";

const NewsEdit = () => {
  const { newsId } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news.php?id=${newsId}`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [newsId]);

  const handleEditNews = async (formData) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news.php?id=${newsId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("News updated successfully");
        navigate("/admin/news");
      } else {
        alert("Failed to update news");
      }
    } catch (error) {
      console.error("Error updating news:", error);
      alert("Error updating news");
    } finally {
      setLoading(false);
    }
  };

  if (!news) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit News</h1>
      <NewsForm onSubmit={handleEditNews} initialData={news} loading={loading} />
    </div>
  );
};

export default NewsEdit;
