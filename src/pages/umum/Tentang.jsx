import React, { useEffect } from "react";
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Correct path for the custom hook
import { Helmet } from "react-helmet-async";

const Tentang = () => {
  const { language } = useLanguage(); // ✅ Use custom hook instead of context

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <div className="px-10 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-10 max-w-7xl mx-auto space-y-12">
      <Helmet>
        <title>{language === "ID" ? "Tentang" : "About"} | Flobamora Film Festival</title>
        <meta name="description" content="Flobamora Film Festival adalah festival film pendek nasional di NTT." />
      </Helmet>

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-Outfit font-bold text-gray-800 dark:text-gray-200 tracking-wide">{language === "ID" ? "Tentang Flobamora Film Festival" : "About Flobamora Film Festival"}</h1>

      <section className="space-y-2">
        <h2 className="text-lg sm:text-xl font-semibold">{language === "ID" ? "Apa Itu Flobamora Film Festival?" : "What is Flobamora Film Festival?"}</h2>
        <p className="leading-relaxed">
          {language === "ID"
            ? "Flobamora Film Festival adalah festival film pendek berskala nasional pertama di Nusa Tenggara Timur (NTT), Indonesia. Festival ini lahir dari Parade Film NTT yang diinisiasi oleh Komunitas Film Kupang (KFK) sejak tahun 2021, dan pertama kali digelar dengan nama Flobamora Film Festival pada 27–30 Oktober 2023."
            : "Flobamora Film Festival is the first national-scale short film festival based in East Nusa Tenggara (NTT), Indonesia. It grew from the Parade Film NTT, initiated by Komunitas Film Kupang (KFK) in 2021, and officially became Flobamora Film Festival in 2023."}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg sm:text-xl font-semibold">{language === "ID" ? "Edisi Terbaru" : "Upcoming Edition"}</h2>
        <p>
          <strong>🗓️ 5–9 {language === "ID" ? "Agustus" : "August"} 2025</strong>
          <br />
          Kupang & {language === "ID" ? "sekitarnya" : "surrounding areas"}
        </p>
        <p className="leading-relaxed">
          <strong>{language === "ID" ? "Tema 2025: Kalunga" : "Theme 2025: Kalunga"}</strong>
          <br />
          {language === "ID"
            ? '"Kalunga" adalah istilah dalam Bahasa Sumba Timur yang merujuk pada pertumbuhan tanaman, khususnya tanaman pangan seperti padi dan jagung. Tema ini dipilih untuk merepresentasikan pertumbuhan kolektif — baik dalam sinema, komunitas, maupun kehidupan masyarakat NTT secara umum.'
            : "“Kalunga” is a word from East Sumba language, referring to the growth of plants, particularly staple crops like rice and corn. The theme reflects the collective growth of cinema, community, and society in NTT."}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg sm:text-xl font-semibold">{language === "ID" ? "Visi Festival" : "Festival Vision"}</h2>
        <ul className="list-disc list-inside space-y-1 leading-relaxed">
          <li>{language === "ID" ? "Mendorong budaya menonton dan apresiasi film yang inklusif." : "Foster a culture of watching and appreciating films inclusively."}</li>
          <li>{language === "ID" ? "Mengembangkan penonton yang kritis dan terbuka terhadap keragaman sinema." : "Build a critical audience open to diverse cinematic expressions."}</li>
          <li>{language === "ID" ? "Mendorong kreativitas pembuat film muda di wilayah Timur Indonesia." : "Support young filmmakers from Eastern Indonesia to grow and flourish."}</li>
          <li>{language === "ID" ? "Menjadikan festival ini sebagai ruang bertemu dan berbagi lintas komunitas film." : "Create a collaborative space for film communities to meet and connect."}</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg sm:text-xl font-semibold">{language === "ID" ? "Sejarah Festival" : "Festival Timeline"}</h2>
        <div className="overflow-x-auto mt-2">
          <table className="table-auto w-full border text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border px-2 py-1">{language === "ID" ? "Tahun" : "Year"}</th>
                <th className="border px-2 py-1">{language === "ID" ? "Judul Festival" : "Festival Title"}</th>
                <th className="border px-2 py-1">{language === "ID" ? "Sorotan" : "Highlights"}</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  year: "2025",
                  title: "Flobamora Film Festival 2025",
                  img: "/assets/festival-2024.jpg",
                  highlight: language === "ID" ? "Tema Kalunga. Ekspansi program ke berbagai kota dan komunitas." : "Theme: Kalunga. Program expansion to various cities and communities.",
                  id: "festival-2025",
                },
                {
                  year: "2024",
                  title: "Flobamora Film Festival 2024",
                  img: "/assets/festival-2024.jpg",
                  highlight: language === "ID" ? "Tema Gemohing. Hadir dengan lebih dari 50 film dan 1500+ penonton." : "Theme: Gemohing. Showcased 50+ short films and welcomed 1500+ attendees.",
                  id: "festival-2024",
                },
                {
                  year: "2023",
                  title: "Flobamora Film Festival 2023",
                  img: "/assets/festival-2023.jpg",
                  highlight: language === "ID" ? "Tema Konektivitas. Resmi memakai nama FFF, menampilkan kompetisi dan layar non-kompetisi." : "Theme: Connectivity. First edition under official name, featuring competitions.",
                  id: "festival-2023",
                },
                {
                  year: "2022",
                  title: "Flobamora Film Festival 2022",
                  img: "/assets/festival-2022.jpg",
                  highlight: language === "ID" ? "Tema Harmoni. Fokus pada kolaborasi dan pemutaran lintas desa & sekolah." : "Theme: Harmony. Collaborative screenings across villages and schools.",
                  id: "festival-2022",
                },
                {
                  year: "2021",
                  title: "Parade Film NTT",
                  img: "/assets/parade-film-ntt-2021.jpg",
                  highlight: language === "ID" ? "Tema Sokong. Program pemutaran perdana hasil kolaborasi komunitas film NTT." : "Theme: Sokong. Premiere screenings initiated by local film communities in NTT.",
                  id: "festival-2021", // Menambahkan ID unik untuk setiap festival
                },
              ].map((item) => (
                <tr key={item.year} id={item.id}>
                  {/* Menambahkan ID di setiap baris */}
                  <td className="border px-2 py-1 align-top font-medium">{item.year}</td>
                  <td className="border px-2 py-1 align-top">{item.title}</td>
                  <td className="border px-2 py-1 align-top max-w-md">
                    <img src={item.img} alt={item.title} className="w-full max-w-[300px] sm:max-w-sm mb-2 rounded-lg shadow-md" />
                    {item.highlight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg sm:text-xl font-semibold">{language === "ID" ? "Penggagas & Pendukung" : "Founder & Supporters"}</h2>
        <p className="leading-relaxed">
          {language === "ID"
            ? "Festival ini diinisiasi oleh Komunitas Film Kupang (KFK), dan didukung oleh berbagai komunitas film lokal, nasional, serta mitra kultural yang percaya pada kekuatan sinema untuk membangun koneksi antarwilayah."
            : "The festival was initiated by Komunitas Film Kupang (KFK), with support from local, national, and international film communities and cultural partners who believe in the power of cinema to build connections across regions."}
        </p>
      </section>
    </div>
  );
};

export default Tentang;
