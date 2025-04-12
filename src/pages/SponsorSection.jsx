/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const SponsorSection = ({ currentSponsors, pastSponsors }) => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Sponsor Kami
      </h2>

      {/* Sponsor Saat Ini */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Sponsor Saat Ini
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {currentSponsors.length > 0 ? (
            currentSponsors.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Sponsor ${index + 1}`}
                className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto object-contain hover:scale-105 transition-transform duration-200 ease-in-out"
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Belum ada sponsor saat ini
            </p>
          )}
        </div>
      </div>

      {/* Sponsor Sebelumnya */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Sponsor Sebelumnya
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {pastSponsors.length > 0 ? (
            pastSponsors.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Sponsor Lama ${index + 1}`}
                className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-200 ease-in-out"
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Belum ada sponsor sebelumnya
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

// 🔥 Pindahkan propTypes ke bawah
SponsorSection.propTypes = {
  currentSponsors: PropTypes.array.isRequired, // Jika wajib ada
  pastSponsors: PropTypes.array, // Jika opsional
};

export default SponsorSection;
