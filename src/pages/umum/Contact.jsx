import { useEffect, useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [recaptchaReady, setRecaptchaReady] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => setRecaptchaReady(true);
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!recaptchaReady) {
      setErrorMessage("reCAPTCHA belum siap. Coba beberapa saat lagi.");
      setLoading(false);
      return;
    }

    try {
      const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: "submit" });

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token,
          lang: "ID",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setFormData({ name: "", email: "", message: "", website: "" });
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error sending form:", error);
      setErrorMessage("Gagal mengirim formulir.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h1>Kontak Kami</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nama" value={formData.name} onChange={handleChange} required style={{ display: "block", width: "100%", marginBottom: "1rem" }} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ display: "block", width: "100%", marginBottom: "1rem" }} />
        <textarea name="message" placeholder="Pesan" value={formData.message} onChange={handleChange} required rows={5} style={{ display: "block", width: "100%", marginBottom: "1rem" }} />
        {/* Honeypot field */}
        <input type="text" name="website" value={formData.website} onChange={handleChange} style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
        <button type="submit" disabled={loading || !recaptchaReady} style={{ width: "100%", padding: "0.75rem", fontSize: "1rem" }}>
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </button>
      </form>

      {successMessage && <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>}
    </div>
  );
}
