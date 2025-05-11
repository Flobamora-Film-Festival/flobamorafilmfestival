import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import LanguageToggle from "./components/LanguageToggle";
import ThemeToggle from "./components/ThemeToggle";

// Halaman Umum
import Beranda from "./pages/umum/Beranda";
import Jadwal from "./pages/umum/Jadwal";
import Tiket from "./pages/umum/Tiket";
import Venue from "./pages/umum/Venue";
import Katalog from "./pages/umum/Katalog";
import Tentang from "./pages/umum/Tentang";
import NotFound from "./pages/umum/NotFound";

// Program
import BioskopPasiar from "./pages/bioskop-pasiar/BioskopPasiar";
import Kompetisi from "./pages/kompetisi/Kompetisi";
import LayarKompetisiFilmNTT from "./pages/kompetisi/LayarKompetisiFilmNTT";
import LayarKompetisiFilmPelajarNTT from "./pages/kompetisi/LayarKompetisiFilmPelajarNTT";
import NonKompetisi from "./pages/non-kompetisi/NonKompetisi";
import LayarNusantara from "./pages/non-kompetisi/LayarNusantara";
import LayarInternasional from "./pages/non-kompetisi/LayarInternasional";

// Forum & Workshop
import KFKFilmLab from "./pages/forum-workshop/KFKFilmLab";
import BakumpulKomunitas from "./pages/forum-workshop/BakumpulKomunitas";
import BaomongFilm from "./pages/forum-workshop/BaomongFilm";

// Prafestival
import SubmitFilm from "./pages/pra-festival/SubmitFilm";
import FormKompetisiPelajar from "./pages/pra-festival/FormKompetisiPelajar";
import FormKompetisiNTT from "./pages/pra-festival/FormKompetisiNTT";
import FormLayarNusantara from "./pages/pra-festival/FormLayarNusantara";
import FormKfkFilmLab from "./pages/pra-festival/FormKfkFilmLab";

// Media
import Media from "./pages/media/Media";

// News
import NewsPage from "./pages/news/NewsPage";
import NewsDetailPage from "./pages/news/NewsDetailPage";

// Users
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Komponen Wordpress
import Posts from "./components/Posts";

const App = () => {
  const location = useLocation();

  // Cek apakah halaman yang diakses adalah halaman login atau register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <ScrollToTop />

      {isAuthPage ? (
        <>
          <div className="fixed top-4 right-4 z-50 flex gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <Routes>
            {/* user */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/jadwal" element={<Jadwal />} />
            <Route path="/tiket" element={<Tiket />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/katalog" element={<Katalog />} />
            <Route path="/tentang" element={<Tentang />} />

            {/* Program */}
            <Route path="/bioskop-pasiar" element={<BioskopPasiar />} />
            <Route path="/kompetisi" element={<Kompetisi />} />
            <Route path="/kompetisi-film-ntt" element={<LayarKompetisiFilmNTT />} />
            <Route path="/kompetisi-film-pelajar-ntt" element={<LayarKompetisiFilmPelajarNTT />} />
            <Route path="/non-kompetisi" element={<NonKompetisi />} />
            <Route path="/layar-nusantara" element={<LayarNusantara />} />
            <Route path="/layar-internasional" element={<LayarInternasional />} />

            {/* Forum & Workshop */}
            <Route path="/kfk-film-lab" element={<KFKFilmLab />} />
            <Route path="/bakumpul-komunitas" element={<BakumpulKomunitas />} />
            <Route path="/baomong-film" element={<BaomongFilm />} />

            {/* Prafestival */}
            <Route path="/submit-film" element={<SubmitFilm />} />
            <Route path="/submit/kompetisi-pelajar" element={<SubmitFilm />} />
            <Route path="/submit/kompetisi-ntt" element={<SubmitFilm />} />
            <Route path="/submit/layar-nusantara" element={<SubmitFilm />} />
            <Route path="/submit/kfk-film-lab" element={<SubmitFilm />} />
            <Route path="/submit/form-kompetisi-pelajar-2025" element={<FormKompetisiPelajar />} />
            <Route path="/submit/form-kompetisi-ntt-2025" element={<FormKompetisiNTT />} />
            <Route path="/submit/form-layar-nusantara-2025" element={<FormLayarNusantara />} />
            <Route path="/submit/form-kfk-film-lab-2025" element={<FormKfkFilmLab />} />

            {/* Media */}
            <Route path="/media" element={<Media />} />

            {/* News */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />

            {/* WordPress Posts */}
            <Route path="/posts" element={<Posts />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
};

export default App;
