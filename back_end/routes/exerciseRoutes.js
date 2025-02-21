const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const ExerciseController = require("../controllers/exerciseController");

// 🟢 User Routes
router.get("/user/:type", authMiddleware, ExerciseController.getUserExercises);

// Lấy danh sách subcategories theo category
router.get(
  "/user/:type/category/:category",
  authMiddleware,
  ExerciseController.getUserExercises
);

// Lấy danh sách câu hỏi theo subcategory
router.get(
  "/user/:type/category/:category/subcategory/:subcategory",
  authMiddleware,
  ExerciseController.getUserExercises
);

// 🟢 Routes dành riêng cho Reading & Listening

router.get(
  "/user/:type/category/:category/test/:test",
  authMiddleware,
  ExerciseController.getUserExercises
);

router.put(
  "/user/update-progress",
  authMiddleware,
  ExerciseController.updateProgress
);

// 🟢 Admin Routes
router.post(
  "/admin/:type",
  authMiddleware,
  adminMiddleware,
  ExerciseController.createExercise
);
router.put(
  "/admin/:type/:id",
  authMiddleware,
  adminMiddleware,
  ExerciseController.updateExercise
);
router.delete(
  "/admin/:type/:id",
  authMiddleware,
  adminMiddleware,
  ExerciseController.deleteExercise
);
router.get(
  "/admin/:type",
  authMiddleware,
  adminMiddleware,
  ExerciseController.getAllExercises
);

module.exports = router;
