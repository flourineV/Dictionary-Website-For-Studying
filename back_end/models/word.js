const mongoose = require("mongoose");

// Định nghĩa Schema
const WordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  phonetics: [
    {
      text: String, // Phiên âm
      audio: String, // Liên kết tới tệp âm thanh
    },
  ],
  meanings: [
    {
      partOfSpeech: String, // Loại từ: noun, verb, etc.
      phonetic: String, // Phiên âm của loại từ
      definitions: [
        {
          definition: String, // Nghĩa
          example: String, // Ví dụ
        },
      ],
      synonyms: [String], // Đưa synonyms vào trong mỗi phần nghĩa
      antonyms: [String], // Đưa antonyms vào trong mỗi phần nghĩa
    },
  ],
});

const Word = mongoose.model("Word", WordSchema);
module.exports = Word;
