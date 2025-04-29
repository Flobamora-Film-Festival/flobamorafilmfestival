import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import asyncHandler from "express-async-handler";
import sendEmail from "../api/send-email.js";
import verifyTurnstile from "../api/verify-turnstile.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Endpoint untuk mengirim email
app.post(
  "/api/send-email",
  verifyTurnstile, // Tambahkan middleware verifikasi Turnstile sebelum melanjutkan
  asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, error: "Semua field harus diisi" });
      return;
    }

    const info = await sendEmail({ name, email, message });
    res.status(200).json({ success: true, info });
  })
);

// Endpoint default
app.get("/", (req, res) => {
  res.send("Backend Flobamora Film Festival jalan 🚀");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
