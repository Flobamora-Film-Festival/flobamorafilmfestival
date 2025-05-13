const API_BASE = "https://backend.flobamorafilmfestival.com/wp-json";

export const AdminApi = {
  // Login: Kirim username dan password
  login: async ({ username, password }) => {
    try {
      const response = await fetch(`${API_BASE}/custom-auth/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Kirim kredensial bersama permintaan
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // Cek apakah response OK (status 200)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Login gagal");
      }

      // Mendapatkan data dari response jika berhasil
      const data = await response.json();

      // Mengembalikan data login jika berhasil
      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error; // Melemparkan error untuk ditangani di tempat lain
    }
  },

  // Logout: Menghapus cookie dari server
  logout: async () => {
    try {
      const response = await fetch(`${API_BASE}/custom-auth/v1/logout`, {
        method: "POST",
        credentials: "include", // Kirimkan kredensial bersama permintaan
      });

      // Cek apakah response OK (status 200)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Logout gagal");
      }

      // Jika logout berhasil
      return { success: true };
    } catch (error) {
      console.error("Logout Error:", error);
      throw error; // Melemparkan error untuk ditangani di tempat lain
    }
  },

  // Get current logged-in admin info
  getCurrentAdmin: async () => {
    try {
      const response = await fetch(`${API_BASE}/custom-auth/v1/me`, {
        method: "GET",
        credentials: "include", // Kirim kredensial bersama permintaan
      });

      // Cek apakah response OK (status 200)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Gagal mengambil data admin");
      }

      const user = await response.json();

      // Pastikan user memiliki role "administrator"
      if (!user.roles || !user.roles.includes("administrator")) {
        throw new Error("Akun ini tidak memiliki akses administrator");
      }

      return user;
    } catch (error) {
      console.error("Get Current Admin Error:", error);
      throw error; // Melemparkan error untuk ditangani di tempat lain
    }
  },
};
