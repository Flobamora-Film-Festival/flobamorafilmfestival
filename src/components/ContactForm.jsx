import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Turnstile from "react-turnstile";
import { useLanguage } from "../context/LanguageProvider";
import { ThemeContext } from "../context/ThemeContext";
import textsContactForm from "../texts/textsContactForm";

const ContactForm = ({ formData, handleInputChange, handleCaptchaSuccess, handleCaptchaError, handleSubmit, captchaError }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  const { language } = useLanguage();

  // Ambil teks yang sesuai dengan bahasa yang dipilih
  const selectedText = language === "ID" ? textsContactForm.ID : textsContactForm.EN;

  return (
    <motion.section
      className={`w-full py-16 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} text-center`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{selectedText.contactForm}</h2>

      <AnimatePresence mode="wait">
        {formData.isSubmitted ? (
          <motion.div key="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="mt-4 text-lg text-green-500">
            <p className="font-semibold">{selectedText.thankYouMessage}</p>
            <p className="mt-2 text-sm">{selectedText.successConfirmation}</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="mt-8 w-full px-4 max-w-xl mx-auto">
            <div className="flex flex-col space-y-4">
              {/* Input Name */}
              <input
                type="text"
                name="name"
                placeholder={selectedText.namePlaceholder}
                aria-label="Your Name"
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              {/* Input Email */}
              <input
                type="email"
                name="email"
                placeholder={selectedText.emailPlaceholder}
                aria-label="Your Email"
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              {/* Subject (Topik Pesan) */}
              <input
                type="text"
                name="subject"
                placeholder={selectedText.subjectPlaceholder}
                aria-label="Message Topic"
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />

              {/* Message */}
              <textarea
                name="message"
                placeholder={selectedText.messagePlaceholder}
                rows="4"
                aria-label="Your Message"
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b820e6]"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>

              {/* Honeypot Field */}
              <input type="text" name="website" style={{ display: "none" }} aria-label="Honeypot" />

              {/* Turnstile CAPTCHA */}
              <Turnstile sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY} onVerify={handleCaptchaSuccess} onError={handleCaptchaError} language={language === "EN" ? "en" : "id"} />

              {/* Error Messages */}
              {captchaError && <p className="text-red-500 text-sm mt-2">{captchaError}</p>}
              {formData.isError && <p className="text-red-500 text-sm mt-2">{language === "ID" ? "Harap isi semua bidang dengan benar" : "Please fill all fields correctly"}</p>}

              {/* Submit Button */}
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
