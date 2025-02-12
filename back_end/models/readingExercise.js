const mongoose = require("mongoose");

const readingExerciseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    passage: { type: String, required: true }, // Đoạn văn bản reading
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String }], // Nếu là trắc nghiệm
        correctAnswer: { type: String, required: true }, // Nếu là điền từ, đây là đáp án đúng
      },
    ],
  },
  { timestamps: true }
);

const ReadingExercise = mongoose.model(
  "ReadingExercise",
  readingExerciseSchema,
  "reading_exercise"
);

module.exports = ReadingExercise;
