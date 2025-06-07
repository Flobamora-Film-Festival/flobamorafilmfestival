import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";
import ProtectedCommentForm from "../../components/comments/ProtectedCommentForm";

const NewsDetailPage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [newsItem, setNewsItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const newsRes = await fetch(`https://backend.flobamorafilmfestival.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed&_lang=${language === "ID" ? "id" : "en"}&_=${Date.now()}`);
        const data = await newsRes.json();

        if (data.length > 0) {
          const post = data[0];
          setNewsItem(post);

          const tagsList = post._embedded?.["wp:term"]?.[1] || [];
          setTags(tagsList);

          const commentsRes = await fetch(`https://backend.flobamorafilmfestival.com/wp-json/wp/v2/comments?post=${post.id}&_=${Date.now()}`);
          const commentsData = await commentsRes.json();
          setComments(commentsData);
        } else {
          setNewsItem(null);
        }
      } catch (error) {
        console.error("Gagal mengambil detail berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [slug, language]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };
    return new Date(date).toLocaleString(language === "ID" ? "id-ID" : "en-US", options);
  };

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-300 my-10">{language === "ID" ? "Memuat berita..." : "Loading news..."}</p>;
  }

  if (!newsItem) {
    return <p className="text-center text-gray-500 dark:text-gray-300 my-10">{language === "ID" ? "Berita tidak ditemukan." : "News not found."}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">{newsItem.title.rendered}</h1>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">{formatDate(newsItem.date)}</p>

      <div className="content text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: newsItem.content.rendered }} />

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{language === "ID" ? "Tag Terkait:" : "Related Tags:"}</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag.id} to={`/news/tag/${tag.slug}`} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-100 hover:bg-red-200 dark:hover:bg-red-500">
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Komentar */}
      <div className="comments mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{language === "ID" ? "Komentar" : "Comments"}</h2>
        {comments.length > 0 ? (
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="mb-6">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{comment.author_name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(comment.date)}</p>
                <div className="text-gray-700 dark:text-gray-300 mt-2" dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">{language === "ID" ? "Belum ada komentar." : "No comments yet."}</p>
        )}
      </div>

      {/* Form komentar */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{language === "ID" ? "Tinggalkan Komentar" : "Leave a Comment"}</h3>
        <ProtectedCommentForm postId={newsItem.id} />
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/news"
          className="
      inline-block px-6 py-2 font-medium rounded
      text-red-600 bg-gray-100
      dark:text-red-400 dark:bg-gray-700
      hover:bg-white hover:text-red-800
      dark:hover:bg-gray-600 dark:hover:text-red-600
      transition-colors duration-300
    "
        >
          &larr; {language === "ID" ? "Kembali ke Daftar Berita" : "Back to News List"}
        </Link>
      </div>
    </div>
  );
};

export default NewsDetailPage;
