export const sendEmail = async ({ name, email, message }) => {
  const res = await fetch("https://flobamorafilmfestival.com/send-email.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ name, email, message }).toString(),
  });

  const data = await res.json();
  return {
    success: data.success,
    message: data.message,
  };
};
