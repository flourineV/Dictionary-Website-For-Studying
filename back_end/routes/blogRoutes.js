const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment,
  addRating,
} = require("../controllers/blogController");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", authMiddleware, adminMiddleware, createBlog);
router.put("/blogs/:id", adminMiddleware, updateBlog);
router.delete("/blogs/:id", adminMiddleware, deleteBlog);

// Routes cho comment & rating
router.post("/blogs/:id/comments", addComment);
router.post("/blogs/:id/ratings", addRating);

module.exports = router;
