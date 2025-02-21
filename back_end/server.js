require("dotenv").config();
const { SessionsClient } = require("@google-cloud/dialogflow-cx");

const express = require("express");
const cors = require("cors");

const app = express();
const { connectDB } = require("./config/db.js");

app.use(express.json());
app.use(cors());

const { loadWords } = require("./models/loadTrie");
const client = new SessionsClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const wordRoutes = require("./routes/wordRoutes.js");
const translateRoutes = require("./routes/translateRoutes.js");
const flashcardsRoutes = require("./routes/flashcardsRoutes.js");
const searchRoutes = require("./routes/searchRoutes");
const blogRoutes = require("./routes/blogRoutes.js");
const exerciseRoutes = require("./routes/exerciseRoutes.js");
const progressRoutes = require("./routes/progressRoutes.js");

connectDB();
loadWords();

app.get("/api/word/:word", wordRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.post("/translate", translateRoutes);
app.use("/api/flashcards", flashcardsRoutes);
app.use("/search", searchRoutes);
app.use("/api", blogRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api", progressRoutes);

const Port = process.env.PORT;
app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
