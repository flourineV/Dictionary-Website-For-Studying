const redisClient = require("../config/redisClient");
const { trie } = require("../models/loadTrie");

const searchWords = async (req, res) => {
  const prefix = req.params.prefix.toLowerCase();

  // Kiểm tra cache trước
  const cachedResults = await redisClient.get(prefix);
  if (cachedResults) {
    console.log(`⚡ Cache hit for: ${prefix}`);
    return res.json(JSON.parse(cachedResults));
  }

  // Nếu không có trong cache, tìm trong Trie
  console.log(`🔍 Searching Trie for: ${prefix}`);
  const results = trie.searchPrefix(prefix);

  // Lưu vào cache (thời gian sống 60 giây)
  await redisClient.set(prefix, JSON.stringify(results), { EX: 60 });

  res.json(results);
};

module.exports = { searchWords };
