/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import right_arrow_white from "../../assets/right-arrow-white.png";
import userImageLight from "../../assets/user-image.png";
import userImageDark from "../../assets/user-image-dark.png";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { LanguageContext } from "../../context/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext";
import { loadSponsorLogos } from "../../utils/loadSponsorLogos";
import { sendEmail } from "../utils/sendEmail";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import.meta.env.VITE_RECAPTCHA_SITE_KEY;
import artworkId from "../../assets/artwork-id.png";
import artworkEn from "../../assets/artwork-en.png";
import artworkIdmobile from "../../assets/artwork-id-mobile.png";
import artworkEnmobile from "../../assets/artwork-en-mobile.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Objek teks sesuai bahasa
const text = {
  ID: {
    date: "5-9 Agustus 2025",
    aboutHeader: "Tentang Festival",
    festivalName: "Flobamora Film Festival",
    description:
      "Flobamora Film Festival adalah festival film pendek berskala nasional pertama di Nusa Tenggara Timur (NTT). Kami hadir untuk memberikan ruang bagi para pembuat film, khususnya sineas muda, agar dapat menampilkan karya terbaik mereka.",
    aboutFestival:
      "Flobamora Film Festival adalah festival film pendek berskala nasional pertama di Nusa Tenggara Timur (NTT). Festival ini berawal dari Parade Film NTT pada tahun 2021 dan pertama kali diadakan pada 27 hingga 30 Oktober 2023 oleh Komunitas Film Kupang (KFK). Sejak saat itu, Flobamora Film Festival menjadi acara tahunan. Sejak awal, Flobamora Film Festival berkomitmen untuk memberikan ruang apresiasi dan edukasi bagi sineas di NTT, sekaligus membangun jaringan nasional dan internasional di tingkat individu, komunitas, organisasi, dan festival.",
    festivalOverview: "Flobamora Film Festival telah menjangkau lebih dari 2.000 penonton...",
    learnMore: "Pelajari Selengkapnya",
    competition: "Kompetisi Film",
    competitionDesc: "Ajang bagi sineas muda untuk menunjukkan karya terbaik mereka.",
    workshop: "Workshop & Diskusi",
    workshopDesc: "Pelatihan intensif dan diskusi bersama praktisi industri film.",
    network: "Jaringan & Kolaborasi",
    networkDesc: "Membangun koneksi dengan sineas lokal dan nasional.",
    targetTitle: "Target Festival",
    shortFilms: "Menampilkan 60+ film pendek dari berbagai pembuat film.",
    audience: "Lebih dari 2.000 penonton dari berbagai usia menghadiri festival.",
    filmPractitioners: "Bekerja sama dengan lebih dari 100 praktisi film lokal, nasional, dan internasional.",
    title: "Sponsor Kami",
    current: "Sponsor Saat Ini",
    past: "Sponsor Sebelumnya",
    noCurrent: "Belum ada sponsor saat ini",
    noPast: "Belum ada sponsor sebelumnya",
    partnerships: "Bermitra dengan 50+ komunitas & industri film.",
    sponsors: "Kolaborasi & Sponsor",
    joinFestival: "Bergabung dalam Festival",
    joinDesc: "Mari menjadi bagian dari perjalanan Flobamora Film Festival sebagai sponsor, mitra, atau komunitas pendukung.",
    namePlaceholder: "Nama Anda",
    emailPlaceholder: "Email Anda",
    messagePlaceholder: "Pesan Anda",
    buttonText: "Kirim Pesan",
  },
  EN: {
    date: "5-9 August 2025",
    aboutHeader: "About the Festival",
    festivalName: "Flobamora Film Festival",
    description: "Flobamora Film Festival is the first national-scale short film festival in East Nusa Tenggara (NTT). We provide a space for filmmakers, especially young directors, to showcase their best works.",
    aboutFestival:
      "The Flobamora Film Festival is the first national-scale short film festival in East Nusa Tenggara (NTT). This festival originated from the NTT Film Parade in 2021 and was first held from October 27 to 30, 2023, by the Kupang Film Community (KFK). Since then, the Flobamora Film Festival has become an annual event. From the beginning, the Flobamora Film Festival has been committed to providing a space for film appreciation and education in NTT while also fostering national and international networks across individual, community, organizational, and festival levels.",
    festivalOverview: "Flobamora Film Festival has reached over 2,000 audiences...",
    learnMore: "Learn More",
    competition: "Film Competition",
    competitionDesc: "A platform for young filmmakers to showcase their best work.",
    workshop: "Workshops & Discussions",
    workshopDesc: "Intensive training and discussions with film industry professionals.",
    network: "Networking & Collaboration",
    networkDesc: "Build connections with local and national filmmakers.",
    targetTitle: "Festival Targets",
    shortFilms: "Showcasing 60+ short films from various filmmakers.",
    audience: "More than 2,000 audiences of all ages attended the festival.",
    filmPractitioners: "Collaborating with over 100 local, national, and international film practitioners.",
    title: "Our Sponsors",
    current: "Current Sponsors",
    past: "Previous Sponsors",
    noCurrent: "No current sponsors",
    noPast: "No previous sponsors",
    partnerships: "Partnering with 50+ film communities & industries.",
    sponsors: "Collaboration & Sponsors",
    joinFestival: "Join the Festival",
    joinDesc: "Be part of the Flobamora Film Festival journey as a sponsor, partner, or supporting community.",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    messagePlaceholder: "Your Message",
    buttonText: "Send Message",
  },

  statistics: {
    ID: [
      {
        number: "2,000+",
        text: "Penonton dari berbagai usia hadir dalam festival.",
      },
      { number: "60+", text: "Film pendek ditayangkan selama festival." },
      { number: "100+", text: "Praktisi film berpartisipasi dalam festival." },
      { number: "50+", text: "Kolaborasi dengan komunitas film & industri." },
    ],
    EN: [
      {
        number: "2,000+",
        text: "Audiences from various backgrounds attended the festival.",
      },
      { number: "60+", text: "Short films were screened during the festival." },
      { number: "100+", text: "Film industry professionals participated." },
      { number: "50+", text: "Partnering with film communities & industries." },
    ],
  },
};
const previousFestivals = [
  {
    year: "2024",
    image: "/assets/festival-2024.jpg",
    desc: {
      ID: "Festival tahun 2024 menampilkan lebih dari 50 film pendek dan dihadiri oleh lebih dari 1.500 penonton.",
      EN: "The 2024 festival showcased over 50 short films and welcomed more than 1,500 attendees.",
    },
  },
  {
    year: "2023",
    image: "/assets/festival-2023.jpg",
    desc: {
      ID: "Edisi pertama Flobamora Film Festival diadakan pada 27-30 Oktober 2023 dengan berbagai program menarik.",
      EN: "The first edition of the Flobamora Film Festival was held on October 27-30, 2023, featuring various exciting programs.",
    },
  },
  {
    year: "2022",
    image: "/assets/festival-2022.jpg",
    desc: {
      ID: "Flobamora Film Festival 2022 menghadirkan berbagai film dari sineas NTT dan program edukatif.",
      EN: "Flobamora Film Festival 2022 featured various films from NTT filmmakers and educational programs.",
    },
  },
  {
    year: "2021",
    image: "/assets/parade-film-ntt-2021.jpg",
    desc: {
      ID: "Parade Film NTT 2021 menjadi cikal bakal Flobamora Film Festival dengan pemutaran film lokal.",
      EN: "The NTT Film Parade 2021 laid the foundation for the Flobamora Film Festival with local film screenings.",
    },
  },
];

