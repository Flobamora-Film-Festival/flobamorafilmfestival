// src/utils/validateField.js

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const phoneRegex = /^\+?[0-9]+$/;
const urlRegex = /^https?:\/\/[^\s]+$/;
const yearRegex = /^\d{4}$/;
const mmssRegex = /^\d{1,2}:[0-5][0-9]$/;
const durationRegex = /^\d{1,2}:\d{2}$/;

const messages = {
  ID: {
    email: "Email tidak valid",
    phone: "Nomor kontak tidak valid",
    year: "Tahun produksi tidak valid",
    duration: "Durasi harus dalam format MM:SS (contoh: 15:30)",
    url: "Harus berupa URL yang valid",
    required: "Field ini wajib diisi",
    file: "File ini wajib diunggah",
    checkbox: "Harus disetujui",
  },
  EN: {
    email: "Invalid email address",
    phone: "Invalid phone number",
    year: "Invalid production year",
    duration: "Duration must be in MM:SS format (example: 15:30)",
    url: "Must be a valid URL",
    required: "This field is required",
    file: "This file must be uploaded",
    checkbox: "Must be agreed",
  },
};

// ✅ Real-time validation per field
export const validateField = (name, value, lang = "ID") => {
  const msg = messages[lang] || messages.ID;
  const currentYear = new Date().getFullYear();

  switch (name) {
    case "email":
    case "emailSutradara":
      if (!emailRegex.test(value)) return msg.email;
      break;
    case "nomorKontak":
    case "nomorKontakSutradara":
      if (!phoneRegex.test(value)) return msg.phone;
      break;
    case "tahunProduksi":
      if (!yearRegex.test(value) || parseInt(value) > currentYear)
        return msg.year;
      break;
    case "durasiFilm":
      if (!mmssRegex.test(value)) return msg.duration;
      break;
    case "subtitleLink":
    case "linkPreview":
    case "linkTrailer":
      if (!urlRegex.test(value)) return msg.url;
      break;
    default:
      if (typeof value === "string" && value.trim() === "") return msg.required;
  }

  return ""; // Tidak ada error
};

// ✅ Full validation (on submit)
const validateAllFields = (data, lang = "ID") => {
  const errors = {};
  const msg = messages[lang] || messages.ID;
  const currentYear = new Date().getFullYear();

  if (!emailRegex.test(data.email)) errors.email = msg.email;
  if (!emailRegex.test(data.emailSutradara)) errors.emailSutradara = msg.email;

  if (!phoneRegex.test(data.nomorKontak)) errors.nomorKontak = msg.phone;
  if (!phoneRegex.test(data.nomorKontakSutradara))
    errors.nomorKontakSutradara = msg.phone;

  if (
    !yearRegex.test(data.tahunProduksi) ||
    parseInt(data.tahunProduksi) > currentYear
  ) {
    errors.tahunProduksi = msg.year;
  }

  if (!durationRegex.test(data.durasiFilm)) {
    errors.durasiFilm = msg.duration;
  }

  ["subtitleLink", "linkPreview", "linkTrailer"].forEach((field) => {
    if (!urlRegex.test(data[field])) errors[field] = msg.url;
  });

  ["publikasiSetuju", "tayangSetuju", "dataBenar"].forEach((field) => {
    if (!data[field]) errors[field] = msg.checkbox;
  });

  const requiredFields = [
    "posisi",
    "namaPendaftar",
    "namaSutradara",
    "domisiliSutradara",
    "bioSutradara",
    "namaProduser",
    "namaSekolah",
    "judulFilm",
    "kategoriFilm",
    "bahasaFilm",
    "sinopsis",
    "pernyataanSutradara",
    "resolusiFilm",
    "sound",
    "warna",
    "aksesPassword",
  ];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field].trim() === "") {
      errors[field] = msg.required;
    }
  });

  const requiredFiles = [
    "fotoSutradara",
    "filmografiSutradara",
    "kartuPelajar",
    "posterFilm",
    "pressKit",
  ];

  requiredFiles.forEach((field) => {
    if (!data[field]) errors[field] = msg.file;
  });

  return errors;
};

export default validateAllFields;
