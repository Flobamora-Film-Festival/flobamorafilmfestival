import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider";
import InputField from "../../components/form/InputField";
import FileUploadField from "../../components/form/FileUploadField";
import GoogleSignIn from "../../components/form/GoogleSignIn";
import SubmitButton from "../../components/form/SubmitButton";
import validateAllFields from "../../utils/validateField";
import textsKFKFilmLab from "../../texts/textsKFKFilmLab"; // Path for textsKFKFilmLab
import initialFormData from "../../utils/initialFormData";

const FormKFKFilmLab = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage();

  // Ensure fallback for undefined language keys
  const langText = textsKFKFilmLab[language] || textsKFKFilmLab.ID;

  const [formData, setFormData] = useState(initialFormData);
  const [userEmail, setUserEmail] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Store form data to localStorage
    localStorage.setItem("formKFKFilmLab", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files.length > 1 ? [...files] : files[0],
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignIn = (email) => {
    setUserEmail(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateAllFields(formData, language);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsSubmitting(false);
      alert(language === "ID" ? "Formulir masih ada yang salah." : "There are some errors in the form.");
      return;
    }

    setTimeout(() => {
      console.log("Submitted:", formData);
      localStorage.removeItem("formKFKFilmLab");
      setFormData(initialFormData);
      setIsSubmitting(false);
      alert(language === "ID" ? "Formulir berhasil dikirim!" : "Form submitted successfully!");
    }, 1500);
  };

  return (
    <div className={`max-w-2xl mx-auto my-16 p-6 rounded-xl shadow-lg border ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">{langText.title}</h2>
        <p className="text-lg mb-4">{langText.description}</p>

        <p className="text-lg font-semibold">{langText.requirementsTitle}</p>
        <ul className="list-disc pl-5 mb-4">
          {langText.requirementsList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p className="text-lg font-semibold">{langText.contact}</p>
        <p className="text-lg mb-4">
          {langText.contactName}{" "}
          <a href={`mailto:${langText.contactEmail}`} className="text-blue-600">
            {langText.contactEmail}
          </a>
        </p>

        {userEmail ? (
          <p className="text-lg font-semibold">
            Logged in as: <span className="text-blue-600">{userEmail}</span>
          </p>
        ) : (
          <GoogleSignIn onSignIn={handleSignIn} />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <InputField label={langText.formFields.email} name="email" value={formData.email} onChange={handleChange} type="email" required error={errors.email} />
          <InputField label={langText.formFields.fullName} name="namaPendaftar" value={formData.namaPendaftar} onChange={handleChange} required error={errors.namaPendaftar} />
          <FileUploadField label={langText.formFields.treatment} name="treatment" onChange={handleChange} required accept=".doc,.pdf" error={errors.treatment} />
          <FileUploadField label={langText.formFields.cv} name="cv" onChange={handleChange} required accept=".doc,.pdf" error={errors.cv} />

          {/* Submit Button */}
          <SubmitButton label={langText.formFields.submitButton} isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default FormKFKFilmLab;
