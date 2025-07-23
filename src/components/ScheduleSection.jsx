import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageProvider";

export default function ScheduleSection({ title, groupedEvents, formatDate }) {
  const { language } = useLanguage();
  const isID = language === "ID";

  return (
    <div className="mb-16">
      <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center border-b-4 border-gray-400 dark:border-gray-600 pb-2">{title}</h2>

      {Object.keys(groupedEvents).map((date, index) => (
        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="mb-8">
          <h3 className="text-lg lg:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{formatDate(date)}</h3>

          <div className="space-y-4 w-full">
            {/* Mobile View */}
            <div className="flex flex-col space-y-4 md:hidden">
              {groupedEvents[date].map((event, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="border border-gray-300 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800 text-sm space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{isID ? "Waktu (WITA / UTC+8)" : "Time (WITA / UTC+8)"}:</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-semibold">{isID ? "Kegiatan" : "Activity"}:</span>
                    <div className="whitespace-pre-line">{event.activity}</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{isID ? "Tempat" : "Venue"}:</span>
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{isID ? "Durasi (menit)" : "Duration (minutes)"}:</span>
                    <span>{event.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-800 text-left">
                    <th className="border border-gray-300 px-6 py-3 w-[20%]">{isID ? "Waktu (WITA / UTC+8)" : "Time (WITA / UTC+8)"}</th>
                    <th className="border border-gray-300 px-6 py-3 w-[35%]">{isID ? "Kegiatan" : "Activity"}</th>
                    <th className="border border-gray-300 px-6 py-3 w-[25%]">{isID ? "Tempat" : "Venue"}</th>
                    <th className="border border-gray-300 px-6 py-3 w-[20%]">{isID ? "Durasi (menit)" : "Duration (minutes)"}</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedEvents[date].map((event, idx) => (
                    <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="border border-gray-300 px-6 py-3">{event.time}</td>
                      <td className="border border-gray-300 px-6 py-3 font-semibold whitespace-pre-line">{event.activity}</td>
                      <td className="border border-gray-300 px-6 py-3">{event.venue}</td>
                      <td className="border border-gray-300 px-6 py-3">{event.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden my-4 border-t-2 border-gray-300 dark:border-gray-700"></div>
        </motion.div>
      ))}
    </div>
  );
}
