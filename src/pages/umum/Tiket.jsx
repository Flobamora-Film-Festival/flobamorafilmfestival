import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageProvider"; // Hook untuk memilih bahasa
import textsTiket from "../../texts/textsTiket"; // File teks multibahasa

const Tiket = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("Bioskop Pasiar");
  const [kategoriTiket, setKategoriTiket] = useState("Reguler");
  const [jumlahTiket, setJumlahTiket] = useState(1);
  const [pesanTerkirim, setPesanTerkirim] = useState(false);

  const { language } = useLanguage(); // Mendapatkan bahasa yang dipilih
  const texts = textsTiket[language]; // Mengambil teks berdasarkan bahasa yang dipilih

  const handleSubmit = (e) => {
    e.preventDefault();
    setPesanTerkirim(true);

    // Reset form setelah beberapa detik
    setTimeout(() => {
      setPesanTerkirim(false);
      setNama("");
      setEmail("");
      setProgram("Bioskop Pasiar");
      setKategoriTiket("Reguler");
      setJumlahTiket(1);
    }, 5000); // Form akan kembali ke awal setelah 5 detik
  };

  return (
    <div className="min-h-screen py-10 px-5 lg:px-20 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6">{texts.title}</h1>

      {pesanTerkirim ? (
        <div className="text-center text-green-500 font-semibold">{texts.successMessage}</div>
      ) : (
        <form className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="mb-4">
            <label className="block font-medium mb-2">{texts.name}</label>
            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700" required />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-medium mb-2">{texts.email}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700" required />
          </div>

          {/* Pilih Program */}
          <div className="mb-4">
            <label className="block font-medium mb-2">{texts.program}</label>
            <select value={program} onChange={(e) => setProgram(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700" required>
              {Object.entries(texts.programOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Pilih Kategori Tiket */}
          <div className="mb-4">
            <label className="block font-medium mb-2">{texts.ticketCategory}</label>
            <select value={kategoriTiket} onChange={(e) => setKategoriTiket(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700" required>
              {Object.entries(texts.ticketCategoryOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Jumlah Tiket */}
          <div className="mb-4">
            <label className="block font-medium mb-2">{texts.numberOfTickets}</label>
            <input type="number" value={jumlahTiket} onChange={(e) => setJumlahTiket(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700" min="1" required />
          </div>

          {/* Tombol Pesan */}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md">
            {texts.submitButton}
          </button>
        </form>
      )}
    </div>
  );
};

export default Tiket;
