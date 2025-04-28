import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useLanguage } from "../../context/LanguageProvider";
import textsKatalog from "../../texts/textsKatalog";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/worker/pdf.worker.mjs";

const Katalog = () => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.2); // Default scale
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageRefs, setPageRefs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState("scroll"); // "scroll" or "flipbook"
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const flipBookRef = useRef(null);

  const { language } = useLanguage();
  const texts = textsKatalog[language];

  // Detect screen size (mobile vs desktop)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageRefs(new Array(numPages).fill(null).map(() => React.createRef()));
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3)); // Zoom in up to 3x
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6)); // Zoom out down to 0.6x
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleMode = () => setMode((prev) => (prev === "scroll" ? "flipbook" : "scroll"));

  useEffect(() => {
    if (mode !== "scroll") return; // Scroll handler hanya untuk scroll mode

    const handleScroll = () => {
      const containerTop = containerRef.current?.getBoundingClientRect().top || 0;
      const pageIndex = pageRefs.findIndex((ref) => {
        const rect = ref?.current?.getBoundingClientRect();
        return rect?.top > containerTop;
      });
      setCurrentPage(pageIndex === -1 ? numPages : pageIndex + 1);
    };

    const scrollElement = containerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [pageRefs, numPages, mode]);

  const scrollToPage = (index) => {
    if (mode === "scroll") {
      pageRefs[index]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (mode === "flipbook") {
      flipBookRef.current?.flip(index);
    }
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
          <aside className="w-28 border-r dark:border-gray-700 overflow-y-auto bg-white dark:bg-gray-800">
            {Array.from(new Array(numPages), (_, index) => (
              <div key={index} onClick={() => scrollToPage(index)} className={`cursor-pointer p-1 transition-all duration-200 ${currentPage - 1 === index ? "scale-110 border-2 border-blue-500" : "hover:scale-105"}`}>
                <Document file="/katalog/Flobamora Film Festival-2025.pdf" loading="">
                  <Page pageNumber={index + 1} width={80} renderAnnotationLayer={false} renderTextLayer={false} />
                </Document>
              </div>
            ))}
          </aside>
        )}

        {/* Main Viewer */}
        <main className="flex-1 overflow-hidden p-4">
          {mode === "scroll" ? (
            <div ref={containerRef} className="h-full overflow-y-scroll">
              <Document file="/katalog/Flobamora Film Festival-2025.pdf" onLoadSuccess={onDocumentLoadSuccess} loading={<p className="text-center text-gray-600 dark:text-gray-300">Loading PDF...</p>}>
                {Array.from(new Array(numPages), (_, index) => (
                  <div ref={pageRefs[index]} key={index} className="mb-6 flex justify-center">
                    <Page pageNumber={index + 1} scale={scale} renderAnnotationLayer={false} renderTextLayer={false} />
                  </div>
                ))}
              </Document>
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <HTMLFlipBook
                width={1600} // lebar doubled untuk dua halaman berdampingan
                height={800} // tinggi diperbesar agar lebih sesuai untuk halaman vertikal
                size="fixed"
                minWidth={315}
                maxWidth={1600}
                minHeight={400}
                maxHeight={1600} // Sesuaikan untuk lebih tinggi
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
                autoSize={false} // non-auto size
                clickEventForward={true}
                disableFlipByClick={false}
                swipeDistance={30}
                swipeHint={true}
                singlePage={isMobile}
                key={isMobile ? "mobile" : "desktop"}
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <div key={index} className="flex justify-center items-center bg-white dark:bg-gray-800 p-4">
                    <Document file="/katalog/Flobamora Film Festival-2025.pdf" loading="">
                      <Page
                        pageNumber={index + 1}
                        width={scale * 800} // Set width based on scale
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
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
