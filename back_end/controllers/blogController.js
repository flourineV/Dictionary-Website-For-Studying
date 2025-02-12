const Blog = require("../models/blog");

// Lấy danh sách blog
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy một blog theo ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Tạo blog mới
exports.createBlog = async (req, res) => {
  try {
    const { title, introduction, content, author } = req.body;
    if (!title || !introduction || !content || !author) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBlog = new Blog({ title, introduction, content, author });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật blog
exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Xóa blog
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;
    const userId = req.user.id; // Giả sử user đã đăng nhập

    if (!text)
      return res.status(400).json({ error: "Comment cannot be empty" });

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.comments.push({ user: userId, text });
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addRating = async (req, res) => {
  try {
    const { score } = req.body;
    const { id } = req.params;
    const userId = req.user.id; // Giả sử user đã đăng nhập

    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ error: "Score must be between 1 and 5" });
    }

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Kiểm tra nếu user đã đánh giá trước đó -> cập nhật
    const existingRating = blog.ratings.find(
      (r) => r.user.toString() === userId
    );
    if (existingRating) {
      existingRating.score = score;
    } else {
      blog.ratings.push({ user: userId, score });
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
