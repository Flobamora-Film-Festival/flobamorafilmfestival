import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsList = ({ newsLimit, language }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);

  const lang = language.toLowerCase(); // Polylang expects lowercase: "id", "en"

  // Fetch ID kategori berdasarkan slug 'news'
  useEffect(() => {
    fetch(`https://backend.flobamorafilmfestival.com/wp-json/wp/v2/categories?slug=news&lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setCategoryId(data[0].id);
      })
      .catch((error) => console.error("Gagal mengambil kategori:", error));
  }, [lang]);

  // Fetch posts berdasarkan ID kategori dan bahasa
  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      fetch(`https://backend.flobamorafilmfestival.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed&lang=${lang}`)
        .then((res) => res.json())
        .then((data) => {
          setNewsItems(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Gagal mengambil data berita:", error);
          setLoading(false);
        });
    }
  }, [categoryId, lang]);

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-300 my-10">{language === "ID" ? "Memuat berita..." : "Loading news..."}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Judul Daftar Berita */}
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white text-center mb-10">{language === "ID" ? "Daftar Berita" : "News List"}</h1>

      {newsItems.slice(0, newsLimit).map((newsItem) => (
        <div key={newsItem.id} className="flex flex-col sm:flex-row gap-6 border-b pb-6">
          {/* Gambar Thumbnail */}
          {newsItem._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
            <Link to={`/news/${newsItem.id}`} className="flex-shrink-0 w-full sm:w-56 h-40 overflow-hidden rounded-md">
              <img src={newsItem._embedded["wp:featuredmedia"][0].source_url} alt={newsItem.title.rendered} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </Link>
          ) : (
            <div className="flex-shrink-0 w-full sm:w-56 h-40 bg-gray-200 dark:bg-gray-700 rounded-md" />
          )}

          {/* Konten Berita */}
          <div className="flex-1">
            <Link to={`/news/${newsItem.id}`}>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:underline" dangerouslySetInnerHTML={{ __html: newsItem.title.rendered }} />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3" dangerouslySetInnerHTML={{ __html: newsItem.excerpt.rendered }} />
            <Link to={`/news/${newsItem.id}`} className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline">
              {language === "ID" ? "Baca selengkapnya" : "Read more"}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
