const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const ExerciseController = require("../controllers/exerciseController");

// User routes
router.get("/user", authMiddleware, ExerciseController.getUserExercises);
router.put(
  "/user/update-progress",
  authMiddleware,
  ExerciseController.updateProgress
);

// Admin routes
router.post(
  "/admin/:type",
  authMiddleware,
  adminMiddleware,
  ExerciseController.createExercise
);
router.put(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  ExerciseController.updateExercise
);
router.delete(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  ExerciseController.deleteExercise
);
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  ExerciseController.getAllExercises
);

module.exports = router;
