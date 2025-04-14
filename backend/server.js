const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sendEmail } = require("./sendEmail");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-email", sendEmail);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
