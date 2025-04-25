import React from "react";
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Gunakan custom hook
import bioskopPasiarImage from "../../assets/bioskop-pasiar.png"; // Gambar bioskop
import textsBioskopPasiar from "../../texts/textsBioskopPasiar"; // Import teks multibahasa

const BioskopPasiar = () => {
  const { language } = useLanguage(); // ✅ Ambil state bahasa langsung
  const movieCategories = [
    {
      title: language === "ID" ? "Film Aksi" : "Action Movies",
      films: [
        { filmId: "action-1", title: "Film Aksi 1", image: "../assets/movie-1.png" },
        { filmId: "action-2", title: "Film Aksi 2", image: "../assets/movie-2.png" },
        { filmId: "action-3", title: "Film Aksi 3", image: "../assets/movie-3.png" },
      ],
    },
    {
      title: language === "ID" ? "Film Drama" : "Drama Movies",
      films: [
        { filmId: "drama-1", title: "Film Drama 1", image: "../assets/movie-4.png" },
        { filmId: "drama-2", title: "Film Drama 2", image: "../assets/movie-5.png" },
        { filmId: "drama-3", title: "Film Drama 3", image: "../assets/movie-6.png" },
      ],
    },
    {
      title: language === "ID" ? "Film Komedi" : "Comedy Movies",
      films: [
        { filmId: "comedy-1", title: "Film Komedi 1", image: "../assets/movie-7.png" },
        { filmId: "comedy-2", title: "Film Komedi 2", image: "../assets/movie-8.png" },
        { filmId: "comedy-3", title: "Film Komedi 3", image: "../assets/movie-9.png" },
      ],
    },
  ];

  const texts = textsBioskopPasiar[language]; // Ambil teks berdasarkan bahasa

  return (
    <div id="bioskop-pasiar" className="w-full px-4 py-10 scroll-mt-20">
      {/* Penjelasan tentang Bioskop Pasiar dengan efek gradien di dalam gambar */}
      <div className="relative text-center mb-12">
        {/* Gambar dengan efek gradien dan pengaturan cropping */}
        <div
          className="relative w-full h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${bioskopPasiarImage})`,
            backgroundPosition: "center center", // Mengatur posisi gambar untuk cropping
            backgroundSize: "cover", // Menjaga gambar menutupi area elemen
          }}
        >
          {/* Teks dengan efek gradien di atas gambar */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center p-6">
            <div className="text-white text-center w-full max-w-screen-lg mx-auto mt-10">
              <h4 className="text-4xl font-semibold mb-4">{texts.welcomeTitle}</h4>
              <p className="mt-4 text-lg">{texts.welcomeText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Judul dan Deskripsi Film */}
      <h2 className="text-center text-4xl font-semibold mb-12">{texts.latestMovies}</h2>

      {/* Loop through movie categories */}
      {movieCategories.map((category) => (
        <div key={category.title} className="my-10">
          <h3 className="text-3xl text-center font-semibold mb-8">{category.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.films.map((film) => (
              <div
                key={film.filmId} // Menggunakan filmId untuk kunci unik
                className="flex-shrink-0 w-full h-[400px] border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
              >
                <div className="w-full h-full bg-no-repeat bg-cover bg-center rounded-lg relative" style={{ backgroundImage: `url(${film.image})` }}>
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-t from-black to-transparent w-full h-1/3 rounded-lg">
                    <div className="text-white p-3">
                      <h2 className="font-semibold">{film.title}</h2>
                      <p className="text-sm">{texts.watchNow}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Show More Button */}
      <a
        href="#"
        className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500
    dark:text-white dark:border-white dark:hover:bg-darkHover"
      >
        {texts.showMore}
        <img src="/assets/right-arrow-blod.png" alt="" className="w-4 dark:hidden" />
        <img src="/assets/right-arrow-blod-dark.png" alt="" className="w-4 hidden dark:block" />
      </a>
    </div>
  );
};

export default BioskopPasiar;
