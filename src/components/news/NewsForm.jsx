import React, { useState } from "react";

const NewsForm = ({ initialData = {}, onSubmit, loading = false }) => {
  const [title_id, setTitleId] = useState(initialData.title_id || "");
  const [title_en, setTitleEn] = useState(initialData.title_en || "");
  const [summary_id, setSummaryId] = useState(initialData.summary_id || "");
  const [summary_en, setSummaryEn] = useState(initialData.summary_en || "");
  const [content_id, setContentId] = useState(initialData.content_id || "");
  const [content_en, setContentEn] = useState(initialData.content_en || "");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title_id", title_id);
    formData.append("title_en", title_en);
    formData.append("summary_id", summary_id);
    formData.append("summary_en", summary_en);
    formData.append("content_id", content_id);
    formData.append("content_en", content_en);
    if (image) formData.append("image", image);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Judul (Indonesia)</label>
          <input type="text" value={title_id} onChange={(e) => setTitleId(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title (English)</label>
          <input type="text" value={title_en} onChange={(e) => setTitleEn(e.target.value)} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ringkasan (Indonesia)</label>
          <textarea value={summary_id} onChange={(e) => setSummaryId(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Summary (English)</label>
          <textarea value={summary_en} onChange={(e) => setSummaryEn(e.target.value)} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Konten Lengkap (Indonesia)</label>
          <textarea value={content_id} onChange={(e) => setContentId(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Content (English)</label>
          <textarea value={content_en} onChange={(e) => setContentEn(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gambar</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        {loading ? "Menyimpan..." : initialData?.id ? "Update News" : "Tambah News"}
      </button>
    </form>
  );
};

export default NewsForm;
