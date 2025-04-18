export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is missing" });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (!data.success || data.score < 0.5) {
      return res.status(403).json({ message: "Failed reCAPTCHA verification", score: data.score });
    }

    return res.status(200).json({ success: true, score: data.score });
  } catch (error) {
    console.error("reCAPTCHA error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
