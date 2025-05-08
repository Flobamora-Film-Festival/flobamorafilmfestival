import React from "react";
import { useLanguage } from "../../context/LanguageProvider"; // Gunakan custom hook untuk bahasa
import textsMedia from "../../texts/textsMedia"; // Import teks multibahasa

const Media = () => {
  const { language } = useLanguage(); // Ambil bahasa dari context
  const texts = textsMedia[language]; // Ambil teks sesuai dengan bahasa

  return (
    <div className="w-full px-4 py-10 scroll-mt-20">
      {/* Section: Press Release */}
      <section className="mb-16">
        <h3 className="text-center text-3xl font-semibold mb-8">{texts.pressReleaseTitle}</h3>
        <div className="text-lg max-w-7xl mx-auto">
          <p className="mb-4 text-justify">{texts.pressReleaseText}</p>
          {/* ... Other press release content ... */}
        </div>
      </section>

      {/* Section: Postingan Media Sosial */}
      <section className="mb-16">
        <h3 className="text-center text-3xl font-semibold mb-8">{texts.socialMediaTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Post 1 */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h4 className="text-xl font-semibold mb-2">{texts.instagramPost1}</h4>
            <a href="https://www.instagram.com/p/DHIxnsxPRy6/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://instagram.fsoc1-1.fna.fbcdn.net/v/t51.2885-15/436250654_971321631193734_4670166923034404418_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fsoc1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=BnC4HvGuMdQAX8gqIGS&edm=APU89FABAAAA&ccb=7-5&oh=00_AfCH_6Ho1CQjapXDPfg1FAYgohvQUuWBv4TANH_RIj8irA&oe=662F7DC3&_nc_sid=bc0c2c"
                alt="Instagram Post 1"
                className="w-full h-auto rounded"
              />
            </a>
          </div>

          {/* Post 2 */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h4 className="text-xl font-semibold mb-2">{texts.instagramPost2}</h4>
            <a href="https://www.instagram.com/p/DHIkdhTvK7u/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://instagram.fcgk18-2.fna.fbcdn.net/v/t51.2885-15/435583505_805106091369993_2934181360473185462_n.jpg?_nc_ht=instagram.fcgk18-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=_eo-k7vmPHwAX_PW1lW&edm=APU89FABAAAA&ccb=7-5&oh=00_AfAJz_Tuf3rGcyVDAvAV3_0xIvKKFP0w5JoZtT3fSKReWQ&oe=66303C1A&_nc_sid=bc0c2c"
                alt="Instagram Post 2"
                className="w-full h-auto rounded"
              />
            </a>
          </div>

          {/* Post 3 */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h4 className="text-xl font-semibold mb-2">{texts.instagramPost3}</h4>
            <a href="https://www.instagram.com/p/DHI-N1Pvk28/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://instagram.fcgk19-1.fna.fbcdn.net/v/t51.2885-15/435964983_793247775869935_1714336404261991719_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fcgk19-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=RPd2_oICbZsAX_1mpA4&edm=APU89FABAAAA&ccb=7-5&oh=00_AfDzqvKc3Lt8zUbQ0vZzR4A5lYpDUhFd0o6ikqe0MZ_7bg&oe=662FE29C&_nc_sid=bc0c2c"
                alt="Instagram Post 3"
                className="w-full h-auto rounded"
              />
            </a>
          </div>

          {/* Post 4 */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h4 className="text-xl font-semibold mb-2">{texts.instagramPost4}</h4>
            <a href="https://www.instagram.com/p/DHvqRMAyxpM/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://instagram.fcgk23-1.fna.fbcdn.net/v/t51.2885-15/435945491_968139454796201_6248131148083580590_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fcgk23-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=0F50-4vShI0AX8jCgrK&edm=APU89FABAAAA&ccb=7-5&oh=00_AfAC8X-9KvMzrkOhkAIqAv6Kf8RU9-L4k9ndbd-eakCFeQ&oe=66300EF2&_nc_sid=bc0c2c"
                alt="Instagram Post 4"
                className="w-full h-auto rounded"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;
