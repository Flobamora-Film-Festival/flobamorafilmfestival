const sendEmail = async (data) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "There was a problem sending the email.");
    }

    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("There was an issue sending your email. Please try again.");
  }
};

export default sendEmail;
