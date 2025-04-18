// backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendEmail } from "./sendEmail.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const info = await sendEmail({ name, email, message });
    res.status(200).json({ success: true, info });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Gagal mengirim email" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend Flobamora Film Festival jalan 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
