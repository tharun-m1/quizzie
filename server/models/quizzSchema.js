const mongoose = require("mongoose");
const questionSchema = require("./questionSchema.js");

const quizzSchema = new mongoose.Schema(
  {
    quizName: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = quizzSchema;
