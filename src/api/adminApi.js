const API_BASE = "https://backend.flobamorafilmfestival.com/wp-json";

// Helper untuk mendapatkan token dari cookie
const getTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  if (tokenCookie) {
    return tokenCookie.split("=")[1];
  }
  return null;
};

export const AdminApi = {
  // Login: Kirim username dan password, simpan cookie JWT
  login: async ({ username, password }) => {
    const response = await fetch(`${API_BASE}/simple-jwt-login/v1/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: username,
        password,
        AUTH_KEY: process.env.SIMPLE_JWT_AUTH_KEY, // Mengambil AUTH_KEY dari variabel lingkungan
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Login gagal");
    }

    // Jika berhasil, token JWT akan disimpan di cookie (sudah diatur di server)
    return data;
  },

  // Logout: hapus cookie JWT (tidak ada endpoint logout di Simple JWT Login)
  logout: async () => {
    // Menghapus token dari cookie
    document.cookie = "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
    return { success: true }; // Tidak ada response spesifik dari server
  },

  // Ambil data admin yang sedang login
  getCurrentAdmin: async () => {
    const token = getTokenFromCookie();
    if (!token) {
      throw new Error("Token tidak ditemukan. Harus login terlebih dahulu.");
    }

    const response = await fetch(`${API_BASE}/wp/v2/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Menggunakan token JWT untuk otentikasi
      },
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data admin");
    }

    const user = await response.json();

    // Pastikan hanya role administrator yang diizinkan
    if (!user.roles || !user.roles.includes("administrator")) {
      throw new Error("Akun ini tidak memiliki akses administrator");
    }

    return user;
  },
};
