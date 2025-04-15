const validateAllFields = (data, lang = "ID", context = "NTT") => {
  const errors = {};
  const isEmpty = (val) => !val || (typeof val === "string" && val.trim() === "");

  const isInvalidEmail = (val) => val && !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(val);
  const isInvalidPhone = (val) => val && !/^\+?\d{8,15}$/.test(val);
  const isInvalidLink = (val) => val && !/^https?:\/\/.+/.test(val);

  const req = (id, en) => (lang === "ID" ? id : en);

  const required = (field, idMsg, enMsg) => {
    if (isEmpty(data[field])) errors[field] = req(idMsg, enMsg);
  };

  // Konteks: "Pelajar", "NTT", "LayarNusantara", "KfkFilmLab"
  if (context === "Pelajar") {
    [
      ["namaPendaftar", "Wajib diisi", "Required"],
      ["nomorKontak", "Wajib diisi", "Required"],
      ["email", "Wajib diisi", "Required"],
      ["namaSutradara", "Wajib diisi", "Required"],
      ["nomorKontakSutradara", "Wajib diisi", "Required"],
      ["emailSutradara", "Wajib diisi", "Required"],
      ["judulFilm", "Wajib diisi", "Required"],
      ["kategoriFilm", "Wajib diisi", "Required"],
      ["tahunProduksi", "Wajib diisi", "Required"],
      ["durasiFilm", "Wajib diisi", "Required"],
      ["bahasaFilm", "Wajib diisi", "Required"],
      ["sinopsis", "Wajib diisi", "Required"],
      ["pernyataanSutradara", "Wajib diisi", "Required"],
      ["kartuPelajar", "Wajib diunggah", "Must be uploaded"],
    ].forEach(([field, id, en]) => required(field, id, en));
  }

  if (context === "NTT") {
    [
      ["namaPendaftar", "Wajib diisi", "Required"],
      ["nomorKontak", "Wajib diisi", "Required"],
      ["email", "Wajib diisi", "Required"],
      ["mediaSosialSutradara", "Wajib diisi", "Required"],
      ["judulFilm", "Wajib diisi", "Required"],
      ["kategoriFilm", "Wajib diisi", "Required"],
      ["tahunProduksi", "Wajib diisi", "Required"],
      ["durasiFilm", "Wajib diisi", "Required"],
      ["bahasaFilm", "Wajib diisi", "Required"],
      ["subtitleLink", "Wajib diisi", "Required"],
      ["sinopsis", "Wajib diisi", "Required"],
      ["pernyataanSutradara", "Wajib diisi", "Required"],
      ["resolusiFilm", "Wajib diisi", "Required"],
      ["sound", "Wajib diisi", "Required"],
      ["warna", "Wajib diisi", "Required"],
      ["namaProduser", "Wajib diisi", "Required"],
      ["namaRumahProduksi", "Wajib diisi", "Required"],
      ["bioSutradara", "Wajib diisi", "Required"],
      ["filmografiSutradara", "Wajib diunggah", "Must be uploaded"],
    ].forEach(([field, id, en]) => required(field, id, en));
  }

  if (context === "LayarNusantara") {
    [
      ["judulFilm", "Wajib diisi", "Required"],
      ["kategoriFilm", "Wajib diisi", "Required"],
      ["durasiFilm", "Wajib diisi", "Required"],
      ["sinopsis", "Wajib diisi", "Required"],
      ["tahunProduksi", "Wajib diisi", "Required"],
    ].forEach(([field, id, en]) => required(field, id, en));
  }

  if (context === "KfkFilmLab") {
    [
      ["namaPendaftar", "Wajib diisi", "Required"],
      ["Gender", "Wajib diisi", "Required"],
      ["AlamatLengkap", "Wajib diisi", "Required"],
      ["nomorHP", "Wajib diisi", "Required"],
      ["email", "Wajib diisi", "Required"],
      ["MedsosPendaftar", "Wajib diisi", "Required"],
      ["JudulProyekFilm", "Wajib diisi", "Required"],
      ["Treatment", "Wajib diisi", "Required"],
      ["StatementProduser", "Wajib diisi", "Required"],
      ["StatementSutradara", "Wajib diisi", "Required"],
      ["CV", "Wajib diunggah", "Must be uploaded"],
    ].forEach(([field, id, en]) => required(field, id, en));
  }

  // Validasi tambahan
  if (isInvalidEmail(data.email)) {
    errors.email = req("Format email tidak valid", "Invalid email format");
  }

  if (data.nomorKontak && isInvalidPhone(data.nomorKontak)) {
    errors.nomorKontak = req("Nomor tidak valid", "Invalid phone number");
  }

  if (data.subtitleLink && isInvalidLink(data.subtitleLink)) {
    errors.subtitleLink = req("Harus berupa link valid", "Must be a valid link");
  }

  if (data.filmografiSutradara && data.filmografiSutradara.type !== "application/pdf") {
    errors.filmografiSutradara = req("File harus PDF", "File must be PDF");
  }

  return errors;
};

export default validateAllFields;
