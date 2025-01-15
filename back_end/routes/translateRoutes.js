const express = require("express");
const axios = require("axios");
const router = express.Router();
const { translate } = require("@vitalets/google-translate-api");

router.post("/translate", async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  if (!text || !sourceLang || !targetLang) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("Translating:", text, "from", sourceLang, "to", targetLang);
    const response = await translate(text, {
      from: sourceLang,
      to: targetLang,
    });

    console.log("Translation success:", response.text);
    res.status(200).json({ translatedText: response.text });
  } catch (error) {
    console.error("Translation error:", error);
    res
      .status(500)
      .json({ error: "Translation failed.", message: error.message });
  }
});

module.exports = router;
