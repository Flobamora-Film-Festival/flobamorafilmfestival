import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <Router basename="/">
        <Suspense fallback={<div>Loading... Please wait...</div>}>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/jadwal" element={<Jadwal />} />
            <Route path="/tiket" element={<Tiket />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/katalog" element={<Katalog />} />
            <Route path="/bioskop-pasiar" element={<BioskopPasiar />} />
            <Route path="/kompetisi" element={<Kompetisi />} />
            <Route path="/kompetisi-film-ntt" element={<LayarKompetisiFilmNTT />} />
            <Route path="/kompetisi-film-pelajar-ntt" element={<LayarKompetisiFilmPelajarNTT />} />
            <Route path="/non-kompetisi" element={<NonKompetisi />} />
            <Route path="/layar-nusantara" element={<LayarNusantara />} />
            <Route path="/layar-internasional" element={<LayarInternasional />} />
            <Route path="/kfk-film-lab" element={<KFKFilmLab />} />
            <Route path="/bakumpul-komunitas" element={<BakumpulKomunitas />} />
            <Route path="/baomong-film" element={<BaomongFilm />} />
            <Route path="/submit-film" element={<SubmitFilm />} />
            <Route path="/submit/kompetisi-pelajar" element={<SubmitFilm />} />
            <Route path="/submit/kompetisi-ntt" element={<SubmitFilm />} />
            <Route path="/submit/layar-nusantara" element={<SubmitFilm />} />
            <Route path="/submit/kfk-film-lab" element={<SubmitFilm />} />
            <Route path="/submit/form-kompetisi-pelajar-2025" element={<FormKompetisiPelajar />} />
            <Route path="/submit/form-kompetisi-ntt-2025" element={<FormKompetisiNTT />} />
            <Route path="/submit/form-layar-nusantara-2025" element={<FormLayarNusantara />} />
            <Route path="/submit/form-kfk-film-lab-2025" element={<FormKfkFilmLab />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="/media" element={<Media />} />
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
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <BackToTop />
        </Suspense>
      </Router>
    </GoogleReCaptchaProvider>
  );
};

export default App;
