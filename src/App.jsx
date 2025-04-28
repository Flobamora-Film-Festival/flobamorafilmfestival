import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// Import komponen aplikasi
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import PrivateRoute from "./components/PrivateRoute"; // Pastikan komponen ini ada
import AdminRoute from "./routes/AdminRoute";

// Halaman umum
import Beranda from "./pages/umum/Beranda";
import Katalog from "./pages/umum/Katalog";
import NotFound from "./pages/umum/NotFound";
import ContactForm from "./pages/umum/Contact";

// Halaman untuk kompetisi, forum, dan lainnya
import Kompetisi from "./pages/kompetisi/Kompetisi";
import LayarKompetisiFilmNTT from "./pages/kompetisi/LayarKompetisiFilmNTT";
import LayarKompetisiFilmPelajarNTT from "./pages/kompetisi/LayarKompetisiFilmPelajarNTT";
import NonKompetisi from "./pages/non-kompetisi/NonKompetisi";
import LayarNusantara from "./pages/non-kompetisi/LayarNusantara";
import LayarInternasional from "./pages/non-kompetisi/LayarInternasional";

// Halaman untuk form
import FormKompetisiPelajar from "./pages/pra-festival/FormKompetisiPelajar";
import FormKompetisiNTT from "./pages/pra-festival/FormKompetisiNTT";
import FormLayarNusantara from "./pages/pra-festival/FormLayarNusantara";
import FormKfkFilmLab from "./pages/pra-festival/FormKfkFilmLab";
import SubmitFilm from "./pages/pra-festival/SubmitFilm";

// Halaman user dan admin
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Komponen lainnya
import Jadwal from "./pages/umum/Jadwal";
import Tiket from "./pages/umum/Tiket";
import Venue from "./pages/umum/Venue";
import BioskopPasiar from "./pages/bioskop-pasiar/BioskopPasiar";
import Media from "./pages/media/Media";
import Tentang from "./pages/umum/Tentang";

// Komponen lainnya yang mungkin ada
import BakumpulKomunitas from "./pages/forum-workshop/BakumpulKomunitas";
import BaomongFilm from "./pages/forum-workshop/BaomongFilm";
import KFKFilmLab from "./pages/forum-workshop/KFKFilmLab";

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="YOUR_RECAPTCHA_KEY">
      <Router>
        <Navbar />
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Halaman umum */}
            <Route path="/" element={<Beranda />} />
            <Route path="/katalog" element={<Katalog />} />
            <Route path="/kontak" element={<ContactForm />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="/jadwal" element={<Jadwal />} />
            <Route path="/tiket" element={<Tiket />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/media" element={<Media />} />

            {/* Halaman kompetisi */}
            <Route path="/kompetisi" element={<Kompetisi />} />
            <Route path="/layar-kompetisi-film-ntt" element={<LayarKompetisiFilmNTT />} />
            <Route path="/layar-kompetisi-film-pelajar-ntt" element={<LayarKompetisiFilmPelajarNTT />} />
            <Route path="/non-kompetisi" element={<NonKompetisi />} />
            <Route path="/layar-nusantara" element={<LayarNusantara />} />
            <Route path="/layar-internasional" element={<LayarInternasional />} />

            {/* Halaman form */}
            <Route path="/form-kompetisi-pelajar" element={<FormKompetisiPelajar />} />
            <Route path="/form-kompetisi-ntt" element={<FormKompetisiNTT />} />
            <Route path="/form-layar-nusantara" element={<FormLayarNusantara />} />
            <Route path="/form-kfk-film-lab" element={<FormKfkFilmLab />} />
            <Route path="/submit-film" element={<SubmitFilm />} />

            {/* Forum dan komunitas */}
            <Route path="/bakumpul-komunitas" element={<BakumpulKomunitas />} />
            <Route path="/baomong-film" element={<BaomongFilm />} />
            <Route path="/kfk-film-lab" element={<KFKFilmLab />} />

            {/* Admin route */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            {/* User route */}
            <Route element={<PrivateRoute />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
            </Route>

            {/* Halaman auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Halaman tidak ditemukan */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <BackToTop />
      </Router>
    </GoogleReCaptchaProvider>
  );
}

export default App;
