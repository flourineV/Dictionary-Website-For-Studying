const mongoose = require("mongoose");

const vocabularyExerciseSchema = new mongoose.Schema({
  category: String, // Ví dụ: "Synonyms", "Antonyms", "Phrasal Verbs"
  difficulty: String, // "easy", "medium", "hard"
  questions: [
    {
      questionText: String,
      type: { type: String, enum: ["multiple-choice", "fill-in-the-blank"] }, // Trắc nghiệm hoặc điền từ
      options: [String], // Chỉ có khi là trắc nghiệm
      correctAnswer: String,
    },
  ],
});

const VocabularyExercise = mongoose.model(
  "VocabularyExercise",
  vocabularyExerciseSchema,
  "vocabulary_exercise"
);
module.exports = VocabularyExercise;
