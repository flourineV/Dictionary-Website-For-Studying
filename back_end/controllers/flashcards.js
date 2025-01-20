// controllers/flashcards.js
const flashcards = require("../models/flashcards");

// Handler cho việc thêm flashcard
const addFlashcard = async (req, res) => {
  try {
    const { userId } = req.params;
    const { word, meaning } = req.body;
    const newFlashcard = new flashcards({ userId, word, meaning });
    await newFlashcard.save();
    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(500).json({ error: "Thêm flashcard thất bại" });
  }
};

// Handler cho việc lấy danh sách flashcards
const getFlashcardsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const flashcardsList = await flashcards.find({ userId });
    res.status(200).json(flashcardsList);
  } catch (error) {
    res.status(500).json({ error: "Lấy danh sách flashcard thất bại" });
  }
};

module.exports = { addFlashcard, getFlashcardsByUser };
