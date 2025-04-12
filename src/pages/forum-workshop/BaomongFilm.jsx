import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const BaomongFilm = () => {
  const { language } = useContext(LanguageContext);
  const videoId = "wGgiRTbcBFE";

  const sessions = [
    {
      topicID: "Perempuan di Balik Layar",
      topicEN: "Women Behind the Screen",
      descriptionID:
        "Diskusi tentang peran penting perempuan dalam produksi film, tantangan, dan peluang.",
      descriptionEN:
        "Discussion on the crucial role of women in film production, including challenges and opportunities.",
      speakers: ["Vania Damayanti", "Vivian Idris", "Yedida Letedara"],
      location: "Taman Budaya Gerson Poyk, Kupang",
    },
    {
      topicID: "Cerita dari Timur",
      topicEN: "Stories from the East",
      descriptionID:
        "Bagaimana cerita-cerita dari wilayah Timur Indonesia dapat mewarnai sinema nasional.",
      descriptionEN:
        "How stories from Eastern Indonesia enrich the national cinema landscape.",
      speakers: ["Andi Lilu", "Mira Ratu", "Deni Talo"],
      location: "Aula BPMP Provinsi NTT",
    },
  ];

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10 scroll-mt-20">
      {/* Hero Section */}
      <section className="relative text-center mb-12">
        <div
          className="relative w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: `url(/assets/baomong-film.jpg)`,
            backgroundPosition: "center top",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center p-6">
            <div className="text-white text-center w-full max-w-3xl">
              <h2 className="text-4xl font-semibold mb-4">Baomong Film</h2>
              <p className="text-lg max-w-2xl mx-auto">
                {language === "ID"
                  ? "Baomong Film adalah sesi diskusi yang membahas tentang film, perempuan, dan hal-hal yang belum dibicarakan di dunia perfilman."
                  : "Baomong Film is a discussion session that talks about film, women, and unspoken matters in the film industry."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Program */}
      <section className="mb-16 max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-6">
          {language === "ID" ? "Tentang Baomong Film" : "About Baomong Film"}
        </h3>
        <p className="text-lg">
          {language === "ID"
            ? "Acara ini menghadirkan topik-topik penting dan pembicara dari berbagai latar belakang untuk mendorong percakapan terbuka dan reflektif tentang sinema dan masyarakat."
            : "This event brings important topics and speakers from various backgrounds to encourage open and reflective conversations on cinema and society."}
        </p>
      </section>

      {/* Sesi Baomong Film */}
      <section className="mb-16 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold mb-8 text-center">
          {language === "ID" ? "Sesi Baomong Film" : "Baomong Film Sessions"}
        </h3>
        <div className="grid gap-6">
          {sessions.map((sesi, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-6 rounded-lg shadow"
            >
              <h4 className="text-2xl font-bold mb-2">
                {language === "ID" ? sesi.topicID : sesi.topicEN}
              </h4>
              <p className="mb-2">
                {language === "ID" ? sesi.descriptionID : sesi.descriptionEN}
              </p>
              <p className="text-sm">
                <strong>
                  {language === "ID" ? "Narasumber" : "Speakers"}:
                </strong>{" "}
                {sesi.speakers.join(", ")}
              </p>
              <p className="text-sm">
                <strong>{language === "ID" ? "Lokasi" : "Location"}:</strong>{" "}
                {sesi.location}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="text-center my-16">
        <h3 className="text-3xl font-semibold mb-6">
          {language === "ID"
            ? "Tonton Video Baomong Film"
            : "Watch Baomong Film Video"}
        </h3>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="Baomong Film YouTube Thumbnail"
            className="mx-auto rounded-lg shadow-md hover:opacity-90 transition duration-300"
          />
        </a>
      </section>
    </div>
  );
};

export default BaomongFilm;
