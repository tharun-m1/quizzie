const mongoose = require("mongoose");
const optionSchema = require("./optionSchema");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  optionType: {
    type: String,
    enum: ["txt", "img", "txtimg"],
  },
  options: [optionSchema],
});

module.exports = questionSchema;
