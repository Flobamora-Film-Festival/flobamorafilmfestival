// utils/sendEmail.js

export const sendEmail = async ({
  name,
  email,
  message,
  recaptchaToken,
  website = "", // honeypot
  lang = "ID",
}) => {
  try {
    const res = await fetch("https://flobamorafilmfestival.com/send-email.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        recaptchaToken,
        website,
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
