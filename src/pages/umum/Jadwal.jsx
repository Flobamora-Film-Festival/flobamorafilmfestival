import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider";
import textsSchedule from "../../texts/textsSchedule";
import ScheduleSection from "@/components/ScheduleSection";

const Jadwal = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage();
  const textContent = textsSchedule[language];

  const [bioskopPasiar, setBioskopPasiar] = useState([]);
  const [festivalEvents, setFestivalEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://backend.flobamorafilmfestival.com/wp-json/flobamora/v1/jadwal");
        const data = await res.json();

        // Filter berdasarkan kategori (pastikan 'category' sudah diisi di ACF)
        const pasiar = data.filter((item) => item.category?.toLowerCase() === "bioskop pasiar");
        const festival = data.filter((item) => item.category?.toLowerCase() === "festival");

        setBioskopPasiar(pasiar);
        setFestivalEvents(festival);
      } catch (error) {
        console.error("Gagal fetch jadwal:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const groupByDate = (events) =>
    events.reduce((acc, event) => {
      acc[event.date] = acc[event.date] || [];
      acc[event.date].push(event);
      return acc;
    }, {});

  const groupedBioskopPasiar = groupByDate(bioskopPasiar);
  const groupedFestivalEvents = groupByDate(festivalEvents);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const newDate = new Date(date);
    return newDate.toLocaleDateString(language === "ID" ? "id-ID" : "en-US", options);
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-10 px-5 lg:px-20 dark:bg-gray-900 transition-all">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-Outfit font-bold text-gray-900 dark:text-white mb-6 text-center">{textContent.scheduleTitle}</h1>

      <ScheduleSection title={textContent.bioskopPasiarTitle} groupedEvents={groupedBioskopPasiar} headers={textContent.headers} formatDate={formatDate} type="pasiar" />

      <ScheduleSection title={textContent.festivalTitle} groupedEvents={groupedFestivalEvents} headers={textContent.headers} formatDate={formatDate} type="festival" />
    </div>
  );
};

export default Jadwal;
