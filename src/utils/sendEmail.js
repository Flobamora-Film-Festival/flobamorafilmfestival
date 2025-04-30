// src/utils/sendEmail.js
const sendEmail = async (data) => {
  const response = await fetch("http://localhost:3001/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export default sendEmail;
