/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext"; // Pastikan path-nya benar
import bioskopPasiarImage from "../assets/bioskop-pasiar.png"; // Mengimpor gambar bioskop-pasiar.png

const BioskopPasiar = () => {
  const { language } = useContext(LanguageContext); // Mengambil data language dari context

  const movieCategories = [
    {
      title: language === "ID" ? "Film Aksi" : "Action Movies",
      films: [
        { id: 1, title: "Film Aksi 1", image: "../assets/movie-1.png" },
        { id: 2, title: "Film Aksi 2", image: "../assets/movie-2.png" },
        { id: 3, title: "Film Aksi 3", image: "../assets/movie-3.png" },
      ],
    },
    {
      title: language === "ID" ? "Film Drama" : "Drama Movies",
      films: [
        { id: 4, title: "Film Drama 1", image: "../assets/movie-4.png" },
        { id: 5, title: "Film Drama 2", image: "../assets/movie-5.png" },
        { id: 6, title: "Film Drama 3", image: "../assets/movie-6.png" },
      ],
    },
    {
      title: language === "ID" ? "Film Komedi" : "Comedy Movies",
      films: [
        { id: 7, title: "Film Komedi 1", image: "../assets/movie-7.png" },
        { id: 8, title: "Film Komedi 2", image: "../assets/movie-8.png" },
        { id: 9, title: "Film Komedi 3", image: "../assets/movie-9.png" },
      ],
    },
  ];

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
            <div className="text-white text-center w-full max-full mt-10">
              <h4 className="text-4xl font-semibold mb-4">{language === "ID" ? "Selamat datang di Bioskop Pasiar!" : "Welcome to Bioskop Pasiar!"}</h4>
              <p className="mt-4 text-lg">
                {language === "ID"
                  ? "Bioskop Pasiar adalah program yang digagas oleh Komunitas Film Kupang sebagai bagian dari rangkaian acara menuju Flobamora Film Festival. Program ini bertujuan untuk membawa film-film berkualitas ke berbagai kelurahan di Kota Kupang, sehingga masyarakat dapat menikmati tayangan film secara gratis di lingkungan mereka. Selain itu, Bioskop Pasiar juga berupaya untuk meningkatkan literasi film dan memperkenalkan karya-karya sineas lokal kepada masyarakat luas."
                  : "Bioskop Pasiar is a program initiated by the Komunitas Film Kupang as part of the events leading up to the Flobamora Film Festival. This program aims to bring quality films to various urban villages in Kupang City, allowing the community to enjoy free film screenings in their neighborhoods. Additionally, Bioskop Pasiar strives to enhance film literacy and introduce works from local filmmakers to a wider audience."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Judul dan Deskripsi Film */}
      <h2 className="text-center text-4xl font-semibold mb-12">{language === "ID" ? "Film Terbaru" : "Latest Movies"}</h2>

      {/* Loop through movie categories */}
      {movieCategories.map((category) => (
        <div key={category.title} className="my-10">
          <h3 className="text-3xl text-center font-semibold mb-8">{category.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.films.map((film) => (
              <div
                key={film.id}
                className="flex-shrink-0 w-full h-[400px] border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
              >
                <div className="w-full h-full bg-no-repeat bg-cover bg-center rounded-lg relative" style={{ backgroundImage: `url(${film.image})` }}>
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-t from-black to-transparent w-full h-1/3 rounded-lg">
                    <div className="text-white p-3">
                      <h2 className="font-semibold">{film.title}</h2>
                      <p className="text-sm">{language === "ID" ? "Tonton Sekarang" : "Watch Now"}</p>
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
        {language === "ID" ? "Tampilkan lebih banyak" : "Show more"}
        <img src="/assets/right-arrow-blod.png" alt="" className="w-4 dark:hidden" />
        <img src="/assets/right-arrow-blod-dark.png" alt="" className="w-4 hidden dark:block" />
      </a>
    </div>
  );
};

export default BioskopPasiar;
