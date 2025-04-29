import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, message, turnstileToken, website = "", lang = "ID" } = req.body;

  // Honeypot check
  if (website !== "") {
    return res.status(400).json({
      success: false,
      message: lang === "ID" ? "Spam terdeteksi." : "Spam detected.",
    });
  }

  // Validate input
  if (!name || !email || !message || !turnstileToken) {
    return res.status(400).json({
      success: false,
      message: lang === "ID" ? "Data tidak lengkap." : "Incomplete data.",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: lang === "ID" ? "Format email tidak valid." : "Invalid email format.",
    });
  }

  // Verify Turnstile token
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

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
        message: lang === "ID" ? "Verifikasi Turnstile gagal. Silakan coba lagi." : "Turnstile verification failed. Please try again.",
      });
    }
  } catch (error) {
    console.error("Turnstile verification error:", error.message || error);
    return res.status(500).json({
      success: false,
      message: lang === "ID" ? "Gagal memverifikasi keamanan. Silakan coba beberapa saat lagi." : "Failed to verify security. Please try again later.",
    });
  }

  // Kirim email
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

    return res.status(200).json({
      success: true,
      message: lang === "ID" ? "Pesan berhasil dikirim." : "Message sent successfully.",
    });
  } catch (error) {
    console.error("Email send error:", error.message || error);
    return res.status(500).json({
      success: false,
      message: lang === "ID" ? "Gagal mengirim pesan." : "Failed to send message.",
    });
  }
}
