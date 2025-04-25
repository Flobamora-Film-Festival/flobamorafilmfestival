import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Gunakan custom hook
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
import texts from "../../texts/textsKompetisiPelajar"; // ✅
import SubmitButton from "../../components/form/SubmitButton";
import GoogleSignIn from "../../components/form/GoogleSignIn";

const FormKompetisiPelajar = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // Access the language context
  const langText = {
    ...(texts[language] || texts.ID),
    ...(formLabels[language] || formLabels.ID),
  };

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formKompetisiPelajar");
    return saved ? JSON.parse(saved) : { ...initialFormData, publikasiSetuju: false }; // Pastikan publikasiSetuju ada
  });
  const [userEmail, setUserEmail] = useState(null); // State untuk menyimpan email pengguna
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("formKompetisiPelajar", JSON.stringify(formData));
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

  const handleMultiCheckboxChange = (name, values) => {
    setFormData((prev) => ({
      ...prev,
      [name]: values,
    }));
  };
  const handleSignIn = (email) => {
    setUserEmail(email); // Menyimpan email pengguna yang login
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Simulasi submit async
    setTimeout(() => {
      console.log("Submitted:", formData);
      localStorage.removeItem("formKompetisiPelajar");
      setFormData(initialFormData); // ✅ Reset form
      setIsSubmitting(false);
      alert(language === "ID" ? "Formulir berhasil dikirim!" : "Form submitted successfully!");
    }, 1500);
  };
  const handleGoogleSignIn = (token) => {
    console.log("Google login success!", token);
    // Process the token (store in state, send to server, etc.)
  };

  return (
    <div className={`max-w-2xl mx-auto my-16 p-6 rounded-xl shadow-lg border border-gray-700 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
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

        {/* Menampilkan email pengguna yang login */}
        {userEmail ? (
          <p className="text-lg font-semibold">
            Logged in as: <span className="text-blue-600">{userEmail}</span>
          </p>
        ) : (
          <GoogleSignIn onSignIn={handleSignIn} /> // Tombol login Google
        )}
        <p className="text-lg mt-4">{langText.introText.footerNote}</p>
        <p className="text-lg mt-4 font-semibold">{langText.introText.requiredNote}</p>
      </div>

      {/* Formulir */}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Email */}
          <InputField label={langText.email} name="email" value={formData.email} onChange={handleChange} type="email" required placeholder="you@example.com" error={errors.email} />

          <SelectField
            label={langText.posisi}
            name="posisi"
            value={formData.posisi}
            onChange={handleChange}
            required
            options={[
              { value: "", label: langText.posisiOptions.placeholderSelect },
              { value: "produser", label: langText.posisiOptions.produser },
              { value: "sutradara", label: langText.posisiOptions.sutradara },
              { value: "lain", label: langText.posisiOptions.lain },
            ]}
            error={errors.posisi}
          />

          {/* Nama Pendaftar */}
          <InputField label={langText.namaPendaftar} name="namaPendaftar" value={formData.namaPendaftar} onChange={handleChange} required error={errors.namaPendaftar} />

          {/* Nomor Kontak Pendaftar */}
          <InputField
            label={langText.nomorKontak}
            name="nomorKontak"
            value={formData.nomorKontak}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\+?[0-9]*$/.test(value)) {
                handleChange(e);
              }
            }}
            required
            type="tel"
            placeholder="+6281234567890"
            pattern="^\+?[0-9]+$"
            title="Hanya boleh angka, boleh diawali dengan + (misal: +6281234567890)"
            error={errors.nomorKontak}
          />

          {/* Nama Sutradara */}
          <InputField label={langText.namaSutradara} name="namaSutradara" value={formData.namaSutradara} onChange={handleChange} required error={errors.namaSutradara} />

          {/* Domisili Sutradara */}
          <InputField label={langText.domisiliSutradara} name="domisiliSutradara" value={formData.domisiliSutradara} onChange={handleChange} required spellCheck={false} error={errors.domisiliSutradara} />

          {/* Foto Sutradara */}
          <FileUploadField label={langText.fotoSutradara} name="fotoSutradara" onChange={handleChange} required accept=".jpg,.jpeg,.png" error={errors.fotoSutradara} />

          {/* Nomor Kontak Sutradara */}
          <InputField
            label={langText.nomorKontakSutradara}
            name="nomorKontakSutradara"
            type="tel"
            value={formData.nomorKontakSutradara}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\+?[0-9]*$/.test(value)) {
                handleChange(e);
              }
            }}
            required
            placeholder="+6281234567890"
            pattern="^\+?[0-9]+$"
            title="Hanya boleh angka, boleh diawali dengan + (misal: +6281234567890)"
            error={errors.nomorKontakSutradara}
          />

          {/* Email Sutradara */}
          <InputField
            label={langText.emailSutradara}
            name="emailSutradara"
            type="email"
            value={formData.emailSutradara}
            onChange={handleChange}
            required
            placeholder="sutradara@example.com"
            spellCheck={false}
            pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
            title={langText.emailSutradaraTitle}
            error={errors.emailSutradara}
          />

          {/* Media Sosial Sutradara */}
          <InputField label={langText.mediaSosialSutradara} name="mediaSosialSutradara" value={formData.mediaSosialSutradara} onChange={handleChange} error={errors.mediaSosialSutradara} />

          {/* Bio Sutradara */}
          <FileUploadField
            label={langText.bioSutradara}
            name="bioSutradara"
            onChange={handleChange}
            required
            accept=".pdf"
            maxFiles={1}
            maxSize={10 * 1024 * 1024} // 10MB
            error={errors.bioSutradara}
            theme={theme}
            description={language === "ID" ? "Unggah file PDF yang berisi bio sutradara. Maksimum 10 MB." : "Upload a PDF file containing the director's bio. Max 10 MB."}
            descriptionClassName={theme === "dark" ? "text-white" : "text-gray-800"}
          />

          {/* Filmografi Sutradara */}
          <FileUploadField label={langText.filmografiSutradara} name="filmografiSutradara" onChange={handleChange} required accept=".pdf" error={errors.filmografiSutradara} />

          {/* Nama Produser */}
          <InputField label={langText.namaProduser} name="namaProduser" value={formData.namaProduser} onChange={handleChange} required error={errors.namaProduser} />

          {/* Media Sosial Produser */}
          <InputField label={langText.mediaSosialProduser} name="mediaSosialProduser" value={formData.mediaSosialProduser} onChange={handleChange} error={errors.mediaSosialProduser} />

          {/* Nama Sekolah */}
          <InputField label={langText.namaSekolah} name="namaSekolah" value={formData.namaSekolah} onChange={handleChange} required error={errors.namaSekolah} />

          {/* Media Sosial Sekolah */}
          <InputField label={langText.mediaSosialSekolah} name="mediaSosialSekolah" value={formData.mediaSosialSekolah} onChange={handleChange} error={errors.mediaSosialSekolah} />

          {/* Kartu Pelajar */}
          <FileUploadField label={langText.kartuPelajar} name="kartuPelajar" onChange={handleChange} required accept=".jpg, .jpeg, .png" error={errors.kartuPelajar} />

          {/* Judul Film */}
          <InputField label={langText.judulFilm} name="judulFilm" value={formData.judulFilm} onChange={handleChange} required error={errors.judulFilm} />

          {/* Kategori Film */}
          <SelectField
            label={langText.kategoriFilm}
            name="kategoriFilm"
            value={formData.kategoriFilm}
            onChange={handleChange}
            required
            options={[
              { value: "", label: langText.kategoriOptions.placeholderSelect },
              { value: "Fiksi", label: langText.kategoriOptions.fiksi },
              {
                value: "Dokumenter",
                label: langText.kategoriOptions.dokumenter,
              },
              {
                value: "Eksperimental",
                label: langText.kategoriOptions.eksperimental,
              },
            ]}
            error={errors.kategoriFilm}
          />

          {/* Tahun Produksi Film */}
          <InputField label={langText.tahunProduksi} name="tahunProduksi" value={formData.tahunProduksi} onChange={handleChange} required error={errors.tahunProduksi} placeholder="Contoh: 2025" type="text" inputMode="numeric" />

          {/* Durasi Film */}
          <DurationInputField label={langText.durasiFilm} name="durasiFilm" value={formData.durasiFilm} onChange={handleChange} required error={errors.durasiFilm} />

          {/* Bahasa Film */}
          <MultiCheckboxField
            label={langText.bahasaFilm}
            name="bahasaFilm"
            options={[
              { value: "indonesia", label: langText.bahasaOptions.indonesia },
              { value: "inggris", label: langText.bahasaOptions.inggris },
              { value: "lain", label: langText.bahasaOptions.lainLabel }, // ← Ubah label di texts
            ]}
            selectedValues={formData.bahasaFilm}
            onChange={handleMultiCheckboxChange}
            required
            theme={theme}
            error={errors.bahasaFilm}
          />

          {formData.bahasaFilm.includes("lain") && (
            <InputField name="bahasaLain" value={formData.bahasaLain} onChange={handleChange} required placeholder={langText.bahasaOptions.placeholderLain} className="mt-2" error={errors.bahasaLain} />
          )}

          {/* Subtitle Link */}
          <InputField
            label={langText.subtitleLink}
            name="subtitleLink"
            type="url"
            value={formData.subtitleLink}
            onChange={handleChange}
            required
            placeholder="https://example.com/subtitle.srt"
            error={errors.subtitleLink}
            description={langText.subtitleDescription}
          />

          {/* Sinopsis */}
          <TextareaField label={langText.sinopsis} name="sinopsis" value={formData.sinopsis} onChange={handleChange} required placeholder={langText.sinopsisPlaceholder} error={errors.sinopsis} />

          {/* Pernyataan Sutradara */}
          <TextareaField label={langText.pernyataanSutradara} name="pernyataanSutradara" value={formData.pernyataanSutradara} onChange={handleChange} required theme={theme} error={errors.pernyataanSutradara} />

          {/* Resolusi Film */}
          <SelectField
            label={langText.resolusiFilm}
            name="resolusiFilm"
            value={formData.resolusiFilm}
            onChange={handleChange}
            required
            options={[
              { value: "", label: langText.resolusiOptions.placeholderSelect },
              { value: "Full HD", label: langText.resolusiOptions.fullHD },
              { value: "2K", label: langText.resolusiOptions.twoK },
              { value: "4K", label: langText.resolusiOptions.fourK },
            ]}
            error={errors.resolusiFilm}
          />

          {/* Sound */}
          <SelectField
            label={langText.sound}
            name="sound"
            value={formData.sound}
            onChange={handleChange}
            required
            options={[
              { value: "", label: langText.soundOptions.placeholderSelect },
              { value: "mono", label: langText.soundOptions.mono },
              { value: "stereo", label: langText.soundOptions.stereo },
              { value: "silent", label: langText.soundOptions.silent },
            ]}
            error={errors.sound}
          />

          {/* Warna */}
          <SelectField
            label={langText.warna}
            name="warna"
            value={formData.warna}
            onChange={handleChange}
            required
            options={[
              { value: "", label: langText.warnaOptions.placeholderSelect },
              { value: "warna", label: langText.warnaOptions.warna },
              { value: "hitamPutih", label: langText.warnaOptions.hitamPutih },
              { value: "keduanya", label: langText.warnaOptions.keduanya },
            ]}
            error={errors.warna}
          />
          {/* Link Preview */}
          <InputField label={langText.linkPreview} name="linkPreview" type="url" value={formData.linkPreview} onChange={handleChange} required error={errors.linkPreview} />

          {/* Akses Password */}
          <InputField label={langText.aksesPassword} name="aksesPassword" value={formData.aksesPassword} onChange={handleChange} required={false} placeholder="" error={errors.aksesPassword} />

          {/* Link Trailer */}
          <InputField label={langText.linkTrailer} name="linkTrailer" type="url" value={formData.linkTrailer} onChange={handleChange} required error={errors.linkTrailer} />

          {/* Still Images */}
          <FileUploadField
            label={langText.stillImages}
            name="stillImages"
            onChange={handleChange}
            required
            accept="image/*"
            multiple
            maxFiles={5}
            minFiles={3}
            maxSize={10 * 1024 * 1024} // 10MB
            description={langText.stillImagesDescription}
            descriptionClassName={(theme === "dark" ? "text-white" : "text-gray-800") || "text-gray-800"}
            error={errors?.stillImages}
          />

          {/* Poster Film */}
          <FileUploadField
            label="Poster Film (PSD, JPG, PNG)*"
            name="posterFilm"
            onChange={handleChange}
            required
            multiple
            accept=".jpg,.jpeg,.png,.psd"
            maxFiles={5}
            maxSize={10 * 1024 * 1024} // 10MB
            error={errors.posterFilm}
            description={langText.posterFilmDescription}
          />

          {/* Press Kit */}
          <FileUploadField
            label="Press Kit Film (Detail Film, Sinopsis, Daftar Kru)*"
            name="pressKit"
            onChange={handleChange}
            required
            accept=".pdf"
            maxFiles={1}
            maxSize={10 * 1024 * 1024} // 10MB
            error={errors.pressKit}
          />

          {/* Setuju Publikasi */}
          <FormAgreementSection description={langText.setujuPublikasiLabel} checkboxLabel={langText.setujuPublikasiCheckbox} name="publikasiSetuju" checked={formData.publikasiSetuju} onChange={handleChange} error={errors.publikasiSetuju} />

          {/* Setuju Tayang */}
          <FormAgreementSection
            description={langText.publikasiFilmLabel}
            checkboxLabel={langText.publikasiFilmCheckbox}
            name="publikasiFilmSetuju"
            checked={formData.publikasiFilmSetuju}
            onChange={handleChange}
            error={errors.publikasiFilmSetuju}
          />

          {/* Data Benar */}
          <FormAgreementSection description={langText.dataBenarLabel} checkboxLabel={langText.dataBenarCheckbox} name="dataBenarSetuju" checked={formData.dataBenarSetuju} onChange={handleChange} error={errors.dataBenarSetuju} />

          {/* Submit */}
          <SubmitButton label={langText.submitButton} isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default FormKompetisiPelajar;
