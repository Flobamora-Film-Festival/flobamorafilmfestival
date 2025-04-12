/* eslint-disable no-unused-vars */
import React from "react";

const Media = () => {
  return (
    <div className="w-full px-4 py-10 scroll-mt-20">
      {/* Section: Press Release */}
      <section className="mb-16">
        <h3 className="text-center text-3xl font-semibold mb-8">
          Press Release
        </h3>
        <div className="text-lg max-w-3xl mx-auto">
          <p className="mb-4">
            Flobamora Film Festival (FFF) 2024 adalah festival film pendek
            tahunan yang diselenggarakan di Kupang, Nusa Tenggara Timur (NTT),
            pada 29 Juli hingga 3 Agustus 2024. Festival ini merupakan inisiatif
            dari Komunitas Film Kupang untuk memajukan industri film lokal dan
            memperkenalkan karya-karya sineas muda berbakat, terutama film
            pendek.
          </p>
          {/* ... Other press release content ... */}
        </div>
      </section>

      {/* Section: Artikel */}
      <section className="mb-16">
        <h3 className="text-center text-3xl font-semibold mb-8">Artikel</h3>
        <div className="text-lg max-w-3xl mx-auto">
          <p className="mb-4">
            Artikel-artikel terkait dengan festival ini akan dibagikan di sini.
            Harap tunggu update selanjutnya.
          </p>
        </div>
      </section>

      {/* Section: Postingan Media Sosial */}
      <section className="mb-16">
        <h3 className="text-center text-3xl font-semibold mb-8">
          Postingan Media Sosial
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Example of Instagram Posts using Instagram Embed */}

          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold mb-2">Instagram Post 1</h4>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/pDHIR_R7v7ys/"
                data-instgrm-version="13"
                style={{
                  width: "100%",
                  maxWidth: "540px",
                  minWidth: "326px",
                  marginBottom: "10px",
                }}
              >
                <div style={{ padding: "16px" }}>
                  <a
                    href="https://www.instagram.com/pDHIR_R7v7ys/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    Check out this Instagram post!
                  </a>
                </div>
              </blockquote>
              <script async src="https://www.instagram.com/embed.js"></script>
            </div>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/3">
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h4 className="text-xl font-semibold mb-2">Instagram Post 2</h4>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DHIR_R7v7ys/"
                data-instgrm-version="13"
                style={{
                  width: "100%",
                  maxWidth: "540px",
                  minWidth: "326px",
                  marginBottom: "10px",
                }}
              >
                <div style={{ padding: "16px" }}>
                  <a
                    href="https://www.instagram.com/p/DHIR_R7v7ys/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    Another Instagram Post!
                  </a>
                </div>
              </blockquote>
              <script async src="https://www.instagram.com/embed.js"></script>
            </div>
          </div>

          {/* Repeat the above for more Instagram posts */}
        </div>
      </section>
    </div>
  );
};

export default Media;
