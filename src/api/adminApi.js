const API_BASE = "https://backend.flobamorafilmfestival.com/wp-json";

export const AdminApi = {
  // Login: Kirim username dan password, simpan cookie JWT
  login: async ({ username, password }) => {
    const response = await fetch(`${API_BASE}/custom/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // penting agar cookie JWT dikirim dan disimpan
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Login gagal");
    }

    return data;
  },

  // Logout: hapus cookie JWT
  logout: async () => {
    const response = await fetch(`${API_BASE}/custom/v1/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Logout gagal");
    }

    return data;
  },

  // Ambil data admin yang sedang login
  getCurrentAdmin: async () => {
    const response = await fetch(`${API_BASE}/wp/v2/users/me`, {
      method: "GET",
      credentials: "include",
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
