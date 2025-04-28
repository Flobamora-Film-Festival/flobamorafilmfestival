// src/utils/sendEmail.js

const sendEmail = async ({
  name,
  email,
  message,
  recaptchaToken,
  website = "", // honeypot
  lang = "ID",
}) => {
  // Honeypot sederhana
  if (website !== "") {
    return {
      success: false,
      message: lang === "ID" ? "Spam terdeteksi." : "Spam detected.",
    };
  }

  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        recaptchaToken,
        lang,
      }),
    });

    const data = await res.json();

    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    console.error("Error while sending email:", error);
    return {
      success: false,
      message: lang === "ID" ? "Terjadi kesalahan saat mengirim." : "An error occurred while sending.",
    };
  }
};

export default sendEmail;
