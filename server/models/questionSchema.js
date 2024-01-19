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
  options: [optionSchema],
});

module.exports = questionSchema;
