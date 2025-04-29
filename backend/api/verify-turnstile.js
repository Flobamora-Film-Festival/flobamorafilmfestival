//backend/api/verify-turnstile.js
import fetch from "node-fetch"; // Pastikan node-fetch terinstal

const verifyTurnstile = async (req, res, next) => {
  const { turnstileToken } = req.body;

  if (!turnstileToken) {
    return res.status(400).json({
      success: false,
      message: "Token Turnstile tidak ditemukan.",
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
        message: "Verifikasi Turnstile gagal. Silakan coba lagi.",
      });
    }

    next(); // Verifikasi berhasil, lanjutkan ke handler berikutnya
  } catch (error) {
    console.error("Turnstile verification error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Gagal memverifikasi Turnstile. Silakan coba lagi.",
    });
  }
};

export default verifyTurnstile;
