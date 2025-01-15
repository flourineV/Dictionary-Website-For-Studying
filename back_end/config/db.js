require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/dictionary_proj")
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("MongoDB connection error:", err));
};

module.exports = { connectDB };
