const express = require("express");
const router = express.Router();

const { getFormattedWordData } = require("../services/wordService");

router.get("/api/word/:word", async (req, res) => {
  const { word } = req.params;
  try {
    const result = await getFormattedWordData(word);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
