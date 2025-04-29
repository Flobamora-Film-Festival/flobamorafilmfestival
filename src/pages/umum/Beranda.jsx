/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { ThemeContext } from "../../context/ThemeContext";
import previousFestivals from "../../texts/previousFestivals";
import sendEmail from "../../utils/sendEmail";
import { motion } from "framer-motion";
import artworkId from "../../assets/artwork-id.png";
import artworkEn from "../../assets/artwork-en.png";
import right_arrow_white from "../../assets/right-arrow-white.png";
import userImageLight from "../../assets/user-image.png";
import userImageDark from "../../assets/user-image-dark.png";
import artworkIdmobile from "../../assets/artwork-id-mobile.png";
import artworkEnmobile from "../../assets/artwork-en-mobile.png";
import textsBeranda from "../../texts/textsBeranda";
import ContactForm from "../../components/ContactForm";
import { Link } from "react-router-dom";

const mainSponsors = ["/assets/sponsors/sponsor-logo.png"];

const Beranda = () => {
  const { language: langContext } = useLanguage();
  const language = langContext === "EN" ? "EN" : "ID";
  const selectedText = textsBeranda[language];

  const { isDarkMode } = useContext(ThemeContext);

  const artworkMobile = language === "ID" ? artworkIdmobile : artworkEnmobile;
  const artworkDesktop = language === "ID" ? artworkId : artworkEn;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    isSubmitted: false,
    isError: false,
    loading: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek validasi input dulu
    if (!formData.name || !formData.email || !formData.message || !/\S+@\S+\.\S+/.test(formData.email)) {
      setFormData((prevData) => ({
        ...prevData,
        isError: true,
      }));
      return;
    }

    // Cek apakah turnstileToken sudah ada
    if (!turnstileToken) {
      setTurnstileError(language === "ID" ? "Harap verifikasi Turnstile terlebih dahulu" : "Please complete the Turnstile verification");
      return;
    }

    // Lanjutkan loading state
    setFormData((prevData) => ({
      ...prevData,
      isError: false,
      loading: true,
    }));

    try {
      // Kirim email
      const result = await sendEmail({
        ...formData,
        captchaToken: turnstileToken, // Gunakan turnstileToken dari Turnstile
      });

      // Tampilkan alert dari server
      alert(result.message);

      // Kalau sukses, reset form
      if (result.success) {
        setFormData({
          name: "",
          email: "",
          message: "",
          isSubmitted: true,
          isError: false,
          loading: false,
        });
      } else {
        setFormData((prevData) => ({
          ...prevData,
          loading: false,
        }));
      }
    } catch (error) {
      console.error("Gagal kirim:", error);
      alert(language === "ID" ? "Gagal mengirim pesan." : "Failed to send message.");

      setFormData((prevData) => ({
        ...prevData,
        loading: false,
      }));
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <header className="h-auto flex flex-col items-center justify-start bg-[#94DEFB] dark:bg-[#111827] py-32 relative">
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-[900px] flex items-center justify-center">
            {/* Gambar untuk mobile */}
            <motion.img
              src={artworkMobile}
              alt={language === "ID" ? "Artwork Flobamora Film Festival (ID)" : "Flobamora Film Festival Artwork (EN)"}
              className="w-full h-auto max-h-[500px] object-contain relative top-[-100px] sm:hidden"
              initial={{ opacity: 0, y: 50 }} // Mulai dari transparan dan turun 50px
              animate={{ opacity: 1, y: 0 }} // Muncul dan naik ke posisi normal
              transition={{ duration: 1, ease: "easeOut" }} // Efek selama 1 detik
            />
            {/* Gambar untuk desktop */}
            <motion.img
              src={artworkDesktop}
              alt={language === "ID" ? "Artwork Flobamora Film Festival (ID)" : "Flobamora Film Festival Artwork (EN)"}
              className="w-full h-auto max-h-[500px] object-contain relative top-[-100px] hidden sm:block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Button to Submit Film */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/submit-film"
            className="px-10 py-3 border rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white flex items-center gap-2 
    dark:border-transparent focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
          >
            {selectedText.submitfilm} <img src={right_arrow_white} alt="right arrow" className="w-4" />
          </Link>
        </motion.div>
      </header>

      <div className="border-t border-gray-300 dark:border-gray-700 my-0"></div>
      {/* About Festival Section */}
      <motion.section id="tentang-festival" className="w-full px-6 sm:px-12 lg:px-[8%] py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] dark:from-[#111827] dark:to-[#1f2937]">
        <motion.div className="flex flex-col lg:flex-row items-center lg:justify-center gap-6" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
          {/* Gambar */}
          <motion.div className="w-full flex justify-center lg:w-1/2 lg:justify-center">
            <img src={isDarkMode ? userImageDark : userImageLight} alt="Festival image" className="w-44 sm:w-56 md:w-64 lg:w-80 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl shadow-lg object-cover" />
          </motion.div>

          {/* Konten */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            {/* Judul */}
            <h4 className="text-lg sm:text-xl font-Outfit font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">{selectedText.aboutHeader}</h4>

            {/* Deskripsi */}
            <p className="mt-3 max-w-2xl font-Outfit text-gray-700 dark:text-gray-300 leading-relaxed text-justify">{selectedText.aboutFestival}</p>

            {/* Statistik Festival */}
            {/* Statistik Festival */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-gray-800 dark:text-gray-200">
              {(selectedText.statistics || []).map((stat, index) => (
                <div key={index} className="textsBeranda-center flex flex-col items-center">
                  <p className="text-3xl font-bold">{stat.number}</p>
                  <p className="text-sm max-w-[180px]">{stat.text}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-6 flex justify-center lg:justify-start">
              <Link to="/tentang">
                <button
                  className="px-6 sm:px-8 py-3 border rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white flex items-center gap-2 dark:border-transparent 
      focus:outline-none focus:ring-2 focus:ring-[#b820e6] shadow-md hover:opacity-90 active:scale-95 transition-all"
                >
                  {selectedText.learnMore}
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <div className="border-t border-gray-300 dark:border-gray-700 my-0"></div>
      <motion.section
        id="festival-sebelumnya"
        className="w-full px-6 sm:px-12 lg:px-[8%] py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#e9ecef] to-[#f8f9fa] dark:from-[#1f2937] dark:to-[#111827]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <h4 className="text-lg sm:text-xl font-Outfit font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">{language === "ID" ? "Festival Sebelumnya" : "Previous Festivals"}</h4>
          <p className="mt-3 max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed">
            {language === "ID" ? "Berikut adalah highlights dari Flobamora Film Festival tahun-tahun sebelumnya." : "Here are some highlights from previous editions of the Flobamora Film Festival."}
          </p>
        </div>

        {/* Daftar Tahun Festival Sebelumnya */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {previousFestivals.map((festival, index) => (
            <motion.div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col" whileHover={{ scale: 1.05 }}>
              <img src={festival.image} alt={`Flobamora Film Festival ${festival.year}`} className="w-full h-48 object-cover rounded-lg mb-4 transition-all duration-300 dark:brightness-75 dark:hover:brightness-100" />
              <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{`${selectedText.festivalName} ${festival.year}`}</h5>
              <p className="text-sm lg:text-xs font-normal text-gray-600 dark:text-gray-400 leading-tight mt-2">{festival.desc[language]}</p>

              {/* Teks "Baca Selengkapnya" sebagai Link */}
              <div className="mt-4">
                <Link to={`/tentang#festival-${festival.year}`} className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline">
                  {selectedText.readMore}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="border-t border-gray-300 dark:border-gray-700 my-0"></div>

      <section className="relative py-20 text-center bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
        {/* Sponsor Kami */}
        <div className="text-center">
          <h4 className="text-lg sm:text-xl font-Outfit font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide mb-4">{selectedText.sponsorsTitle}</h4>
          <p className="mt-3 max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{selectedText.sponsorsDescription}</p>
        </div>
        {/* Sponsor Utama */}
        {mainSponsors.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="flex flex-wrap justify-center gap-8">
                {mainSponsors.map((logo, index) => (
                  <div key={index} className="flex justify-center items-center transform transition-transform duration-300 hover:scale-105">
                    <img src={logo} alt={`Sponsor Utama ${index + 1}`} className="w-36 h-auto object-contain shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:shadow-gray-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="border-t border-gray-300 dark:border-gray-700 my-0"></div>

      {/* Bergabung dalam Festival */}
      <div className="w-full">
        <motion.section className="w-full py-16 bg-gray-50 dark:bg-gray-900 text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{selectedText.joinFestival}</h2>
          <p className="mt-4 text-lg w-full px-4 lg:px-0 lg:w-auto text-gray-700 dark:text-gray-300">{selectedText.joinDesc}</p>

          <ContactForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
        </motion.section>
      </div>
    </div>
  );
};

export default Beranda;
