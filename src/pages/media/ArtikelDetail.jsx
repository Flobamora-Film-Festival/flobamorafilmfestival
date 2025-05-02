import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArtikelDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) => console.error("Error fetching article detail:", error));
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.summary}</p>
      <img src={article.image} alt={article.title} />
      <div>{article.content}</div>
    </div>
  );
};

export default ArtikelDetail; // Pastikan ekspor default ada di sini
