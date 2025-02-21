const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post(
  "/update-progress",
  authMiddleware,
  progressController.updateProgress
);
router.get(
  "/get-progress/:userId",
  authMiddleware,
  progressController.getProgress
);
module.exports = router;
