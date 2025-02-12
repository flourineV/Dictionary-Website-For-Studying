const mongoose = require("mongoose");

const grammarExerciseSchema = new mongoose.Schema({
  category: String, // Ví dụ: "Tenses"
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

const GrammarExercise = mongoose.model(
  "GrammarExercise",
  grammarExerciseSchema,
  "grammar_exercise"
);
module.exports = GrammarExercise;
