const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  isAnswer: {
    type: Boolean,
  },
});

module.exports = optionSchema;
