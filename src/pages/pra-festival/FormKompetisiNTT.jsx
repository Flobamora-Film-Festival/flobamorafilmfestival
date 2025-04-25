import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider"; // Update import
import InputField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";
import FormAgreementSection from "../../components/form/FormAgreementSection";
import TextareaField from "../../components/form/TextareaField";
import DurationInputField from "../../components/form/DurationInputField";
import MultiCheckboxField from "../../components/form/MultiCheckboxField";
import FileUploadField from "../../components/form/FileUploadField";
import initialFormData from "../../utils/initialFormData";
import validateAllFields from "../../utils/validateField";
import { formLabels } from "../../utils/formLabels";
import texts from "../../texts/textsKompetisiNTT";
import SubmitButton from "../../components/form/SubmitButton";
import GoogleSignIn from "../../components/form/GoogleSignIn";

const FormKompetisiNTT = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // Use the custom hook `useLanguage`
  const langText = {
    ...(texts[language] || texts.ID),
    ...(formLabels[language] || formLabels.ID),
  };

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formKompetisiNTT");
    return saved ? JSON.parse(saved) : { ...initialFormData };
  });
  const [userEmail, setUserEmail] = useState(null);

  const handleSignIn = (email) => {
    setUserEmail(email);
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem("formKompetisiNTT", JSON.stringify(formData));
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    }
  }, [formData, userEmail]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files.length > 1 ? [...files] : files[0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

    // Simulasi submit
    setTimeout(() => {
      console.log("Submitted:", formData);
      localStorage.removeItem("formKompetisiNTT");
      setFormData(initialFormData);
      setIsSubmitting(false);
      alert(language === "ID" ? "Formulir berhasil dikirim!" : "Form submitted successfully!");
    }, 1500);
  };

  return (
    <div className={`max-w-2xl mx-auto my-16 p-6 rounded-xl shadow-lg border border-gray-700 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{langText.introText.title}</h2>
          <p className="text-lg mb-4">{langText.introText.greeting}</p>

          <p className="text-lg mb-4 font-semibold">{langText.introText.filmRequirementsTitle}</p>
          <ul className="list-disc pl-5 mb-4">
            {langText.introText.filmRequirements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className="text-lg mb-4 font-semibold">{langText.introText.materialsTitle}</p>
          <ul className="list-disc pl-5 mb-4">
            {langText.introText.materials.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className="text-lg mb-4">{langText.introText.closing}</p>

          <p className="text-lg font-semibold mb-4">
            {langText.introText.contact}{" "}
            <a href={`mailto:${langText.introText.email}`} className="text-blue-600">
              {langText.introText.email}
            </a>
          </p>

          {userEmail ? (
            <p className="text-lg font-semibold">
              Logged in as: <span className="text-blue-600">{userEmail}</span>
            </p>
          ) : (
            <GoogleSignIn onSignIn={handleSignIn} />
          )}

          <p className="text-lg mt-4">{langText.introText.footerNote}</p>
          <p className="text-lg mt-4 font-semibold">{langText.introText.requiredNote}</p>
        </div>

        {/* Data Pendaftar */}
        <InputField label={langText.namaPendaftar} name="namaPendaftar" value={formData.namaPendaftar} onChange={handleChange} required error={errors.namaPendaftar} />
        <InputField label={langText.nomorKontak} name="nomorKontak" value={formData.nomorKontak} onChange={handleChange} required type="tel" error={errors.nomorKontak} />
        <InputField label={langText.email} name="email" value={formData.email} onChange={handleChange} required type="email" error={errors.email} />
        <InputField label={langText.mediaSosialSutradara} name="mediaSosialSutradara" value={formData.mediaSosialSutradara} onChange={handleChange} error={errors.mediaSosialSutradara} />

        {/* Data Film */}
        <InputField label={langText.judulFilm} name="judulFilm" value={formData.judulFilm} onChange={handleChange} required error={errors.judulFilm} />
        <SelectField label={langText.kategoriFilm} name="kategoriFilm" value={formData.kategoriFilm} onChange={handleChange} required options={langText.kategoriOptions} error={errors.kategoriFilm} />
        <InputField label={langText.tahunProduksi} name="tahunProduksi" value={formData.tahunProduksi} onChange={handleChange} required error={errors.tahunProduksi} />
        <DurationInputField label={langText.durasiFilm} name="durasiFilm" value={formData.durasiFilm} onChange={handleChange} required error={errors.durasiFilm} />
        <InputField label={langText.bahasaFilm} name="bahasaFilm" value={formData.bahasaFilm} onChange={handleChange} required error={errors.bahasaFilm} />
        <InputField label={langText.subtitleLink} name="subtitleLink" type="url" value={formData.subtitleLink} onChange={handleChange} required error={errors.subtitleLink} />
        <TextareaField label={langText.sinopsis} name="sinopsis" value={formData.sinopsis} onChange={handleChange} required error={errors.sinopsis} />
        <TextareaField label={langText.pernyataanSutradara} name="pernyataanSutradara" value={formData.pernyataanSutradara} onChange={handleChange} required error={errors.pernyataanSutradara} />
        <SelectField label={langText.resolusiFilm} name="resolusiFilm" value={formData.resolusiFilm} onChange={handleChange} required options={langText.resolusiOptions} error={errors.resolusiFilm} />
        <SelectField label={langText.sound} name="sound" value={formData.sound} onChange={handleChange} required options={langText.soundOptions} error={errors.sound} />
        <SelectField label={langText.warna} name="warna" value={formData.warna} onChange={handleChange} required options={langText.warnaOptions} error={errors.warna} />

        {/* Kru Produksi */}
        <InputField label={langText.namaProduser} name="namaProduser" value={formData.namaProduser} onChange={handleChange} required error={errors.namaProduser} />
        <InputField label={langText.mediaSosialProduser} name="mediaSosialProduser" value={formData.mediaSosialProduser} onChange={handleChange} error={errors.mediaSosialProduser} />
        <InputField label={langText.namaProduksi} name="namaProduksi" value={formData.namaProduksi} onChange={handleChange} required error={errors.namaProduksi} />
        <InputField label={langText.mediaSosialProduksi} name="mediaSosialProduksi" value={formData.mediaSosialProduksi} onChange={handleChange} error={errors.mediaSosialProduksi} />

        {/* Tambahan */}
        <TextareaField label={langText.bioSutradara} name="bioSutradara" value={formData.bioSutradara} onChange={handleChange} required error={errors.bioSutradara} />
        <FileUploadField label={langText.filmografiSutradara} name="filmografiSutradara" onChange={handleChange} required accept=".pdf" error={errors.filmografiSutradara} />

        {/* Submit */}
        <SubmitButton label={langText.submitButton} isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default FormKompetisiNTT;
