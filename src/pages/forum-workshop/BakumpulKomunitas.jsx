import React, { useContext } from "react"; // ✅ tambahkan useContext
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Gunakan custom hook
import { ThemeContext } from "../../context/ThemeContext";

const BakumpulKomunitas = () => {
  const { language } = useLanguage(); // ✅ Ambil state bahasa langsung
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const communities = [
    {
      name: "Komunitas Ugu",
      nameEN: "Ugu Community",
      descriptionID: "Komunitas dari Sikka yang berfokus pada industri kreatif.",
      descriptionEN: "Community from Sikka focused on creative industry.",
      image: "/assets/community-1.jpg",
    },
    {
      name: "Langit Jingga Film",
      nameEN: "Langit Jingga Film",
      descriptionID: "Komunitas film dari Lembata.",
      descriptionEN: "Film community from Lembata.",
      image: "/assets/community-2.jpg",
    },
    {
      name: "Kita Kefa",
      nameEN: "Kita Kefa",
      descriptionID: "Aktif dalam kegiatan seni budaya di Kefamenanu.",
      descriptionEN: "Active in arts and culture in Kefamenanu.",
      image: "/assets/community-3.jpg",
    },
    {
      name: "Atambua Creative",
      nameEN: "Atambua Creative",
      descriptionID: "Komunitas multimedia dan film dari Atambua.",
      descriptionEN: "Multimedia and film group from Atambua.",
      image: "/assets/community-4.jpg",
    },
    {
      name: "Kupang Indie Project",
      nameEN: "Kupang Indie Project",
      descriptionID: "Berbasis di Kupang, fokus pada film pendek.",
      descriptionEN: "Based in Kupang, focused on short films.",
      image: "/assets/community-5.jpg",
    },
    {
      name: "Flores Youth Cinema",
      nameEN: "Flores Youth Cinema",
      descriptionID: "Komunitas pemuda pencinta film di Flores.",
      descriptionEN: "Young filmmakers' collective in Flores.",
      image: "/assets/community-6.jpg",
    },
    {
      name: "NTT Film Society",
      nameEN: "NTT Film Society",
      descriptionID: "Jaringan komunitas film se-NTT.",
      descriptionEN: "Film community network across NTT.",
      image: "/assets/community-7.jpg",
    },
    {
      name: "Larantuka Visual",
      nameEN: "Larantuka Visual",
      descriptionID: "Komunitas seni visual dan dokumenter.",
      descriptionEN: "Visual arts and documentary group.",
      image: "/assets/community-8.jpg",
    },
    {
      name: "Rote Cinema Lab",
      nameEN: "Rote Cinema Lab",
      descriptionID: "Eksperimen visual dari Rote Ndao.",
      descriptionEN: "Visual experimenters from Rote Ndao.",
      image: "/assets/community-9.jpg",
    },
    {
      name: "Komunitas Film Alor",
      nameEN: "Alor Film Community",
      descriptionID: "Komunitas pembuat film dari Alor.",
      descriptionEN: "Film community from Alor.",
      image: "/assets/community-10.jpg",
    },
  ];

  return (
    <div className={`w-full px-4 py-10 scroll-mt-20 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} transition-all`}>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{language === "ID" ? "Bakumpul Komunitas" : "Community Gathering"}</h1>
        <p className="text-lg max-w-3xl mx-auto">
          {language === "ID" ? "Bakumpul Komunitas mempertemukan komunitas kreatif NTT untuk berbagi ide dan rencana bersama." : "Community Gathering brings together creative communities in NTT to share ideas and plans together."}
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((community, index) => (
            <div key={index} className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              <div className="h-[220px] bg-cover bg-center" style={{ backgroundImage: `url(${community.image})` }}></div>
              <div className="p-4">
                <h4 className="text-xl font-semibold">{language === "ID" ? community.name : community.nameEN}</h4>
                <p className="text-sm mt-2">{language === "ID" ? community.descriptionID : community.descriptionEN}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BakumpulKomunitas;
