const mongoose = require("mongoose");

const vocabularyExerciseSchema = new mongoose.Schema({
  category: String, // Ví dụ: "Synonyms", "Antonyms", "Phrasal Verbs"
  subcategories: [
    {
      name: String, // Ví dụ: "Present Simple", "Past Simple"
      difficulty: String, // "easy", "medium", "hard"
      questions: [
        {
          questionText: String,
          options: [String],
          correctAnswer: String,
        },
      ],
    },
  ],
});

const VocabularyExercise = mongoose.model(
  "VocabularyExercise",
  vocabularyExerciseSchema,
  "vocabulary_exercise"
);
module.exports = VocabularyExercise;
