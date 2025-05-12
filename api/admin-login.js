// adminApi.js
export const AdminApi = {
  login: async ({ username, password }) => {
    const response = await fetch("/api/admin-login", {
      // Pastikan ini menuju ke API route Next.js
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Jika login berhasil, Anda bisa menyimpan token atau status login jika perlu
    return data;
  },

  // Fungsi untuk mengambil data admin yang sedang login
  getCurrentAdmin: async () => {
    const response = await fetch("/api/current-admin", {
      method: "GET",
      credentials: "same-origin", // Agar cookie ikut terbawa
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Not authenticated");
    }
    return data;
  },

  logout: async () => {
    await fetch("/api/logout", { method: "POST" });
  },
};
