const mongoose = require("mongoose");

//Định nghĩa Schema
const flashcardsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_account",
      required: true,
    },
    word: { type: String, required: true },
    meaning: { type: String, required: true },
  },
  { timestamps: true }
);

const flashCards = mongoose.model("flashCards", flashcardsSchema, "flashcards");
module.exports = flashCards;
