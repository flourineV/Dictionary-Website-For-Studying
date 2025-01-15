const axios = require("axios");

const fetchFromFreeDictionary = async (word) => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await axios.get(url, {
      socketPath: undefined, // Hủy các config IPv6 nếu có
      family: 4, // Ép chỉ dùng IPv4
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error(`No data found for the word: ${word}`);
    } else {
      throw new Error("Error fetching data from Free Dictionary");
    }
  }
};

module.exports = {
  fetchFromFreeDictionary,
};
