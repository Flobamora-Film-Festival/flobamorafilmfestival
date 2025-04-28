// pages/api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, message, recaptchaToken, website = "", lang = "ID" } = req.body;

  // Honeypot check
  if (website !== "") {
    return res.status(400).json({ success: false, message: lang === "ID" ? "Spam terdeteksi." : "Spam detected." });
  }

  // Validate input
  if (!name || !email || !message || !recaptchaToken) {
    return res.status(400).json({ success: false, message: lang === "ID" ? "Data tidak lengkap." : "Incomplete data." });
  }

  // Verify reCAPTCHA token
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

  try {
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      // score bisa disesuaikan, biasanya 0.5 cukup
      return res.status(400).json({ success: false, message: lang === "ID" ? "Verifikasi reCAPTCHA gagal." : "reCAPTCHA verification failed." });
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return res.status(500).json({ success: false, message: lang === "ID" ? "Gagal verifikasi reCAPTCHA." : "Failed to verify reCAPTCHA." });
  }

  // Continue with sending email
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Pesan dari Flobamora Film Festival (${name})`,
      text: message,
    });

    return res.status(200).json({ success: true, message: lang === "ID" ? "Pesan berhasil dikirim." : "Message sent successfully." });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ success: false, message: lang === "ID" ? "Gagal mengirim pesan." : "Failed to send message." });
  }
}
