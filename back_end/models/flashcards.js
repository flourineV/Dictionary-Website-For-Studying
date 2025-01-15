const mongoose = require("mongoose");

//Định nghĩa Schema
const flashcardsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_account",
    required: true,
  },
  wordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "words",
    required: true,
  },
  note: { type: String },
});

const flashCards = mongoose.model("flashCards", flashcardsSchema, "flashcards");
module.exports = flashCards;
