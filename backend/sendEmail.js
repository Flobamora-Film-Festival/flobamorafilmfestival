const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.niagahoster.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@flobamorafestival.com",
    pass: "yanguruswebsitef3", // Ganti ini!
  },
});

const sendEmail = (req, res) => {
  const { name, email, message, lang = "id" } = req.body;

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

  const t = texts[lang] || texts.id;

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
