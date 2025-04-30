import nodemailer from "nodemailer";
import fetch from "node-fetch";

// --- Rate limiter (berbasis IP lokal) ---
const rateLimitCache = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 menit
const MAX_REQUESTS_PER_WINDOW = 3;

const checkRateLimit = (ip) => {
  const now = Date.now();
  const record = rateLimitCache.get(ip) || { count: 0, timestamp: now };

  if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitCache.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  rateLimitCache.set(ip, { count: record.count + 1, timestamp: record.timestamp });
  return true;
};

// --- Fungsi untuk menangani CORS ---
const handleCors = (req, res) => {
  const allowedOrigins = [
    "https://www.flobamorafilmfestival.com/", // domain yang diizinkan
    // bisa tambahkan domain lain jika perlu di sini.
  ];

  const origin = req.headers.origin;

  // Mengecek apakah origin request ada dalam allowedOrigins
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(200).end(); // Menanggapi permintaan preflight
      return true;
    }
  }

  return false;
};

// --- Verifikasi Turnstile ---
const verifyTurnstile = async (token, ip, lang) => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const language = lang === "EN" ? "EN" : "ID";

  if (!token) {
    return {
      success: false,
      message: language === "EN" ? "Turnstile token not found." : "Token Turnstile tidak ditemukan.",
    };
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        message: language === "EN" ? "Turnstile verification failed. Please try again." : "Verifikasi Turnstile gagal. Silakan coba lagi.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Turnstile verification error:", error.message);
    return {
      success: false,
      message: language === "EN" ? "Failed to verify Turnstile. Please try again." : "Gagal memverifikasi Turnstile. Silakan coba lagi.",
    };
  }
};

// --- API Handler ---
export default async function handler(req, res) {
  if (handleCors(req, res)) return;

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, subject, message, turnstileToken, lang } = req.body;
  const language = lang === "EN" ? "EN" : "ID";
  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "";

  // 🚨 Rate limit check
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      success: false,
      message: language === "EN" ? "Too many requests. Please wait a moment before trying again." : "Terlalu banyak permintaan. Silakan tunggu sebentar sebelum mencoba lagi.",
    });
  }

  // 🚨 Validasi input
  if (!name || !email || !message || !turnstileToken) {
    return res.status(400).json({
      success: false,
      message: language === "EN" ? "All fields are required." : "Semua kolom wajib diisi.",
    });
  }

  // ✅ Verifikasi Turnstile
  const verification = await verifyTurnstile(turnstileToken, ip, language);
  if (!verification.success) {
    return res.status(400).json({ success: false, message: verification.message });
  }

  // ✅ Kirim Email
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const successMessage = language === "EN" ? "Your message has been successfully sent. We will get back to you soon." : "Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.";

  const errorMessage = language === "EN" ? "There was an error sending your message. Please try again later." : "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.";

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: subject || `Pesan dari Website Flobamora Film Festival (${name})`,
      text: message,
      replyTo: email,
    });

    return res.status(200).json({ success: true, message: successMessage });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, message: errorMessage });
  }
}
