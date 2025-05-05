import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageProvider";

const NewsDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch(`/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error fetching news detail:", error));
  }, [id]);

  if (!news) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <img src={news.image} alt={news.title[language]} className="w-full h-auto rounded-xl mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{news.title[language]}</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{news.summary[language]}</p>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: news.content?.[language] }} />
    </div>
  );
};

export default NewsDetail;
