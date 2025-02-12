const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: "127.0.0.1", // Hoặc 'localhost'
    port: 6379,
  },
});

client.on("error", (err) => console.error("❌ Redis error:", err));
client.on("connect", () => console.log("✅ Connected to Redis"));

(async () => {
  try {
    await client.connect();
    console.log("🚀 Redis client connected successfully");
  } catch (err) {
    console.error("❌ Failed to connect Redis:", err);
  }
})();

module.exports = client;
