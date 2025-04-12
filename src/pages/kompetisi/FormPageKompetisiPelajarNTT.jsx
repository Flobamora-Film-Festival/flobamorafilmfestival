import React from "react";
import BackToTop from "../components/BackToTop"; // Update the import path

const FormPageKompetisiPelajarNTT = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 text-gray-900 dark:text-white">
      <h2 className="text-center text-5xl font-Outfit font-bold mb-6 dark:text-white">
        Kompetisi Film Pelajar NTT 2025
      </h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Outfit">
        Silahkan mengisi formulir berikut untuk pendaftaran Kompetisi Film
        Pelajar NTT 2025.
      </p>
      <div className="w-full max-w-3xl h-[80vh]">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfG7i-tDph9TMV3MDdIr8GzpuWAakGdXs_ucDBTHfbwJFw0lQ/viewform?usp=header"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Formulir Pendaftaran"
        >
          Loading…
        </iframe>
      </div>
      <BackToTop /> {/* Add BackToTop here */}
    </div>
  );
};

export default FormPageKompetisiPelajarNTT;
