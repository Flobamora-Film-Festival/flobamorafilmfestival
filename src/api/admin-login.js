// Contoh Next.js API Route: /api/admin-login.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;

  try {
    const response = await fetch("https://backend.flobamorafilmfestival.com/?rest_route=/simple-jwt-login/v1/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: username,
        password,
        AUTH_KEY: process.env.SIMPLE_JWT_AUTH_KEY, // Akses variabel lingkungan
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ message: data.message || "Login gagal" });
    }

    // Kirim token ke client via cookie
    res.setHeader("Set-Cookie", `token=${data.token}; Path=/; HttpOnly; Secure; SameSite=Strict`);

    // Kirim response sukses ke client
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
