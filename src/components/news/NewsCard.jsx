import React from "react";

const NewsCard = ({ title, date, excerpt, imageUrl }) => {
  return (
    <div className="news-card">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{excerpt}</p>
    </div>
  );
};

export default NewsCard;
