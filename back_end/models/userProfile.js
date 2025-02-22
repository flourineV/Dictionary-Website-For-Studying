const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAccount", // Liên kết với user_account
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: "https://example.com/default-avatar.jpg",
  },
  displayName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  settings: {
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
  score: {
    type: Number,
    default: 0, // Điểm tích lũy của user
  },
  wordLearned: {
    type: Number,
    default: 0, // Số từ đã học
  },
  country: {
    // Thêm trường quốc gia
    type: String,
    maxlength: 100, // Độ dài tối đa của tên quốc gia
    default: "Unknown", // Giá trị mặc định nếu không có thông tin
  },
});

const UserProfile = mongoose.model(
  "UserProfile",
  UserProfileSchema,
  "user_profile"
);
module.exports = UserProfile;
