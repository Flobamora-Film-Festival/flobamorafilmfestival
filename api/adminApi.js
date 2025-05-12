const API_BASE = "https://backend.flobamorafilmfestival.com/wp-json";

export const AdminApi = {
  // Login: Kirim username dan password
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

    // Tidak perlu melakukan apa-apa untuk token karena plugin akan mengatur cookie HttpOnly
    return data;
  },

  // Logout: Menghapus token dari cookie
  logout: async () => {
    // Gunakan endpoint logout dari plugin Simple JWT Login untuk menghapus cookie di server
    const response = await fetch(`${API_BASE}/simple-jwt-login/v1/logout`, {
      method: "POST",
      credentials: "include", // Pastikan cookie dikirim bersama permintaan
    });

    if (!response.ok) {
      throw new Error("Logout gagal");
    }

    return { success: true }; // Server akan menghapus cookie secara otomatis
  },

  // Get current logged-in admin info
  getCurrentAdmin: async () => {
    const response = await fetch(`${API_BASE}/wp/v2/users/me`, {
      method: "GET",
      credentials: "include", // Pastikan cookie dikirim bersama permintaan
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data admin");
    }

    const user = await response.json();

    // Pastikan hanya akun dengan peran admin yang dapat mengakses
    if (!user.roles || !user.roles.includes("administrator")) {
      throw new Error("Akun ini tidak memiliki akses administrator");
    }

    return user;
  },
};
