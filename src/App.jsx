import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import ScrollToTop from "./ScrollToTop";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

// Halaman Utama
import Beranda from "./pages/umum/Beranda";
import Jadwal from "./pages/umum/Jadwal";
import Tiket from "./pages/umum/Tiket";
import Venue from "./pages/umum/Venue";
import Katalog from "./pages/umum/Katalog";

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

// Halaman Prafestival
import SubmitFilm from "./pages/pra-festival/SubmitFilm";
import FormKompetisiPelajar from "./pages/pra-festival/FormKompetisiPelajar";
import FormKompetisiNTT from "./pages/pra-festival/FormKompetisiNTT";
import FormLayarNusantara from "./pages/pra-festival/FormLayarNusantara";
import FormKfkFilmLab from "./pages/pra-festival/FormKfkFilmLab";

// Halaman lainnya
import Media from "./pages/media/Media";
import Tentang from "./pages/umum/Tentang";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";

// Auth Routes
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard from "./pages/user/UserDashboard";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

// 404
import NotFound from "./pages/umum/NotFound";

import "./index.css";

const App = () => {
  return (
    <Router>
      <React.StrictMode>
        <LanguageProvider>
          <ThemeProvider>
            <Navbar />
            <ScrollToTop />
            <Routes>
              {/* Halaman Utama */}
              <Route path="/" element={<Beranda />} />
              <Route path="/jadwal" element={<Jadwal />} />
              <Route path="/tiket" element={<Tiket />} />
              <Route path="/venue" element={<Venue />} />
              <Route path="/katalog" element={<Katalog />} />

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

              {/* Lainnya */}
              <Route path="/tentang" element={<Tentang />} />
              <Route path="/media" element={<Media />} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />

              {/* Admin (hanya untuk user login dengan role admin) */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />

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
