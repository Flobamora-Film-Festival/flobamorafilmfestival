import React, { useContext } from "react";
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Gunakan custom hook
import { ThemeContext } from "../../context/ThemeContext"; // Tetap gunakan useContext untuk ThemeContext

const KFKFilmLab = () => {
  const { language } = useLanguage(); // ✅ Ambil state language dengan useLanguage
  const { theme } = useContext(ThemeContext); // ✅ Tetap gunakan useContext untuk ThemeContext

  const mentors = [
    {
      name: "Mentor 1",
      role: "Penulis Skenario",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Mentor 2",
      role: "Sutradara",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Mentor 3",
      role: "Produser",
      img: "https://via.placeholder.com/150",
    },
  ];

  const scripts = [
    {
      title: "Laut yang Terlupakan",
      author: "Ardi Meko",
      photo: "https://via.placeholder.com/150",
      description: {
        ID: "Seorang anak nelayan harus memilih antara mengikuti jejak ayahnya atau merantau demi masa depan.",
        EN: "A fisherman's son must choose between following in his father's footsteps or leaving to seek a better future.",
      },
    },
    {
      title: "Langkah di Atas Tanah Merah",
      author: "Maria Delo",
      photo: "https://via.placeholder.com/150",
      description: {
        ID: "Kisah anak muda yang berjuang menjaga identitas budaya di tengah modernisasi kampungnya.",
        EN: "A youth struggles to preserve cultural identity amidst the modernization of their village.",
      },
    },
    {
      title: "Surat dari Timur",
      author: "Davin Lede",
      photo: "https://via.placeholder.com/150",
      description: {
        ID: "Seorang jurnalis menemukan surat dari masa lalu yang mengubah pandangannya tentang konflik di kampungnya.",
        EN: "A journalist finds a letter from the past that changes his perspective on the conflict in his hometown.",
      },
    },
    {
      title: "Kisah dari Kaki Gunung",
      author: "Sinta Ndolu",
      photo: "https://via.placeholder.com/150",
      description: {
        ID: "Dua sahabat dari latar berbeda bersatu dalam impian yang sama: membuat film pertama mereka.",
        EN: "Two friends from different backgrounds unite in the same dream: making their first film.",
      },
    },
    {
      title: "Bayang-Bayang di Atap Rumah",
      author: "Yosua Seki",
      photo: "https://via.placeholder.com/150",
      description: {
        ID: "Ketika rahasia lama keluarganya terungkap, seorang remaja menghadapi trauma yang telah lama tersembunyi.",
        EN: "When his family's long-hidden secret is revealed, a teenager confronts a deeply buried trauma.",
      },
    },
  ];

  return (
    <div className={`w-full px-4 py-10 lg:px-20 xl:px-32 scroll-mt-20 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Hero Section */}
      <section className="relative text-center mb-16">
        <div className="relative w-full h-[400px] bg-cover bg-center rounded-xl overflow-hidden" style={{ backgroundImage: `url(/assets/kfk-film-lab.jpg)` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center p-6">
            <div className="text-white text-center max-w-3xl">
              <h2 className="text-4xl font-semibold mb-4">KFK Film Lab</h2>
              <p className="text-lg">{language === "ID" ? "KFK Film Lab adalah laboratorium naskah film pendek untuk sineas muda NTT." : "KFK Film Lab is a short film script lab for young filmmakers in East Nusa Tenggara."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Program */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-4 text-center">{language === "ID" ? "Tentang Program" : "About the Program"}</h3>
        <p className="text-lg text-center max-w-3xl mx-auto">
          {language === "ID"
            ? "KFK Film Lab bertujuan mendukung pertumbuhan industri film lokal lewat pelatihan penulisan naskah, diskusi kreatif, dan pembinaan intensif bersama mentor berpengalaman."
            : "KFK Film Lab aims to support the growth of the local film industry through scriptwriting training, creative discussions, and intensive mentoring."}
        </p>
      </section>

      {/* Mentor */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6 text-center">{language === "ID" ? "Para Mentor" : "Mentors"}</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mentors.map((mentor, i) => (
            <div key={i} className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <img src={mentor.img} alt={mentor.name} className="w-24 h-24 rounded-full mb-3 object-cover border" />
              <h4 className="font-semibold text-lg">{mentor.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Naskah Terpilih */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-center">{language === "ID" ? "5 Naskah Terpilih" : "5 Selected Scripts"}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {scripts.map((script, i) => (
            <div key={i} className="flex items-start gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow">
              <img src={script.photo} alt={script.author} className="w-20 h-20 object-cover rounded-full border" />
              <div>
                <h4 className="text-lg font-bold">{script.title}</h4>
                <p className="text-sm italic mb-1">{script.author}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{script.description[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default KFKFilmLab;
