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

    // At this point, the Simple JWT Login plugin automatically handles the cookie
    return data;
  },

  // Logout: Menghapus token dari cookie
  logout: async () => {
    // The plugin handles this, you can simply clear the cookie manually if needed:
    document.cookie = "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
    return { success: true };
  },

  // Get current logged-in admin info
  getCurrentAdmin: async () => {
    const response = await fetch(`${API_BASE}/wp/v2/users/me`, {
      method: "GET",
      headers: {
        // The HttpOnly cookie will be sent automatically with the request
        Authorization: `Bearer ${getTokenFromCookie()}`, // Optional: this is just for demonstration if needed
      },
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data admin");
    }

    const user = await response.json();

    // Make sure only admin roles can access
    if (!user.roles || !user.roles.includes("administrator")) {
      throw new Error("Akun ini tidak memiliki akses administrator");
    }

    return user;
  },
};
