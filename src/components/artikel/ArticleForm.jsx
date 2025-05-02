import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ArtikelForm = ({ initialData = {} }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ambil data artikel jika edit
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`/api/articles?id=${id}`)
        .then((res) => {
          const article = res.data[0]; // asumsi respon adalah array
          setTitle(article.title);
          setContent(article.content);
        })
        .catch((err) => console.error("Failed to fetch article:", err));
    }
  }, [id, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      if (isEdit) {
        await axios.put("/api/articles", { id, title, content, image });
      } else {
        await axios.post("/api/articles", formData);
      }
      navigate("/admin/artikel");
    } catch (error) {
      console.error("Failed to save article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">{isEdit ? "Edit" : "Create"} Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded" placeholder="Enter article title" required />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded" placeholder="Enter article content" required />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          {loading ? "Saving..." : isEdit ? "Update Article" : "Add Article"}
        </button>
      </form>
    </div>
  );
};

export default ArtikelForm;
