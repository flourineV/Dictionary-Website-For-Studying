const axios = require("axios");
const Word = require("../models/word");
const { fetchFromFreeDictionary } = require("../config/api");

const getFormattedWordData = async (word) => {
  try {
    const rawData = await fetchFromFreeDictionary(word);

    const formattedData = rawData.map((entry) => ({
      word: entry.word,
      phonetics: entry.phonetics.map((phonetic) => ({
        text: phonetic.text || "",
        audio: phonetic.audio || "",
      })),
      meanings: entry.meanings.map((meaning) => ({
        partOfSpeech: meaning.partOfSpeech || "",
        phonetic: meaning.phonetic || "",
        definitions: meaning.definitions.map((def) => ({
          definition: def.definition || "",
          example: def.example || "",
        })),
        synonyms: meaning.synonyms || [], // Đưa synonyms vào trong mỗi nghĩa
        antonyms: meaning.antonyms || [], // Đưa antonyms vào trong mỗi nghĩa
      })),
    }));

    const wordData = formattedData[0]; // Lấy dữ liệu từ kết quả

    // Lưu dữ liệu vào cơ sở dữ liệu nếu chưa có từ này
    const existingWord = await Word.findOne({ word: wordData.word });
    if (!existingWord) {
      await Word.create(wordData);
    }

    return wordData; // Trả về dữ liệu đã định dạng
  } catch (error) {
    console.error(error); // Ghi lỗi ra console để dễ dàng kiểm tra
    throw new Error(error.message);
  }
};

module.exports = { getFormattedWordData };
