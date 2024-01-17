const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
// ============================================================
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "All Good.",
  });
});
// ============================Routes==============================
app.use("/", authRoutes);

// ================================================================

// ====================Error Handler===============================
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({
    status,
    message,
  });
});
// ================================================================
app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log(`server running at http://localhost:${process.env.PORT}`)
    )
    .catch((err) => {
      console.log("Connection Error\n", err);
    });
});
