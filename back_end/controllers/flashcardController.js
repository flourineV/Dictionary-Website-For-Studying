// controllers/flashcards.js
const flashcards = require("../models/flashcards");

// Handler cho việc thêm flashcard
const addFlashcard = async (req, res) => {
  try {
    const { userId } = req.params;
    const { word, meaning } = req.body;

    const existingFlashcard = await flashcards.findOne({
      userId,
      word,
    });
    if (existingFlashcard && existingFlashcard.meaning === meaning) {
      return res.status(409).json({
        error: "This word with this meaning already exists in your flashcards",
      });
    }
    const newFlashcard = new flashcards({ userId, word, meaning });
    await newFlashcard.save();

    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(500).json({ error: "Thêm flashcard thất bại" });
  }
};

//Lấy danh sách flashcards của user
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
