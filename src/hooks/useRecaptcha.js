import { useEffect, useState } from "react";

export const useRecaptcha = (action = "submit") => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Menambahkan state untuk loading
  const [error, setError] = useState(null); // Menambahkan state untuk error

  useEffect(() => {
    const getRecaptchaToken = async () => {
      if (window.grecaptcha && window.grecaptcha.execute) {
        try {
          setLoading(true);
          const newToken = await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action });
          setToken(newToken);
        } catch (err) {
          console.error("Gagal generate token reCAPTCHA:", err);
          setError("Gagal mengambil token reCAPTCHA");
          setToken(null);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("reCAPTCHA belum dimuat.");
        setError("reCAPTCHA belum siap.");
        setLoading(false);
      }
    };

    // Memastikan kita hanya mengeksekusi kode di browser
    if (typeof window !== "undefined") {
      getRecaptchaToken();
    }
  }, [action]);

  return { token, loading, error };
};
