// /api/sendEmail.js

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Membuat transporter untuk kirim email
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Gantilah dengan email dari Niagahoster
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Gantilah dengan alamat email penerima
      subject: "Pesan Baru dari Website Flobamora Film Festival",
      html: `
        <h3>Pesan dari: ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email berhasil dikirim!" });
    } catch (error) {
      res.status(500).json({ error: "Gagal mengirim email" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
