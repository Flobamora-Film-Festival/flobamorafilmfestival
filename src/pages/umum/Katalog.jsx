import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useLanguage } from "../../context/LanguageProvider";
import textsKatalog from "../../texts/textsKatalog";
import HTMLFlipBook from "react-pageflip";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Katalog = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mode, setMode] = useState("scroll"); // scroll or flipbook
  const [isMobile, setIsMobile] = useState(false);

  const flipBookRef = useRef();
  const { language } = useLanguage();
  const texts = textsKatalog[language];

  const pdfFile = "/katalog/Flobamora Film Festival-2025.pdf";

  // Responsiveness
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleMode = () => setMode((prev) => (prev === "scroll" ? "flipbook" : "scroll"));

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{texts.title}</h1>
        <div className="flex gap-2 items-center">
          <button onClick={zoomOut} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            ➖
          </button>
          <button onClick={zoomIn} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            ➕
          </button>
          <button onClick={toggleSidebar} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            {sidebarOpen ? "⟨" : "☰"}
          </button>
          <button onClick={toggleMode} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            {mode === "scroll" ? "📖" : "🖱️"}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-28 border-r dark:border-gray-700 overflow-y-auto bg-white dark:bg-gray-800 p-2">
            {Array.from(new Array(numPages), (el, index) => (
              <div key={index} className={`cursor-pointer p-2 text-center ${currentPage === index + 1 ? "bg-gray-300 dark:bg-gray-700" : ""}`} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </div>
            ))}
          </aside>
        )}

        {/* Main Viewer */}
        <main className="flex-1 overflow-hidden p-4">
          {mode === "scroll" ? (
            <div className="h-full overflow-y-scroll">
              <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} loading="Loading...">
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={index} className="flex justify-center my-2">
                    <Page pageNumber={index + 1} scale={scale} />
                  </div>
                ))}
              </Document>
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <HTMLFlipBook
                width={800}
                height={600}
                size="stretch"
                minWidth={315}
                maxWidth={1600}
                minHeight={400}
                maxHeight={1600}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                drawShadow={true}
                ref={flipBookRef}
                onFlip={(e) => setCurrentPage(e.data + 1)}
                className="shadow-lg transition-all duration-300"
                flippingTime={500}
                usePortrait={true}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                disableFlipByClick={false}
                swipeDistance={30}
                swipeHint={true}
                singlePage={isMobile}
                key={isMobile ? "mobile" : "desktop"}
              >
                {/* FlipBook Content */}
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={index} className="flex justify-center items-center bg-white">
                    <Document file={pdfFile} loading="">
                      <Page pageNumber={index + 1} scale={isMobile ? 0.5 : 1} />
                    </Document>
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="p-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700 text-center text-sm text-gray-700 dark:text-gray-300">
        {texts.page} {currentPage} / {numPages}
      </footer>
    </div>
  );
};

export default Katalog;
