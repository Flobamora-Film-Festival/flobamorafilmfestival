const API_BASE = "https://backend.flobamorafilmfestival.com/wp-json";

export const AdminApi = {
  // Login: kirim username dan password
  login: async ({ username, password }) => {
    const response = await fetch(`${API_BASE}/custom-auth/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Kirim dan terima cookie
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Login gagal");
    }

    return data;
  },

  // Logout: hapus cookie di server
  logout: async () => {
    const response = await fetch(`${API_BASE}/custom-auth/v1/logout`, {
      method: "POST",
      credentials: "include", // Kirim cookie supaya server bisa logout
    });

    if (!response.ok) {
      throw new Error("Logout gagal");
    }

    return { success: true };
  },

  // Cek user login dan role
  getCurrentAdmin: async () => {
    const response = await fetch(`${API_BASE}/custom-auth/v1/me`, {
      method: "GET",
      credentials: "include", // Pastikan cookie ikut serta
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Gagal mengambil data admin");
    }

    if (!data.user.roles || !data.user.roles.includes("administrator")) {
      throw new Error("Akun ini tidak memiliki akses administrator");
    }

    return user;
  },
};
