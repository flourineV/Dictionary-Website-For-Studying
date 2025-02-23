const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  updateScore,
  updateWordLearned,
} = require("../controllers/userProfileController");

// Route để lấy thông tin profile người dùng
router.get("/profile/:userId", getUserProfile);
router.post("/profile", createUserProfile);
router.put("/profile/:userId", updateUserProfile);
router.patch("/score/:userId", updateScore);
router.patch("/wordLearned/:userId", updateWordLearned);

module.exports = router;
