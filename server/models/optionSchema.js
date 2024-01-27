const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  isAnswer: {
    type: Boolean,
  },
  imgUrl: {
    type: String,
    default: "",
  },
  votes: {
    type: Number,
    default: 0,
  },
});

module.exports = optionSchema;
