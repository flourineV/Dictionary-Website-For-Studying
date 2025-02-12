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
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
module.exports = UserProfile;
