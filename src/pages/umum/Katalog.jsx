import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { useLanguage } from "../../context/LanguageProvider"; // Hook untuk memilih bahasa
import textsKatalog from "../../texts/textsKatalog"; // File teks multibahasa

const Katalog = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const { language } = useLanguage(); // Mendapatkan bahasa yang dipilih
  const texts = textsKatalog[language]; // Mengambil teks berdasarkan bahasa yang dipilih

  // Fungsi untuk menangani perubahan jumlah halaman dalam dokumen
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="min-h-screen py-10 px-5 lg:px-20 dark:bg-gray-900 transition-all">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{texts.title}</h1>

      {/* Katalog Festival Saat Ini */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{texts.currentCatalog}</h2>
        <div className="flex justify-center">
          <Document
            file="/katalog-2025.pdf" // Ganti dengan path file PDF yang sesuai
            onLoadSuccess={onDocumentLoadSuccess}
            className="border shadow-lg"
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
        <p className="text-center mt-4">
          {texts.pageNavigation} {pageNumber} {texts.pageNavigation} {numPages}
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded" disabled={pageNumber <= 1} onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}>
            {texts.previousPage}
          </button>
          <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded" disabled={pageNumber >= numPages} onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}>
            {texts.nextPage}
          </button>
        </div>
      </div>

      {/* Katalog Festival Sebelumnya */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{texts.previousCatalog}</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          {Object.entries(texts.catalogLinks).map(([year, label]) => (
            <li key={year}>
              <a href={`/katalog-${year}.pdf`} target="_blank" className="text-blue-500">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Katalog;
