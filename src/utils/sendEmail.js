// src/utils/sendEmail.js
export async function sendEmail({ name, email, message, lang = "ID" }) {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message, lang }),
    });

    const text = await res.text();

    return {
      success: res.ok,
      message: text,
    };
  } catch (err) {
    console.error("sendEmail error:", err);
    return {
      success: false,
      message: lang === "ID" ? "Terjadi kesalahan." : "An error occurred.",
    };
  }
}
