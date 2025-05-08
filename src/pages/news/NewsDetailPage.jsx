import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Untuk mengambil parameter dari URL
import { useLanguage } from "../../context/LanguageProvider"; // Menggunakan context untuk bahasa
import ProtectedCommentForm from "../../components/comments/ProtectedCommentForm"; // Import ProtectedCommentForm

const NewsDetailPage = () => {
  const { id } = useParams(); // Mendapatkan parameter `id` dari URL
  const { language } = useLanguage(); // Mengambil bahasa dari context
  const [newsItem, setNewsItem] = useState(null);
  const [comments, setComments] = useState([]); // State untuk menyimpan komentar
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data dari API WordPress untuk berita berdasarkan id
    fetch(`https://backend.flobamorafilmfestival.com/wp-json/wp/v2/news/${id}?_embed`)
      .then((res) => res.json())
      .then((data) => {
        setNewsItem(data); // Set data berita yang didapatkan
        setLoading(false); // Set loading false setelah data diterima
      })
      .catch((error) => {
        console.error("Gagal mengambil detail berita:", error);
        setLoading(false); // Set loading false jika terjadi error
      });

    // Ambil komentar untuk berita ini
    fetch(`https://backend.flobamorafilmfestival.com/wp-json/wp/v2/comments?post=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data); // Set komentar yang didapatkan
      })
      .catch((error) => {
        console.error("Gagal mengambil komentar:", error);
      });
  }, [id]); // Efek hanya akan dijalankan ketika `id` berubah

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-300 my-10">{language === "ID" ? "Memuat berita..." : "Loading news..."}</p>;
  }

  if (!newsItem) {
    return <p className="text-center text-gray-500 dark:text-gray-300 my-10">{language === "ID" ? "Berita tidak ditemukan." : "News not found."}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Judul Berita */}
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">{newsItem.title.rendered}</h1>

      {/* Tanggal Berita */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{new Date(newsItem.date).toLocaleDateString()}</p>

      {/* Isi Berita dengan Justify Text dan Jarak antar Paragraf */}
      <div className="content text-justify text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: newsItem.content.rendered }} />

      {/* Komentar */}
      <div className="comments mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{language === "ID" ? "Komentar" : "Comments"}</h2>
        {comments.length > 0 ? (
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="mb-6">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{comment.author_name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(comment.date).toLocaleDateString()}</p>
                <div className="text-gray-700 dark:text-gray-300 mt-2">{comment.content.rendered}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">{language === "ID" ? "Belum ada komentar." : "No comments yet."}</p>
        )}
      </div>

      {/* Gunakan ProtectedCommentForm untuk Form Komentar */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{language === "ID" ? "Tinggalkan Komentar" : "Leave a Comment"}</h3>
        <ProtectedCommentForm postId={id} />
      </div>
    </div>
  );
};

export default NewsDetailPage;
