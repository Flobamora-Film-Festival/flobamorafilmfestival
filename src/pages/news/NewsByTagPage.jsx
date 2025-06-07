import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";

const NewsByTagPage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagName, setTagName] = useState("");

  useEffect(() => {
    const fetchTaggedPosts = async () => {
      try {
        const tagRes = await fetch(`https://backend.flobamorafilmfestival.com/wp-json/wp/v2/tags?slug=${slug}`);
        const tagData = await tagRes.json();

        if (tagData.length > 0) {
          const tag = tagData[0];
          setTagName(tag.name);

          const postRes = await fetch(`https://backend.flobamorafilmfestival.com/wp-json/wp/v2/posts?tags=${tag.id}&_embed&_lang=${language === "ID" ? "id" : "en"}&_=${Date.now()}`);
          const postData = await postRes.json();
          setPosts(postData);
        }
      } catch (error) {
        console.error("Gagal mengambil data tag:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaggedPosts();
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
    return <p className="text-center text-gray-500 dark:text-gray-300 my-10">{language === "ID" ? "Memuat..." : "Loading..."}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        {language === "ID" ? "Berita dengan Tag:" : "News Tagged:"} {tagName}
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">{language === "ID" ? "Tidak ada berita ditemukan." : "No news found."}</p>
      ) : (
        <div className="space-y-12">
          {posts.map((post) => (
            <div key={post.id}>
              <h2 className="text-2xl font-bold text-red-600 hover:text-red-800 mb-2">
                <Link to={`/news/${post.slug}`}>{post.title.rendered}</Link>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{formatDate(post.date)}</p>
              <div className="content text-gray-800 dark:text-gray-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
              <div className="mt-4 flex flex-wrap gap-2">
                {(post._embedded["wp:term"] || []).flat().map((tag) => (
                  <Link key={tag.id} to={`/news/tag/${tag.slug}`} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-100 hover:bg-red-200 dark:hover:bg-red-500">
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link to="/news" className="text-red-600 hover:text-red-800 font-medium">
          &larr; {language === "ID" ? "Kembali ke Daftar Berita" : "Back to News List"}
        </Link>
      </div>
    </div>
  );
};

export default NewsByTagPage;
