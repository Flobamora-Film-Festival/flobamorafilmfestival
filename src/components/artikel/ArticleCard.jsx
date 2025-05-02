import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
      <p className="text-gray-600 mt-2">{article.content.slice(0, 100)}...</p>
      <div className="mt-4">
        <Link to={`/media/artikel/${article.id}`} className="text-blue-500 hover:underline">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
