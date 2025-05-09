// src/pages/umum/Jadwal.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Use custom hook
import textsSchedule from "../../texts/textsSchedule"; // ✅ Import teks multibahasa
import ScheduleSection from "@/components/ScheduleSection";

const Jadwal = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // ✅ Use the custom hook to get language

  // Ambil teks dari `textsSchedule.jsx` berdasarkan bahasa yang dipilih
  const textContent = textsSchedule[language];

  // Data untuk Bioskop Pasiar
  const bioskopPasiar = [
    {
      date: "2025-07-05",
      time: "19:00 - 21:00",
      title: "Bioskop Pasiar",
      route: "Lapangan Kota Kupang",
      location: "Kupang",
    },
    {
      date: "2025-07-12",
      time: "19:00 - 21:00",
      title: "Bioskop Pasiar",
      route: "Taman Nostalgia",
      location: "Kupang",
    },
    {
      date: "2025-07-19",
      time: "19:00 - 21:00",
      title: "Bioskop Pasiar",
      route: "Terminal Bolok",
      location: "Kupang",
    },
    {
      date: "2025-07-26",
      time: "19:00 - 21:00",
      title: "Bioskop Pasiar",
      route: "Pantai Lasiana",
      location: "Kupang",
    },
  ];

  // Data untuk Festival (5-9 Agustus 2025)
  const festivalEvents = [
    {
      date: "2025-08-05",
      time: "19:00 - 21:00",
      title: "Opening Ceremony",
      category: "-",
      location: "Main Hall",
    },
    {
      date: "2025-08-06",
      time: "10:00 - 12:00",
      title: "KFK Film Lab",
      category: "KFK Film Lab",
      location: "Room A",
    },
    {
      date: "2025-08-06",
      time: "14:00 - 16:00",
      title: language === "ID" ? "Bakumpul Komunitas" : "Community Gathering",
      category: "Bakumpul Komunitas",
      location: "Room B",
    },
    {
      date: "2025-08-06",
      time: "18:00 - 20:00",
      title: language === "ID" ? "Screening Kompetisi" : "Competition Screening",
      category: "Kompetisi",
      location: "Theater 1",
    },
    {
      date: "2025-08-07",
      time: "18:00 - 20:00",
      title: language === "ID" ? "Screening Non-Kompetisi" : "Non-Competition Screening",
      category: "Non-Kompetisi",
      location: "Theater 2",
    },
    {
      date: "2025-08-08",
      time: "10:00 - 12:00",
      title: "Baomong Film",
      category: "Baomong Film",
      location: "Discussion Room",
    },
    {
      date: "2025-08-09",
      time: "19:00 - 21:00",
      title: "Closing Ceremony",
      category: "-",
      location: "Main Hall",
    },
  ];

  // Mengelompokkan data berdasarkan tanggal
  const groupByDate = (events) =>
    events.reduce((acc, event) => {
      acc[event.date] = acc[event.date] || [];
      acc[event.date].push(event);
      return acc;
    }, {});

  const groupedBioskopPasiar = groupByDate(bioskopPasiar);
  const groupedFestivalEvents = groupByDate(festivalEvents);

  // Format Tanggal dan Waktu
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const newDate = new Date(date);
    return newDate.toLocaleDateString(language === "ID" ? "id-ID" : "en-US", options);
  };

  return (
    <div className="min-h-screen py-10 px-5 lg:px-20 dark:bg-gray-900 transition-all">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-Outfit font-bold text-gray-900 dark:text-white mb-6 text-center">{textContent.scheduleTitle}</h1>

      {/* Bioskop Pasiar Section */}
      <ScheduleSection title={textContent.bioskopPasiarTitle} groupedEvents={groupedBioskopPasiar} headers={textContent.headers} formatDate={formatDate} type="pasiar" />

      {/* Festival Section */}
      <ScheduleSection title={textContent.festivalTitle} groupedEvents={groupedFestivalEvents} headers={textContent.headers} formatDate={formatDate} type="festival" />
    </div>
  );
};

export default Jadwal;
