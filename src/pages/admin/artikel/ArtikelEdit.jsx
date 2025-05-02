import React, { useEffect, useState } from "react";
import ArticleForm from "../../components/artikel/ArticleForm";
import { useNavigate, useParams } from "react-router-dom";

const ArtikelEdit = () => {
  const { articleId } = useParams(); // Mendapatkan ID artikel dari URL
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  // Fetch artikel yang ingin diedit
  useEffect(() => {
    const fetchArticle = async () => {
      const response = await fetch(`/api/articles.php?id=${articleId}`);
      const data = await response.json();
      setArticle(data);
    };

    fetchArticle();
  }, [articleId]);

  // Fungsi untuk menangani submit artikel yang telah diedit
  const handleEditArticle = async (formData) => {
    try {
      const response = await fetch(`/api/articles.php?id=${articleId}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Article updated successfully");
        navigate("/admin/artikel"); // Mengarahkan kembali ke halaman daftar artikel
      } else {
        alert("Failed to update article");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating article");
    }
  };

  // Menampilkan form jika data artikel sudah diambil
  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <ArticleForm onSubmit={handleEditArticle} initialData={article} />
    </div>
  );
};

export default ArtikelEdit;
