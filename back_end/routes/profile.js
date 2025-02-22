const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} = require("../controllers/userProfileController");

// Route để lấy thông tin profile người dùng
router.get("/profile/:userId", getUserProfile);

// Route để tạo mới profile người dùng
router.post("/profile", createUserProfile);
router.put("/profile/:userId", updateUserProfile);

module.exports = router;
