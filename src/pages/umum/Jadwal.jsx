import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider";
import textsSchedule from "../../texts/textsSchedule";
import ScheduleSection from "@/components/ScheduleSection";

const Jadwal = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage();
  const textContent = textsSchedule[language];

  const [festivalEvents, setFestivalEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [availableDates, setAvailableDates] = useState([]);
  const [availableVenues, setAvailableVenues] = useState([]);

  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedVenue, setSelectedVenue] = useState("all");

  useEffect(() => {
    const fetchJadwal = () => {
      fetch("https://backend.flobamorafilmfestival.com/wp-json/flobamora/v1/jadwal")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          return res.json();
        })
        .then((data) => {
          const festival = data.filter((item) => !item.route); // Hanya acara non-Pasiar
          setFestivalEvents(festival);
          setAvailableDates([...new Set(festival.map((event) => event.date))]);
          setAvailableVenues([...new Set(festival.map((event) => event.venue).filter(Boolean))]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Gagal fetch jadwal:", error);
          setLoading(false);
        });
    };

    fetchJadwal();
    const interval = setInterval(fetchJadwal, 60000);
    return () => clearInterval(interval);
  }, []);

  const groupByDate = (events) =>
    events.reduce((acc, event) => {
      acc[event.date] = acc[event.date] || [];
      acc[event.date].push(event);
      return acc;
    }, {});

  const filteredEvents = festivalEvents.filter((event) => {
    const matchDate = selectedDate === "all" || event.date === selectedDate;
    const matchVenue = selectedVenue === "all" || event.venue === selectedVenue;
    return matchDate && matchVenue;
  });

  const groupedFestivalEvents = groupByDate(filteredEvents);

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

      {/* Filter */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 text-sm sm:text-base">
        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-4 py-2 rounded-md border dark:bg-gray-800 dark:text-white">
          <option value="all">{language === "ID" ? "Semua Tanggal" : "All Dates"}</option>
          {availableDates.map((date) => (
            <option key={date} value={date}>
              {formatDate(date)}
            </option>
          ))}
        </select>

        <select value={selectedVenue} onChange={(e) => setSelectedVenue(e.target.value)} className="px-4 py-2 rounded-md border dark:bg-gray-800 dark:text-white">
          <option value="all">{language === "ID" ? "Semua Lokasi" : "All Venues"}</option>
          {availableVenues.map((venue) => (
            <option key={venue} value={venue}>
              {venue}
            </option>
          ))}
        </select>
      </div>

      {/* Jadwal */}
      <ScheduleSection groupedEvents={groupedFestivalEvents} headers={textContent.headers} formatDate={formatDate} type="festival" />
    </div>
  );
};

export default Jadwal;
