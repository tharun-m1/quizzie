const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const quizzRoutes = require("./routes/quizzRoutes");
const liveQuizRoutes = require("./routes/liveQuizRoutes");
const cors = require("cors");
// ============================================================
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "All Good.",
  });
});
// ============================Routes==============================
app.use("/", authRoutes);
app.use("/", quizzRoutes);
app.use("/", liveQuizRoutes);
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
