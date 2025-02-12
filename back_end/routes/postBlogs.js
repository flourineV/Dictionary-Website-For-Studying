const express = require("express");
const router = express.Router();

router.post("/articles", isAdmin, async (req, res) => {});

module.exports = router;
