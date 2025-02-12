const fs = require("fs");
const path = require("path");
const Trie = require("./trie");

const trie = new Trie();
const filePath = path.join(__dirname, "../data/valid_words.txt");

const loadWords = () => {
  const words = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);
  words.forEach((word) => trie.insert(word.toLowerCase()));
  console.log(`✅ Loaded ${words.length} words into Trie`);
};

module.exports = { trie, loadWords };
