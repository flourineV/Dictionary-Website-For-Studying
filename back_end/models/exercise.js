const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, required: true },
  type: { type: String, enum: ["multiple-choice", "written"], required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [String], // Only for multiple-choice questions
      correctAnswer: { type: String, required: true },
    },
  ],
});

const Exercises = mongoose.model("Exercises", exerciseSchema);
module.exports = Exercises;
