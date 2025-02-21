const mongoose = require("mongoose");

// Define schema for Blog
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    introduction: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { type: String, required: true }, // Thêm trường lưu URL ảnh
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
    likes: { type: Number, default: 0 }, // Số lượt thích
    shares: { type: Number, default: 0 }, // Số lượt chia sẻ
    viewCount: { type: Number, default: 0 }, // Số lượt xem
  },
  { timestamps: true }
);

// Thêm phương thức tính điểm trung bình của đánh giá
blogSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) return 0;
  const totalScore = this.ratings.reduce(
    (sum, rating) => sum + rating.score,
    0
  );
  return totalScore / this.ratings.length;
};

// Thêm phương thức tăng số lượt xem
blogSchema.methods.incrementViewCount = function () {
  this.viewCount += 1;
  return this.save(); // Lưu lại sau khi thay đổi
};

// Virtual field để lấy điểm trung bình đánh giá (khi gọi blog này sẽ tự tính điểm)
blogSchema.virtual("averageRating").get(function () {
  return this.calculateAverageRating();
});

const Blog = mongoose.model("Blog", blogSchema, "blogs");

module.exports = Blog;
