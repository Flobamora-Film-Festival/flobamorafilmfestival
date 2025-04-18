import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import ScrollToTop from "./ScrollToTop";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// Halaman Utama
const Beranda = lazy(() => import("./pages/umum/Beranda"));
const Jadwal = lazy(() => import("./pages/umum/Jadwal"));
const Tiket = lazy(() => import("./pages/umum/Tiket"));
const Venue = lazy(() => import("./pages/umum/Venue"));
const Katalog = lazy(() => import("./pages/umum/Katalog"));

// Program
const BioskopPasiar = lazy(() => import("./pages/bioskop-pasiar/BioskopPasiar"));
const Kompetisi = lazy(() => import("./pages/kompetisi/Kompetisi"));
const LayarKompetisiFilmNTT = lazy(() => import("./pages/kompetisi/LayarKompetisiFilmNTT"));
const LayarKompetisiFilmPelajarNTT = lazy(() => import("./pages/kompetisi/LayarKompetisiFilmPelajarNTT"));
const NonKompetisi = lazy(() => import("./pages/non-kompetisi/NonKompetisi"));
const LayarNusantara = lazy(() => import("./pages/non-kompetisi/LayarNusantara"));
const LayarInternasional = lazy(() => import("./pages/non-kompetisi/LayarInternasional"));

// Forum & Workshop
const KFKFilmLab = lazy(() => import("./pages/forum-workshop/KFKFilmLab"));
const BakumpulKomunitas = lazy(() => import("./pages/forum-workshop/BakumpulKomunitas"));
const BaomongFilm = lazy(() => import("./pages/forum-workshop/BaomongFilm"));

// Halaman Prafestival
const SubmitFilm = lazy(() => import("./pages/pra-festival/SubmitFilm"));
const FormKompetisiPelajar = lazy(() => import("./pages/pra-festival/FormKompetisiPelajar"));
const FormKompetisiNTT = lazy(() => import("./pages/pra-festival/FormKompetisiNTT"));
const FormLayarNusantara = lazy(() => import("./pages/pra-festival/FormLayarNusantara"));
const FormKfkFilmLab = lazy(() => import("./pages/pra-festival/FormKfkFilmLab"));

// Halaman lainnya
const Media = lazy(() => import("./pages/media/Media"));
const Tentang = lazy(() => import("./pages/umum/Tentang"));

// Admin
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));

// Auth Routes
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

// 404
const NotFound = lazy(() => import("./pages/umum/NotFound"));

import "./index.css";

const App = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </Router>
    </GoogleReCaptchaProvider>
  );
};

export default App;
