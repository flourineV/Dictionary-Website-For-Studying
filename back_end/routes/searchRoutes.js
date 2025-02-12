const express = require("express");
const { searchWords } = require("../controllers/searchController");

const router = express.Router();

router.get("/:prefix", searchWords);

module.exports = router;
