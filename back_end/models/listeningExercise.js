const mongoose = require("mongoose");

const listeningExerciseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    audioUrl: { type: String, required: true }, // Link file audio
    transcript: { type: String, default: null }, // Lời thoại (có thể có hoặc không)
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

const ListeningExercise = mongoose.model(
  "ListeningExercise",
  listeningExerciseSchema,
  "listening_exercise"
);

module.exports = ListeningExercise;
