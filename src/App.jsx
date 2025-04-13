import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageProvider";
import { ThemeProvider } from "./context/ThemeProvider";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

// Halaman Utama
import Beranda from "./pages/Beranda";
import Jadwal from "./pages/Jadwal";
import Tiket from "./pages/Tiket";
import Venue from "./pages/Venue";
import Katalog from "./pages/Katalog";

// Program
import BioskopPasiar from "./pages/BioskopPasiar";
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

// Halaman Prafestival
import SubmitFilm from "./pages/pra-festival/SubmitFilm";
import FormKompetisiPelajar from "./pages/pra-festival/FormKompetisiPelajar";
import FormKompetisiNTT from "./pages/pra-festival/FormKompetisiNTT";
import FormLayarNusantara from "./pages/pra-festival/FormLayarNusantara";
import FormKfkFilmLab from "./pages/pra-festival/FormKfkFilmLab";

// Halaman lainnya
import Media from "./pages/Media";
import Tentang from "./pages/Tentang";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRoute from "./routes/AdminRoute"; // kalau kamu pakai private route

// 404
import NotFound from "./pages/NotFound";

import "./index.css";

const App = () => {
  return (
    <Router>
      <React.StrictMode>
        <LanguageProvider>
          <ThemeProvider>
            <Navbar />
            <Routes>
              {/* Halaman Utama */}
              <Route path="/" element={<Beranda />} />
              <Route path="/jadwal" element={<Jadwal />} />
              <Route path="/tiket" element={<Tiket />} />
              <Route path="/venue" element={<Venue />} />
              <Route path="/katalog" element={<Katalog />} />

              {/* Program Pemutaran */}
              <Route path="/bioskop-pasiar" element={<BioskopPasiar />} />

              {/* Kompetisi */}
              <Route path="/kompetisi" element={<Kompetisi />} />
              <Route path="/kompetisi-film-ntt" element={<LayarKompetisiFilmNTT />} />
              <Route path="/kompetisi-film-pelajar-ntt" element={<LayarKompetisiFilmPelajarNTT />} />

              {/* Non-Kompetisi */}
              <Route path="/non-kompetisi" element={<NonKompetisi />} />
              <Route path="/layar-nusantara" element={<LayarNusantara />} />
              <Route path="/layar-internasional" element={<LayarInternasional />} />

              {/* Forum & Workshop */}
              <Route path="/kfk-film-lab" element={<KFKFilmLab />} />
              <Route path="/bakumpul-komunitas" element={<BakumpulKomunitas />} />
              <Route path="/baomong-film" element={<BaomongFilm />} />

              {/* Halaman Prafestival */}
              <Route path="/submit-film" element={<SubmitFilm />} />
              <Route path="/submit/kompetisi-pelajar" element={<SubmitFilm />} />
              <Route path="/submit/kompetisi-ntt" element={<SubmitFilm />} />
              <Route path="/submit/layar-nusantara" element={<SubmitFilm />} />
              <Route path="/submit/kfk-film-lab" element={<SubmitFilm />} />

              <Route path="/submit/form-kompetisi-pelajar-2025" element={<FormKompetisiPelajar />} />
              <Route path="/submit/form-kompetisi-ntt-2025" element={<FormKompetisiNTT />} />
              <Route path="/submit/form-layar-nusantara-2025" element={<FormLayarNusantara />} />
              <Route path="/submit/form-kfk-film-lab-2025" element={<FormKfkFilmLab />} />

              {/* Halaman Lainnya */}
              <Route path="/tentang" component={Tentang} />
              <Route path="/media" element={<Media />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
            <BackToTop />
          </ThemeProvider>
        </LanguageProvider>
      </React.StrictMode>
    </Router>
  );
};

export default App;
