import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageProvider"; // ✅ Use custom hook

const Jadwal = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useLanguage(); // ✅ Use the custom hook to get language

  // Data untuk Bioskop Pasiar
  const bioskopPasiar = [
    {
      date: "2025-07-05", // Format Tanggal ISO yang lebih umum
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

  const headers = {
    time: language === "ID" ? "Waktu" : "Time",
    program: language === "ID" ? "Program" : "Program",
    route: language === "ID" ? "Rute" : "Route",
    location: language === "ID" ? "Lokasi" : "Location",
    category: language === "ID" ? "Kategori" : "Category",
  };

  return (
    <div className="min-h-screen py-10 px-5 lg:px-20 dark:bg-gray-900 transition-all">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{language === "ID" ? "Jadwal Festival" : "Festival Schedule"}</h1>

      {/* Bioskop Pasiar */}
      <div className="mb-16">
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center border-b-4 border-gray-400 dark:border-gray-600 pb-2">{language === "ID" ? "Bioskop Pasiar" : "Traveling Cinema"}</h2>

        {Object.keys(groupedBioskopPasiar).map((date, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{formatDate(date)}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-800 text-left">
                    <th className="border border-gray-300 px-6 py-3 w-[20%]">{headers.time}</th>
                    <th className="border border-gray-300 px-6 py-3 w-[35%]">{headers.program}</th>
                    <th className="border border-gray-300 px-6 py-3 w-[25%]">{headers.route}</th>
                    <th className="border border-gray-300 px-6 py-3 w-[20%]">{headers.location}</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedBioskopPasiar[date].map((event, index) => (
                    <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="border border-gray-300 px-6 py-3">{event.time}</td>
                      <td className="border border-gray-300 px-6 py-3 font-semibold">{event.title}</td>
                      <td className="border border-gray-300 px-6 py-3">{event.route}</td>
                      <td className="border border-gray-300 px-6 py-3">{event.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Pemisah */}
      <div className="my-16 border-t-8 border-gray-400 dark:border-gray-600"></div>

      {/* Jadwal Festival */}
      <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center border-b-4 border-gray-400 dark:border-gray-600 pb-2">Festival</h2>

      {Object.keys(groupedFestivalEvents).map((date, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{formatDate(date)}</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800 text-left">
                  <th className="border border-gray-300 px-6 py-3 w-[20%]">{headers.time}</th>
                  <th className="border border-gray-300 px-6 py-3 w-[35%]">{headers.program}</th>
                  <th className="border border-gray-300 px-6 py-3 w-[25%]">{headers.category}</th>
                  <th className="border border-gray-300 px-6 py-3 w-[20%]">{headers.location}</th>
                </tr>
              </thead>
              <tbody>
                {groupedFestivalEvents[date].map((event, index) => (
                  <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="border border-gray-300 px-6 py-3">{event.time}</td>
                    <td className="border border-gray-300 px-6 py-3 font-semibold">{event.title}</td>
                    <td className="border border-gray-300 px-6 py-3">{event.category}</td>
                    <td className="border border-gray-300 px-6 py-3">{event.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Jadwal;
