const mongoose = require("mongoose");

const listeningExerciseSchema = new mongoose.Schema(
  {
    category: { type: String, required: true }, // "Short Audio" | "Long Audio"
    tests: [
      {
        name: { type: String, required: true }, // "Test 1", "Test 2"
        audioUrl: { type: String, required: true }, // Link file audio
        transcript: { type: String, default: null }, // Lời thoại (nếu có)
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

const ListeningExercise = mongoose.model(
  "ListeningExercise",
  listeningExerciseSchema,
  "listening_exercise"
);

module.exports = ListeningExercise;
