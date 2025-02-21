const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  progress: {
    grammar: { type: Number, default: 0 }, // % hoàn thành grammar
    vocabulary: { type: Number, default: 0 }, // % hoàn thành vocab
    reading: { type: Number, default: 0 }, // % hoàn thành reading
    listening: { type: Number, default: 0 }, // % hoàn thành listening
  },
  categories: [
    {
      type: { type: String, required: true }, // "grammar" | "vocabulary" | "reading" | "listening"
      categoryName: { type: String, required: true }, // e.g. "Tenses", "Short Passage"
      completion: { type: Number, default: 0 }, // % hoàn thành category này
      subOrTests: [
        {
          subOrTestType: { type: String, required: true },
          name: { type: String, required: true }, // Subcategory Name OR Test Name
          completion: { type: Number, default: 0 }, // % hoàn thành sub/test này
          correct: { type: Number, required: true, default: 0 }, // Tổng số câu đúng
          total: { type: Number, required: true, default: 0 }, // Tổng số câu hỏi
          accuracy: { type: Number, default: 0 }, // % đúng
          submittedAt: { type: Date, default: Date.now },
        },
      ],
    },
  ],
});

module.exports = mongoose.model(
  "UserProgress",
  userProgressSchema,
  "user_progress"
);
