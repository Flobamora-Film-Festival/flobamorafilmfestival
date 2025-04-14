import React, { useContext } from "react";
import GoogleMapComponent from "../../components/GoogleMapComponent";
import { ThemeContext } from "../../context/ThemeContext";
import { LanguageContext } from "../../context/LanguageContext";

const Venue = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const content = {
    ID: {
      title: "Peta Venue",
      description: "Lokasi utama Flobamora Film Festival.",
      addressLabel: "Alamat:",
      address: "Jl. Kejora Oepoi No.1, Oebufu, Kec. Oebobo, Kota Kupang, Nusa Tenggara Timur 85142",
    },
    EN: {
      title: "Venue Map",
      description: "Main locations of the Flobamora Film Festival.",
      addressLabel: "Address:",
      address: "Jl. Kejora Oepoi No.1, Oebufu, Oebobo District, Kupang City, East Nusa Tenggara 85142, Indonesia",
    },
  };

  const t = content[language];

  return (
    <div className={`min-h-screen py-10 px-5 lg:px-20 transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">{t.title}</h1>
        <p className="text-center mb-4 text-lg">{t.description}</p>

        <div className="text-center mb-10 text-sm lg:text-base">
          <p className="font-medium">{t.addressLabel}</p>
          <p>{t.address}</p>
        </div>

        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <GoogleMapComponent />
        </div>
      </div>
    </div>
  );
};

export default Venue;
