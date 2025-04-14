const express = require("express");
const { sendEmail } = require("../controllers/emailController"); // Path ke controller
const router = express.Router();

router.post("/send-email", sendEmail); // Menangani POST request untuk mengirim email

module.exports = router;
