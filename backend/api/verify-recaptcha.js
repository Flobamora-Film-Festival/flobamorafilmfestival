//backend/api/verify-recaptcha.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({ message: "Invalid content type" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(403).json({ message: "Failed Turnstile verification" });
    }

    if (data.score < 0.5) {
      return res.status(403).json({ message: "Low score in Turnstile verification", score: data.score });
    }

    return res.status(200).json({ success: true, score: data.score });
  } catch (error) {
    console.error("Turnstile verification error:", error.message || error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
