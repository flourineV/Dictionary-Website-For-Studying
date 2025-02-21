const mongoose = require("mongoose");

const readingExerciseSchema = new mongoose.Schema(
  {
    category: { type: String, required: true }, // "Short Passage" | "Long Passage"
    tests: [
      {
        name: { type: String, required: true }, // "Test 1", "Test 2"
        passage: { type: String, required: true }, // Đoạn văn bản cho bài test
        questions: [
          {
            questionText: { type: String, required: true },
            options: [{ type: String }], // Nếu là trắc nghiệm
            correctAnswer: { type: String, required: true }, // Nếu là điền từ, đây là đáp án đúng
          },
        ],
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
