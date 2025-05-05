import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <h2 className="text-xl font-semibold text-gray-800">{news.title}</h2>
      <p className="text-gray-600 mt-2">{news.content.slice(0, 100)}...</p>
      <div className="mt-4">
        <Link to={`/media/news/${news.id}`} className="text-blue-500 hover:underline">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
