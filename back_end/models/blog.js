const mongoose = require("mongoose");

//define
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Ai bình luận?
        text: { type: String, required: true }, // Nội dung bình luận
        createdAt: { type: Date, default: Date.now },
      },
    ],
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Ai đánh giá?
        score: { type: Number, min: 1, max: 5 }, // Điểm đánh giá (1-5 sao)
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema, "blogs");
module.exports = Blog;
