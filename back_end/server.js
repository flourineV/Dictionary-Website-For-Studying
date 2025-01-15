require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const { connectDB } = require("./config/db.js");

app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes.js");
const wordRoutes = require("./routes/wordRoutes.js");
const translateRoutes = require("./routes/translateRoutes.js");
connectDB();

app.get("/api/word/:word", wordRoutes);

app.use("/api/user", userRoutes);

app.post("/translate", translateRoutes);

const Port = process.env.PORT;
app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
