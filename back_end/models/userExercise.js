const mongoose = require("mongoose");

const userExerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAccount",
    required: true,
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  status: {
    type: String,
    enum: ["not-started", "completed"],
    default: "not-started",
  },
  score: { type: Number, default: 0 },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId },
      userAnswer: { type: String },
      isCorrect: { type: Boolean },
    },
  ],
});

const UserExercises = mongoose.model("UserExercises", userExerciseSchema);
module.exports = UserExercises;
