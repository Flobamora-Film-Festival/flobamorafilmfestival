import React, { useState } from "react";

const Tiket = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("Bioskop Pasiar");
  const [kategoriTiket, setKategoriTiket] = useState("Reguler");
  const [jumlahTiket, setJumlahTiket] = useState(1);
  const [pesanTerkirim, setPesanTerkirim] = useState(false);

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
      <h1 className="text-2xl lg:text-3xl font-bold text-center mb-6">
        Pemesanan Tiket Festival 🎟
      </h1>

      {pesanTerkirim ? (
        <div className="text-center text-green-500 font-semibold">
          ✅ Tiket berhasil dipesan! Silakan cek email Anda untuk konfirmasi.
        </div>
      ) : (
        <form
          className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          {/* Nama */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700"
              required
            />
          </div>

          {/* Pilih Program */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Program Festival</label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700"
              required
            >
              <option value="Bioskop Pasiar">🎬 Bioskop Pasiar</option>
              <option value="Kompetisi">🏆 Kompetisi</option>
              <option value="Non-Kompetisi">🎥 Non-Kompetisi</option>
              <option value="KFK Film Lab">🎭 KFK Film Lab</option>
              <option value="Bakumpul Komunitas">🤝 Bakumpul Komunitas</option>
              <option value="Baomong Film">🎙 Baomong Film</option>
              <option value="Opening & Closing Ceremony">
                🎉 Opening & Closing Ceremony
              </option>
            </select>
          </div>

          {/* Pilih Kategori Tiket */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Kategori Tiket</label>
            <select
              value={kategoriTiket}
              onChange={(e) => setKategoriTiket(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700"
              required
            >
              <option value="Reguler">Reguler</option>
              <option value="VIP">VIP</option>
              <option value="All Access Pass">All Access Pass</option>
              <option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</option>
            </select>
          </div>

          {/* Jumlah Tiket */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Jumlah Tiket</label>
            <input
              type="number"
              value={jumlahTiket}
              onChange={(e) => setJumlahTiket(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700"
              min="1"
              required
            />
          </div>

          {/* Tombol Pesan */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
          >
            Pesan Tiket
          </button>
        </form>
      )}
    </div>
  );
};

export default Tiket;
