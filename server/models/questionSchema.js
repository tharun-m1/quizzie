const mongoose = require("mongoose");
const optionSchema = require("./optionSchema.js");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  optionType: {
    type: String,
    enum: ["txt", "img", "txtimg"],
    required: true,
  },
  attempted: {
    type: Number,
    default: 0,
  },
  correct: {
    type: Number,
    default: 0,
  },
  incorrect: {
    type: Number,
    default: 0,
  },
  options: [optionSchema],
});

module.exports = questionSchema;