const mainSponsors = ["/assets/sponsors/KFK.png"];
const supportingSponsors = [];

const Beranda = () => {
  const { language: langContext } = useContext(LanguageContext);
  const language = langContext === "EN" ? "EN" : "ID";
  const selectedText = text[language];

  const { isDarkMode } = useContext(ThemeContext);

  const artworkMobile = language === "ID" ? artworkIdmobile : artworkEnmobile;
  const artworkDesktop = language === "ID" ? artworkId : artworkEn;

  const sponsorLogos = loadSponsorLogos();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Menyimpan token dari reCAPTCHA
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message || !/\S+@\S+\.\S+/.test(email)) {
      setIsError(true);
      return;
    }

    // Reset error dan loading
    setIsError(false);
    setLoading(true);

    try {
      // Dapatkan token dari reCAPTCHA
      const token = await grecaptcha.execute("YOUR_SITE_KEY", { action: "submit" });

      // Verifikasi token ke backend
      const verifyRes = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        alert(language === "ID" ? "Verifikasi reCAPTCHA gagal." : "reCAPTCHA verification failed.");
        setLoading(false);
        return;
      }

      // Jika lolos reCAPTCHA, kirim email
      const sendRes = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          lang: language,
        }),
      });

      const responseMessage = await sendRes.text();

      alert(responseMessage);

      if (sendRes.ok) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Gagal kirim:", error);
      alert(language === "ID" ? "Gagal mengirim pesan." : "Failed to send message.");
    } finally {
      setLoading(false);
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
              alt="Artwork"
              className="w-full h-auto max-h-[500px] object-contain relative top-[-100px] hidden sm:block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/submit-film"
            className="px-10 py-3 border rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white flex items-center gap-2 
    dark:border-transparent focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
          >
            Submit Film <img src={right_arrow_white} alt="right arrow" className="w-4" />
          </Link>
        </motion.div>
      </header>

      {/* About Festival Section */}
      <div className="border-t border-gray-300 dark:border-gray-700 my-0"></div>

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
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-gray-800 dark:text-gray-200">
              {(text.statistics[language] || []).map((stat, index) => (
                <div key={index} className="text-center flex flex-col items-center">
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
              <img
                src={festival.image}
                alt={`Flobamora Film Festival ${festival.year}`}
                className="w-full h-48 object-cover rounded-lg mb-4 transition-all duration-300 
                     dark:brightness-75 dark:hover:brightness-100"
              />
              <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{`Flobamora Film Festival ${festival.year}`}</h5>
              <p className="text-sm lg:text-xs font-normal text-gray-600 dark:text-gray-400 leading-tight mt-2">{festival.desc[language]}</p>

              {/* Teks "Baca Selengkapnya" sebagai Link */}
              <div className="mt-4">
                <Link to={`/tentang#festival-${festival.year}`} className="text-sm font-medium text-red-600 dark:text-red-400 hover:underline">
                  {language === "ID" ? "Baca Selengkapnya →" : "Read More →"}
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
          <h4 className="text-lg sm:text-xl font-Outfit font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide mb-4">{language === "ID" ? "Sponsor Kami" : "Our Sponsors"}</h4>
          <p className="mt-3 max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            {language === "ID" ? "Kami berterima kasih kepada para sponsor yang telah mendukung Flobamora Film Festival." : "We are grateful to the sponsors who have supported the Flobamora Film Festival."}
          </p>
        </div>

        {/* Logo Sponsor */}
        <div className="mt-12 w-full max-w-6xl mx-auto">
          {/* Sponsor Utama */}
          {mainSponsors.length > 0 && (
            <>
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
            </>
          )}

          {/* Sponsor Pendukung */}
          {supportingSponsors.length > 0 && (
            <>
              <div className="mb-12">
                <div className="flex justify-center">
                  <div className="flex flex-wrap justify-center gap-6">
                    {supportingSponsors.map((logo, index) => (
                      <div key={index} className="flex justify-center items-center transform transition-transform duration-300 hover:scale-105">
                        <img src={logo} alt={`Sponsor Pendukung ${index + 1}`} className="w-28 h-auto object-contain shadow hover:shadow-md transition-shadow duration-300 dark:shadow-gray-800" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Jika tidak ada sponsor sama sekali */}
          {mainSponsors.length === 0 && supportingSponsors.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 mt-8">Tidak ada sponsor saat ini.</p>}
        </div>
      </section>

      <div className="border-t border-gray-300 dark:border-gray-700 my-0"></div>

      {/* Bergabung dalam Festival*/}
      <div className="w-full">
        <motion.section className="w-full py-16 bg-gray-50 dark:bg-gray-900 text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{selectedText.joinFestival}</h2>
          <p className="mt-4 text-lg w-full px-4 lg:px-0 lg:w-auto text-gray-700 dark:text-gray-300">{selectedText.joinDesc}</p>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div key="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="mt-4 text-lg text-green-500">
                {selectedText.thankYouMessage}
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="mt-8 w-full px-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    placeholder={selectedText.namePlaceholder}
                    aria-label="Your Name"
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="email"
                    placeholder={selectedText.emailPlaceholder}
                    aria-label="Your Email"
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <textarea
                    placeholder={selectedText.messagePlaceholder}
                    rows="4"
                    aria-label="Your Message"
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>

                  {isError && <div className="text-red-500 text-sm">{selectedText.errorMessage}</div>}

                  {/* Google reCAPTCHA */}
                  <div className="my-2">
                    <GoogleReCaptcha onVerify={handleCaptchaChange} />
                  </div>

                  <button type="submit" className="w-full sm:w-auto px-6 py-3 border rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white mt-4 hover:opacity-90 focus:ring-2 focus:ring-[#b820e6]" disabled={loading}>
                    {loading ? (language === "ID" ? "Mengirim..." : "Sending...") : selectedText.buttonText}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.section>
      </div>
    </div>
  );
};

export default Beranda;
