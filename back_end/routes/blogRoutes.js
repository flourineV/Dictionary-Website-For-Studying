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

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

// Routes cho comment & rating
router.post("/:id/comments", addComment);
router.post("/:id/ratings", addRating);

module.exports = router;
