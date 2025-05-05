import React from "react";
import NewsForm from "../../../components/news/NewsForm";
import { useNavigate } from "react-router-dom";

const NewsCreate = () => {
  const navigate = useNavigate();

  const handleCreateNews = async (formInput) => {
    const formData = new FormData();
    formData.append("title_id", formInput.title_id);
    formData.append("title_en", formInput.title_en);
    formData.append("summary_id", formInput.summary_id);
    formData.append("summary_en", formInput.summary_en);
    formData.append("content_id", formInput.content_id);
    formData.append("content_en", formInput.content_en);
    formData.append("image", formInput.image); // pastikan ini adalah file dari input[type="file"]

    try {
      const res = await fetch("https://flobamorafilmfestival.com/api/upload-news.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("News created successfully");
        navigate("/admin/news");
      } else {
        alert(`Failed to create news: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating news");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create News</h1>
      <NewsForm onSubmit={handleCreateNews} />
    </div>
  );
};

export default NewsCreate;
