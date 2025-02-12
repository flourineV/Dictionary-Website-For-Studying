const express = require("express");
const { getUsers, deleteUsers } = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

module.exports = router;
