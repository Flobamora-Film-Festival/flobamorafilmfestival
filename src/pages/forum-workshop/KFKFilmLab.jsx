import React, { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";

// Komponen untuk Mentor
const MentorCard = React.memo(({ mentor, language }) => {
  const acf = mentor.acf || {};
  const name = acf[`nama_mentor_${language.toLowerCase()}`] || mentor.title.rendered;
  const bio = acf[`bio_mentor_${language.toLowerCase()}`] || (language === "ID" ? "Bio tidak tersedia." : "Bio is not available.");
  const photo = acf.foto_mentor || "/default.jpg";

  return (
    <div className="flex flex-col lg:flex-row w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 mb-10">
      {/* Foto Mentor di Kiri */}
      <div className="flex-shrink-0 mb-4 lg:mb-0 lg:w-1/4 flex justify-center items-center p-4">
        <img src={photo} alt={`Foto mentor ${name}`} className="w-[200px] h-[260px] object-cover rounded-md border border-gray-300 dark:border-gray-700" />
      </div>

      {/* Nama + Bio di Kanan */}
      <div className="lg:ml-8 flex-1 flex flex-col items-center lg:items-start text-center lg:text-left p-4">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{name}</h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed lg:text-justify text-sm lg:text-base text-center">{bio}</p>
      </div>
    </div>
  );
});

// Komponen untuk Skenario Terpilih
const SelectedScriptCard = React.memo(({ script, language }) => {
  const acf = script.acf || {};
  const title = acf[`judul_skenario_${language.toLowerCase()}`] || script.title.rendered;
  const description = acf[`deskripsi_skenario_${language.toLowerCase()}`] || "Deskripsi tidak tersedia.";
  const photo = acf.foto_skenario || "/default-script.jpg";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
      <img src={photo} alt={`Foto skenario ${title}`} className="w-full h-48 object-cover rounded-md mb-4" />
      <h4 className="font-semibold text-xl text-gray-900 dark:text-white mb-3">{title}</h4>
      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
});

const KFKFilmLab = () => {
  const { language } = useLanguage();
  const [mentors, setMentors] = useState([]);
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorResponse, scriptResponse] = await Promise.all([
          fetch("https://backend.flobamorafilmfestival.com/wp-json/wp/v2/mentor_kfk_film_lab"),
          fetch("https://backend.flobamorafilmfestival.com/wp-json/wp/v2/script_kfk_film_lab"),
        ]);
        if (!mentorResponse.ok || !scriptResponse.ok) throw new Error("Failed to fetch data");
        const mentorsData = await mentorResponse.json();
        const scriptsData = await scriptResponse.json();
        setMentors(mentorsData);
        setScripts(scriptsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-6 py-10 lg:px-16 xl:px-24">
      {/* Hero */}
      <section className="relative text-center mb-16">
        <div className="relative w-full h-[500px] bg-cover bg-center rounded-xl overflow-hidden" style={{ backgroundImage: `url(/assets/kfk-film-lab.jpg)` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center p-6">
            <div className="text-white text-center max-w-4xl">
              <h1 className="text-4xl font-semibold mb-4">KFK Film Lab</h1>
              <p className="text-lg">{language === "ID" ? "KFK Film Lab adalah laboratorium naskah film pendek untuk sineas muda NTT." : "KFK Film Lab is a short film script lab for young filmmakers in East Nusa Tenggara."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Program */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-4 text-center">{language === "ID" ? "Tentang Program" : "About the Program"}</h3>
        <p className="text-lg text-center max-w-4xl mx-auto">
          {language === "ID"
            ? "KFK Film Lab bertujuan mendukung pertumbuhan industri film lokal lewat pelatihan penulisan naskah, diskusi kreatif, dan pembinaan intensif bersama mentor berpengalaman."
            : "KFK Film Lab aims to support the growth of the local film industry through scriptwriting training, creative discussions, and intensive mentoring."}
        </p>
      </section>

      {/* Skenario Terpilih */}
      <section className="mb-16 px-4 lg:px-16 xl:px-24">
        <h3 className="text-2xl font-bold mb-6 text-center">{language === "ID" ? "Skenario Terpilih" : "Selected Scripts"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <SelectedScriptCard key={script.id} script={script} language={language} />
          ))}
        </div>
      </section>

      {/* Mentor */}
      <section className="mb-16 px-4 lg:px-16 xl:px-24">
        <h3 className="text-2xl font-bold mb-8 text-center">{language === "ID" ? "Mentor" : "Mentors"}</h3>
        <div className="flex flex-col w-full">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} language={language} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default KFKFilmLab;
