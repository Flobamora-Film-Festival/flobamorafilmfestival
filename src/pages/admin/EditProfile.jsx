import React, { useState, useEffect } from "react";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
        bio: localStorage.getItem("adminBio") || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Update display name
      if (user.displayName !== formData.name) {
        await updateProfile(user, { displayName: formData.name });
      }

      // Update email
      if (user.email !== formData.email) {
        await updateEmail(user, formData.email);
      }

      // Update password (if provided)
      if (formData.password) {
        await updatePassword(user, formData.password);
      }

      // Save bio to localStorage (or backend if you want)
      localStorage.setItem("adminBio", formData.bio);

      setMessage("Profil berhasil diperbarui.");
    } catch (error) {
      console.error("Update profile error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>

      {message && <p className={`text-center mb-4 text-sm ${message.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Biography</label>
          <textarea name="bio" rows="4" value={formData.bio} onChange={handleChange} className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">New Password (optional)</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="text-center">
          <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button onClick={() => navigate("/admin")} className="text-sm text-blue-600 hover:underline focus:outline-none">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
