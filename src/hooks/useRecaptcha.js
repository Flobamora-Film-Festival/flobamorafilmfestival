import { useEffect, useState } from "react";

const useRecaptcha = (action = "submit") => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecaptchaScript = () => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.onload = () => {
        getRecaptchaToken(); // Run the token fetch after script is loaded
      };
      document.body.appendChild(script);
    };

    const getRecaptchaToken = async () => {
      if (window.grecaptcha) {
        try {
          setLoading(true);
          window.grecaptcha.ready(async () => {
            const newToken = await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action });
            setToken(newToken);
            setLoading(false);
          });
        } catch (err) {
          console.error("Gagal generate token reCAPTCHA:", err);
          setError("Gagal mengambil token reCAPTCHA");
          setToken(null);
          setLoading(false);
        }
      } else {
        console.error("reCAPTCHA belum dimuat.");
        setError("reCAPTCHA belum siap.");
        setLoading(false);
      }
    };

    if (typeof window !== "undefined" && !window.grecaptcha) {
      loadRecaptchaScript();
    } else {
      getRecaptchaToken();
    }
  }, [action]);

  return { token, loading, error };
};

export default useRecaptcha;
