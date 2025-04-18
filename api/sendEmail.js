// api/sendEmail.js
import nodemailer from "nodemailer";

export async function sendEmail({ name, email, message }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // Diambil dari environment variable Vercel
      pass: process.env.EMAIL_PASS, // Diambil dari environment variable Vercel
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER, // Mengirim email ke email yang sudah kamu tentukan di Vercel
    subject: "Pesan Baru dari Website Flobamora Film Festival",
    html: `
      <h3>Pesan dari: ${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Pesan:</strong></p>
      <p>${message}</p>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
