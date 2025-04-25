import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoogleReCaptcha from "react-google-recaptcha";
import { useLanguage } from "../context/LanguageProvider"; // Custom hook untuk bahasa
import textsContactForm from "../texts/textsContactForm"; // Import teks bahasa

const ContactForm = () => {
  const { language } = useLanguage(); // Ambil bahasa yang dipilih dari context
  const selectedText = textsContactForm[language] || textsContactForm.EN; // Pilih teks sesuai bahasa yang aktif, fallback ke EN

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    isSubmitted: false,
    isError: false,
    loading: false,
  });

  useEffect(() => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute("6LfFkRwrAAAAAJS2M1Sd3Qz2NRbfkrlzGCZsR29h", { action: "submit" }).then((token) => {
          console.log("reCAPTCHA token:", token);
        });
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, loading: true }));

    setTimeout(() => {
      setFormData((prevData) => ({
        ...prevData,
        isSubmitted: true,
        loading: false,
      }));
    }, 2000);
  };

  return (
    <motion.section className="w-full py-16 bg-gray-50 dark:bg-gray-900 text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{selectedText?.contactForm}</h2>
      <p className="mt-4 text-lg w-full px-4 lg:px-0 lg:w-auto text-gray-700 dark:text-gray-300">{selectedText?.contactDesc}</p>

      <AnimatePresence mode="wait">
        {formData.isSubmitted ? (
          <motion.div key="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="mt-4 text-lg text-green-500">
            <p className="font-semibold">{selectedText.thankYouMessage}</p>
            <p className="mt-2 text-sm">{selectedText.successConfirmation}</p>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="mt-8 w-full px-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                placeholder={selectedText.namePlaceholder}
                aria-label="Your Name"
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder={selectedText.emailPlaceholder}
                aria-label="Your Email"
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
                value={formData.email}
                onChange={handleInputChange}
              />
              <textarea
                name="message"
                placeholder={selectedText.messagePlaceholder}
                rows="4"
                aria-label="Your Message"
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>

              <button type="submit" className="w-full sm:w-auto px-6 py-3 border rounded-full bg-gradient-to-r from-[#b820e6] to-[#da7d20] text-white mt-4 hover:opacity-90 focus:ring-2 focus:ring-[#b820e6]" disabled={formData.loading}>
                {formData.loading ? (language === "ID" ? "Mengirim..." : "Sending...") : selectedText.buttonText}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ContactForm;
