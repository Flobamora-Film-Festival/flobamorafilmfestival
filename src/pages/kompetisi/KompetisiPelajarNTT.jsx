import React from "react";
import { Link } from "react-router-dom";

const KompetisiPelajarNTT = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 text-gray-900 dark:text-white">
      <h2 className="text-center text-5xl font-Outfit font-bold mb-6 dark:text-white">
        Kompetisi Film Pelajar NTT 2025
      </h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Outfit">
        Halo sineas muda Flobamora! Selamat datang di Kompetisi Film Pelajar
        Flobamora Film Festival 2025. Mari tunjukkan kreativitasmu dengan
        mengirimkan karya terbaik!
      </p>
      <div className="max-w-3xl text-left">
        <h3 className="text-2xl font-Outfit font-bold mb-4">
          Persyaratan film:
        </h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Film diproduksi oleh pelajar tingkat SMA/SMK sederajat di NTT.
          </li>
          <li>Sutradara dan mayoritas tim produksi adalah pelajar NTT.</li>
          <li>Genre film: dokumenter, fiksi, dan eksperimental.</li>
          <li>
            Durasi film maksimal 15 menit (termasuk pembuka dan credit title).
          </li>
          <li>
            Film diproduksi dalam kurun waktu 2 tahun terakhir (2024-2025).
          </li>
          <li>
            Film belum pernah tayang di kanal digital seperti OTT atau layanan
            streaming lainnya.
          </li>
        </ol>
        <h3 className="text-2xl font-Outfit font-bold mt-6 mb-4">
          Materi putar:
        </h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            File film dalam format .mp4 atau .mov (Full HD 1920 x 1080) maksimal
            4K.
          </li>
          <li>
            Film menggunakan bahasa Indonesia, atau jika menggunakan bahasa
            daerah/asing wajib menyertakan subtitle bahasa Indonesia.
          </li>
        </ol>
      </div>
      <p className="text-center max-w-2xl mx-auto mt-6 font-Outfit">
        Sampai jumpa di Flobamora Film Festival 5 - 9 Agustus 2025!
      </p>
      <p className="text-center max-w-2xl mx-auto mt-2 font-Outfit">
        Jika ada kendala, silakan hubungi kami di{" "}
        <a
          href="mailto:flobamorafilmfestival@gmail.com"
          className="text-blue-500 underline"
        >
          flobamorafilmfestival@gmail.com
        </a>
      </p>
      <div className="mt-10 flex space-x-4">
        <Link
          to="/submit-film"
          className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700"
        >
          Kembali ke Halaman Submit
        </Link>
        <Link
          to="/formulir-pendaftaran"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700"
        >
          Menuju Formulir Pendaftaran
        </Link>
      </div>
    </div>
  );
};

export default KompetisiPelajarNTT;
