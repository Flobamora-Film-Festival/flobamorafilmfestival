const API_BASE = "https://backend.flobamorafilmfestival.com/wp-json";

export const AdminApi = {
  // Login: Kirim username dan password
  login: async ({ username, password }) => {
    const response = await fetch(`${API_BASE}/custom-auth/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Login gagal");
    }

    // Tidak perlu melakukan apa-apa untuk token karena plugin custom yang mengatur cookie HttpOnly
    return data;
  },

  // Logout: Menghapus cookie dari server
  logout: async () => {
    const response = await fetch(`${API_BASE}/custom-auth/v1/logout`, {
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
    const response = await fetch(`${API_BASE}/custom-auth/v1/me`, {
      method: "GET",
      credentials: "include", // Pastikan cookie dikirim bersama permintaan
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data admin");
    }

    const user = await response.json();
    console.log("Current Admin Data:", user); // Debugging untuk melihat data yang diterima

    // Pastikan hanya akun dengan peran admin yang dapat mengakses
    if (!user.roles || !user.roles.includes("administrator")) {
      throw new Error("Akun ini tidak memiliki akses administrator");
    }

    return user;
  },
};
