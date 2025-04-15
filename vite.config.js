import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Memisahkan dependensi node_modules ke dalam chunk terpisah
          if (id.includes("node_modules")) {
            // Menggunakan nama paket untuk chunk
            return id.toString().split("node_modules/")[1].split("/")[0];
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Meningkatkan batas peringatan chunk ke 1000 kB (1MB)
  },
});
