const mongoose = require("mongoose");

const userExercisesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exerciseType: {
      type: String,
      enum: ["grammar", "vocabulary", "reading", "listening"],
      required: true,
    },
    exerciseId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID của bài tập cụ thể
    score: { type: Number, default: 0 },
    progress: { type: Number, default: 0 }, // % hoàn thành
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "UserExercise",
  userExercisesSchema,
  "user_exercises"
);
