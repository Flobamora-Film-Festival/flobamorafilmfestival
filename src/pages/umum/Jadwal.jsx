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
    fetch("https://backend.flobamorafilmfestival.com/wp-json/flobamora/v1/jadwal")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Jadwal diterima:", data);

        const bioskop = data.filter((item) => item.route); // berdasarkan route
        const festival = data.filter((item) => !item.route);

        setBioskopPasiar(bioskop);
        setFestivalEvents(festival);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal fetch jadwal:", error);
        setLoading(false);
      });
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
