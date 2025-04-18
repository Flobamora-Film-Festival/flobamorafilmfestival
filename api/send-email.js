// api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { name, email, message, lang } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send(lang === "ID" ? "Data tidak lengkap." : "Incomplete data.");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Pesan dari Flobamora Film Festival (${name})`,
      text: message,
    });

    res.status(200).send(lang === "ID" ? "Pesan berhasil dikirim." : "Message sent successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send(lang === "ID" ? "Gagal mengirim pesan." : "Failed to send message.");
  }
}
