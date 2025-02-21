// src/pages/Blog.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../utils/blogApi"; // Import hàm từ utils/api

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu blog từ API khi component mount
    const fetchBlogs = async () => {
      const blogs = await getAllBlogs();
      setBlogPosts(blogs); // Cập nhật state với dữ liệu blog
    };

    fetchBlogs();
  }, []); // Chạy một lần khi component mount

  const visiblePosts = showMore ? blogPosts : blogPosts.slice(0, 6);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Blog</h1>

      <div className="space-y-6">
        {visiblePosts.map((post) => (
          <div
            key={post._id} // Giả sử `_id` là id của blog trong database
            className="flex bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Link to={`/blog/${post._id}`} className="flex items-center w-full">
              <div className="w-1/5 h-32 overflow-hidden">
                <img
                  src={post.imageUrl || "https://via.placeholder.com/160x100"} // Sử dụng ảnh từ blog, fallback nếu không có
                  alt={post.title}
                  className="object-cover w-full h-full rounded-l-lg"
                />
              </div>
              <div className="w-4/5 p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm">{post.date}</p>
                <p className="mt-2 text-gray-700">{post.snippet}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {blogPosts.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            {showMore ? "Thu gọn" : "Xem thêm"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
