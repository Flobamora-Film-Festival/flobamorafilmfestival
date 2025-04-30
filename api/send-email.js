import nodemailer from "nodemailer";
import fetch from "node-fetch"; // pastikan node-fetch terinstal

// Fungsi untuk verifikasi Turnstile
const verifyTurnstile = async (req, res) => {
  const { turnstileToken, lang } = req.body;
  const language = lang === "EN" ? "EN" : "ID"; // fallback ke ID

  if (!turnstileToken) {
    return res.status(400).json({
      success: false,
      message: language === "ID" ? "Token Turnstile tidak ditemukan." : "Turnstile token not found.",
    });
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: turnstileToken,
        remoteip: ip,
      }),
    });

    const data = await verifyRes.json();

    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: language === "ID" ? "Verifikasi Turnstile gagal. Silakan coba lagi." : "Turnstile verification failed. Please try again.",
      });
    }
  } catch (error) {
    console.error("Turnstile verification error:", error.message);
    return res.status(500).json({
      success: false,
      message: language === "ID" ? "Gagal memverifikasi Turnstile. Silakan coba lagi." : "Failed to verify Turnstile. Please try again.",
    });
  }
};

// Fungsi untuk mengirim email
const sendEmailHandler = async (req, res) => {
  const { name, email, message, lang } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: lang === "EN" ? "All fields are required." : "Semua kolom wajib diisi.",
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const successMessage = lang === "EN" ? "Your message has been successfully sent. We will get back to you soon." : "Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.";

  const errorMessage = lang === "EN" ? "There was an error sending your message. Please try again later." : "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.";

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Pesan dari form Website Flobamora Film Festival (${name})`,
      text: message,
      replyTo: email,
    });

    res.status(200).json({ success: true, message: successMessage });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: errorMessage });
  }
};

// Fungsi utama untuk API handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  // Verifikasi Turnstile
  await verifyTurnstile(req, res);

  // Kirim email jika verifikasi berhasil
  await sendEmailHandler(req, res);
}
