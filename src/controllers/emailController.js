const nodemailer = require("nodemailer");

// Konfigurasi transporter untuk mengirim email
const transporter = nodemailer.createTransport({
  host: "smtp.niagahoster.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@flobamorafestival.com",
    pass: "yanguruswebsitef3", // Ganti dengan password asli kamu
  },
});

const sendEmail = (req, res) => {
  const { name, email, message, lang = "id" } = req.body;

  // Pilih teks berdasarkan bahasa
  const texts = {
    id: {
      subject: "Pesan Baru dari Website Flobamora Film Festival",
      error: "Terjadi kesalahan saat mengirim email",
      success: "Email berhasil dikirim",
      labelName: "Nama",
      labelEmail: "Email",
      labelMessage: "Pesan",
    },
    en: {
      subject: "New Message from Flobamora Film Festival Website",
      error: "An error occurred while sending the email",
      success: "Email sent successfully",
      labelName: "Name",
      labelEmail: "Email",
      labelMessage: "Message",
    },
  };

  const t = texts[lang] || texts.id; // default to Indonesian

  const mailOptions = {
    from: "info@flobamorafestival.com",
    to: "info@flobamorafestival.com",
    subject: t.subject,
    text: `${t.labelName}: ${name}\n${t.labelEmail}: ${email}\n${t.labelMessage}: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(t.error);
    }
    res.status(200).send(t.success);
  });
};

module.exports = { sendEmail };
