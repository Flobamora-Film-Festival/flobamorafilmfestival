import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsList = ({ newsLimit = 5, language }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const lang = language.toLowerCase(); // Polylang expects lowercase: "id", "en"

  useEffect(() => {
    if (!categoryId) return;

    fetch(`https://backend.flobamorafilmfestival.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=3&orderby=date&order=desc&_embed&_=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        setLatestNews(data);
        setIsLoadingNews(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil berita:", error);
        setIsLoadingNews(false);
      });
  }, [categoryId]);

  // Fetch posts berdasarkan ID kategori dan bahasa dengan paginasi dan filter
  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      let url = `https://backend.flobamorafilmfestival.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed&lang=${lang}&page=${currentPage}&per_page=${newsLimit}`;

      // Menambahkan filter berdasarkan tahun jika dipilih
      if (selectedYear) {
        url += `&year=${selectedYear}`;
      }

      // Menambahkan pencarian jika ada query
      if (debouncedSearchQuery) {
        url += `&search=${debouncedSearchQuery}`;
      }

      fetch(url)
        .then((res) => {
          const total = res.headers.get("X-WP-Total"); // Dapatkan total hasil dari header
          setTotalPages(Math.ceil(total / newsLimit)); // Hitung jumlah halaman berdasarkan total hasil
          return res.json();
        })
        .then((data) => {
          setNewsItems(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Gagal mengambil data berita:", error);
          setLoading(false);
        });
    }
  }, [categoryId, lang, currentPage, newsLimit, debouncedSearchQuery, selectedYear]);

  // Debounce pencarian
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // Tunggu 500ms setelah pengguna berhenti mengetik

    return () => clearTimeout(timer); // Hapus timer jika ada update lainnya
  }, [searchQuery]);

  // Handle perubahan halaman
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Menampilkan tahun unik berdasarkan berita
  const years = [...new Set(newsItems.map((news) => new Date(news.date).getFullYear()))];

  // Handle ketika kolom pencarian dikosongkan
  useEffect(() => {
    if (searchQuery === "") {
      setDebouncedSearchQuery(""); // Mengosongkan pencarian saat input dikosongkan
    }
  }, [searchQuery]);

  // Fungsi untuk menghapus teks di kolom pencarian
  const handleClearSearch = () => {
    setSearchQuery(""); // Mengosongkan kolom pencarian
  };

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-300 my-10">{language === "ID" ? "Memuat berita..." : "Loading news..."}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Judul Daftar Berita */}
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white text-center mb-10">{language === "ID" ? "Daftar Berita" : "News List"}</h1>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        {/* Kolom Pencarian */}
        <div className="relative flex items-center w-full sm:w-1/2">
          <input
            type="text"
            className="px-2 py-1 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            placeholder={language === "ID" ? "Cari berita..." : "Search news..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={handleClearSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 12.728a1 1 0 0 1-1.414 0L8 9.414 5.672 12.728a1 1 0 0 1-1.414-1.414L6.586 8 3.258 4.672a1 1 0 0 1 1.414-1.414L8 6.586l2.328-2.328a1 1 0 0 1 1.414 1.414L9.414 8l3.328 3.328a1 1 0 0 1 0 1.414z" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Tahun */}
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
          <option value="">{language === "ID" ? "Pilih Tahun" : "Select Year"}</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Daftar Berita */}
      {newsItems.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300 my-10">{language === "ID" ? "Tidak ada berita ditemukan." : "No news found."}</p>
      ) : (
        newsItems.map((newsItem) => (
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
              <Link to={`/news/${newsItem.slug}`}>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:underline" dangerouslySetInnerHTML={{ __html: newsItem.title.rendered }} />
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3" dangerouslySetInnerHTML={{ __html: newsItem.excerpt.rendered }} />
              <Link to={`/news/${newsItem.slug}`} className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline">
                {language === "ID" ? "Baca selengkapnya" : "Read more"}
              </Link>
            </div>
          </div>
        ))
      )}

      {/* Navigasi Halaman */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
        >
          {language === "ID" ? "Sebelumnya" : "Previous"}
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
        >
          {language === "ID" ? "Berikutnya" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default NewsList;
