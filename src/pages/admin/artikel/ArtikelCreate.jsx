import React from "react";
import ArticleForm from "../../components/artikel/ArticleForm";
import { useNavigate } from "react-router-dom";

const ArtikelCreate = () => {
  const navigate = useNavigate();

  // Fungsi untuk menangani submit artikel baru
  const handleCreateArticle = async (formData) => {
    try {
      // Mengirimkan formData ke API
      const response = await fetch("/api/articles.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Article created successfully");
        navigate("/admin/artikel"); // Mengarahkan kembali ke halaman daftar artikel
      } else {
        alert("Failed to create article");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating article");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Article</h1>
      <ArticleForm onSubmit={handleCreateArticle} />
    </div>
  );
};

export default ArtikelCreate;
