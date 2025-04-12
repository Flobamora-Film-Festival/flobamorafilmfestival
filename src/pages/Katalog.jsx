import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Katalog = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Fungsi untuk menangani perubahan jumlah halaman dalam dokumen
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="min-h-screen py-10 px-5 lg:px-20 dark:bg-gray-900 transition-all">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Katalog Film Festival
      </h1>

      {/* Katalog Festival Saat Ini */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Katalog Festival 2025
        </h2>
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
          Halaman {pageNumber} dari {numPages}
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          >
            Sebelumnya
          </button>
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
            disabled={pageNumber >= numPages}
            onClick={() =>
              setPageNumber((prev) => Math.min(prev + 1, numPages))
            }
          >
            Selanjutnya
          </button>
        </div>
      </div>

      {/* Katalog Festival Sebelumnya */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Katalog Festival Sebelumnya
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>
            <a
              href="/katalog-2024.pdf"
              target="_blank"
              className="text-blue-500"
            >
              Katalog Festival 2024
            </a>
          </li>
          <li>
            <a
              href="/katalog-2023.pdf"
              target="_blank"
              className="text-blue-500"
            >
              Katalog Festival 2023
            </a>
          </li>
          <li>
            <a
              href="/katalog-2022.pdf"
              target="_blank"
              className="text-blue-500"
            >
              Katalog Festival 2022
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Katalog;
