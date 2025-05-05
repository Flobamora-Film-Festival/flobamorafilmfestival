import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "turn.js";

const Flipbook = ({ pages }) => {
  const flipbookRef = useRef(null);

  useEffect(() => {
    // Memastikan flipbookRef sudah ada
    if (flipbookRef.current) {
      $(flipbookRef.current).turn({
        width: 800,
        height: 600,
        autoCenter: true,
        pages: pages.length,
      });
    }
  }, [pages]);

  return (
    <div className="flipbook" ref={flipbookRef}>
      {pages.map((page, index) => (
        <div key={index} className="page">
          <img src={page} alt={`Page ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Flipbook;
