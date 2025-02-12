const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  progress: {
    grammar_quiz: { type: Number, default: 0 }, // % tổng của bài tập ngữ pháp
    vocab_quiz: { type: Number, default: 0 }, // % tổng của bài tập từ vựng
    reading: { type: Number, default: 0 },
    listening: { type: Number, default: 0 },
    writing: { type: Number, default: 0 }, // Thêm mục writing
    blog_reading: { type: Number, default: 0 }, // % bài blog đã đọc
  },
});

module.exports = mongoose.model("UserProgress", userProgressSchema);
