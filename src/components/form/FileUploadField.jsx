import React, { useState, useEffect } from "react"; // Impor useEffect

const FileUploadField = ({
  label,
  name,
  onChange,
  required = false,
  accept = "",
  multiple = false,
  maxFiles = null,
  maxSize = null,
  error = "",
  description = "",
  theme = "light",
}) => {
  const [file, setFile] = useState(null);

  // Cek apakah ada file yang sudah diunggah sebelumnya di localStorage
  useEffect(() => {
    const savedFile = localStorage.getItem(name);
    if (savedFile) {
      setFile(JSON.parse(savedFile)); // Mengambil file dari localStorage
    }
  }, [name]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (maxFiles && files.length > maxFiles) {
      alert(`Maksimum ${maxFiles} file diperbolehkan.`);
      return;
    }
    if (maxSize && files.some((file) => file.size > maxSize)) {
      alert(`Ukuran file maksimal ${maxSize / 1_000_000}MB.`);
      return;
    }

    // Simpan file di state dan localStorage
    const uploadedFile = files[0];
    setFile(uploadedFile);
    localStorage.setItem(name, JSON.stringify(uploadedFile)); // Simpan file di localStorage
    onChange(e);
  };

  const handleRemoveFile = () => {
    setFile(null);
    localStorage.removeItem(name); // Hapus file dari localStorage
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-lg font-medium">{label}</label>}

      {description && (
        <p
          className={`text-sm mt-1 ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`}
        >
          {description}
        </p>
      )}

      <input
        type="file"
        name={name}
        onChange={handleFileChange}
        required={required}
        multiple={multiple}
        accept={accept}
        className="mt-2 w-full"
      />

      {file && (
        <div className="mt-2">
          <p className="text-sm">File uploaded: {file.name}</p>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-500 text-sm"
          >
            Hapus file
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FileUploadField;
