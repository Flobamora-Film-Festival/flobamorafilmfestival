import React, { useState } from "react";
import useAuth from "../../hooks/useAuth"; // Pastikan menggunakan default import

const translations = {
  ID: {
    loginPrompt: "Silakan login untuk menulis komentar.",
    loginButton: "Login",
    writeComment: "Tulis Komentar",
    commentSent: "Komentar berhasil dikirim!",
    submitButton: "Kirim Komentar",
    errorSending: "Gagal mengirim komentar",
  },
  EN: {
    loginPrompt: "Please log in to write a comment.",
    loginButton: "Log In",
    writeComment: "Write a Comment",
    commentSent: "Comment submitted successfully!",
    submitButton: "Submit Comment",
    errorSending: "Failed to submit comment",
  },
};

const ProtectedCommentForm = ({ postId, locale = "ID" }) => {
  const { user, login } = useAuth();
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const t = translations[locale] || translations.ID;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend.flobamorafilmfestival.com/wp-json/wp/v2/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          post: postId,
          content: comment,
          author_name: user?.name,
          author_email: user?.email,
        }),
      });

      if (!response.ok) {
        throw new Error(t.errorSending);
      }

      setSubmitted(true);
      setComment("");
    } catch (error) {
      console.error(error);
      alert(t.errorSending);
    }
  };

  if (!user) {
    return (
      <div className="mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">{t.loginPrompt}</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={login}>
          {t.loginButton}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">{t.writeComment}</h3>
      {submitted && <p className="text-green-600 dark:text-green-400 mb-2">{t.commentSent}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} required />
        <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          {t.submitButton}
        </button>
      </form>
    </div>
  );
};

export default ProtectedCommentForm;
