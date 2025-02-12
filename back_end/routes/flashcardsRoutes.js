const express = require("express");
const router = express.Router();
const {
  addFlashcard,
  getFlashcardsByUser,
} = require("../controllers/flashcardController");

// Route để thêm flashcard
router.post("/:userId", addFlashcard);

// Route để lấy danh sách flashcards của user
router.get("/:userId", getFlashcardsByUser);

module.exports = router;
