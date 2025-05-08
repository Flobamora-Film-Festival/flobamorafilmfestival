import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";

const NewsList = () => {
  const { language } = useLanguage();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://backend.flobamorafilmfestival.com/wp-json/wp/v2/news?_embed")
      .then((res) => res.json())
      .then((data) => {
        setNewsItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data berita:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-300 my-10">{language === "ID" ? "Memuat berita..." : "Loading news..."}</p>;
  }

  // Conditional Grid Layout
  const gridClasses =
    newsItems.length === 1
      ? "grid justify-center md:grid-cols-3 sm:grid-cols-2 gap-6 p-4" // Centered if only one item with proper grid layout
      : "grid gap-6 p-4 md:grid-cols-3 sm:grid-cols-2"; // 3 columns on large screens, 2 on small

  return (
    <div className={newsItems.length === 1 ? "flex justify-center px-4" : "grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3"}>
      {newsItems.map((newsItem) => (
        <div key={newsItem.id} className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <Link to={`/news/${newsItem.id}`} className="block">
            {newsItem._embedded?.["wp:featuredmedia"]?.[0]?.source_url && <img src={newsItem._embedded["wp:featuredmedia"][0].source_url} alt={newsItem.title.rendered} className="rounded-xl mb-4 w-full object-cover max-h-60" />}
            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: newsItem.title.rendered }} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: newsItem.excerpt.rendered }} />
            <span className="text-sm text-red-600 dark:text-red-400 mt-2 inline-block">{language === "ID" ? "Baca selengkapnya..." : "Read more..."}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
