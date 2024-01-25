const mongoose = require("mongoose");
const questionSchema = require("./questionSchema.js");

const quizzSchema = new mongoose.Schema(
  {
    quizzName: {
      type: String,
    },
    quizzType: {
      type: String,
      enum: ["qna", "poll"],
      required: true,
    },
    questions: [questionSchema],
    impressions: {
      type: Number,
      default: 0,
    },
    adminId: {
      type: mongoose.Types.ObjectId,
    },
    timer: {
      type: String,
      enum: ["5", "10", "off"],
      default: "off",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Quizz = new mongoose.model("Quizz", quizzSchema);
module.exports = Quizz;
