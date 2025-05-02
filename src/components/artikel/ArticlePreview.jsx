import React from "react";

const ArticlePreview = ({ title, content, image }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="mt-4">
        {image && <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-60 object-cover mb-4" />}
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export default ArticlePreview;
