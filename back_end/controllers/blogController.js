const Blog = require("../models/blog");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name") // Populate thông tin author
      .populate("comments.user", "name") // Populate user trong comments
      .populate("ratings.user", "name"); // Populate user trong ratings

    if (!blogs || blogs.length === 0)
      return res.status(404).json({ error: "No blogs found" });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name") // Populate thông tin author
      .populate("comments.user", "name") // Populate user trong comments
      .populate("ratings.user", "name"); // Populate user trong ratings

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    // Lấy dữ liệu từ body của request
    const { title, introduction, content, author, image } = req.body;

    // Kiểm tra xem tất cả các trường có đầy đủ không
    if (!title || !introduction || !content || !author || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Tạo mới một blog
    const newBlog = new Blog({ title, introduction, content, author, image });

    // Lưu blog vào database
    await newBlog.save();

    // Trả lại blog vừa được tạo
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Kiểm tra quyền sở hữu blog
    if (blog.author.toString() !== req.user.id && !req.user.isAdmin) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this blog" });
    }

    // Cập nhật blog
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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

    // Trả về blog sau khi thêm comment
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
