// src/pages/BlogDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Để lấy blogId từ URL
import { getBlogById } from "../../utils/blogApi"; // Hàm API lấy chi tiết blog

const BlogDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      const fetchedBlog = await getBlogById(id); // Lấy thông tin chi tiết blog từ API
      setBlog(fetchedBlog); // Lưu thông tin vào state
    };

    fetchBlogDetail();
  }, [id]); // Chạy lại khi id thay đổi

  // Kiểm tra nếu chưa có blog để hiển thị
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-6">{blog.title}</h1>
      <p className="text-gray-500 text-sm">{blog.date}</p>
      <div className="my-4">
        <img
          src={blog.imageUrl || "https://via.placeholder.com/160x100"} // Sử dụng ảnh của blog, nếu không có dùng placeholder
          alt={blog.title}
          className="object-cover w-full h-60 rounded-lg"
        />
      </div>
      <p className="text-gray-700 mt-4">{blog.content}</p>

      {/* Nếu có các bình luận hoặc đánh giá, có thể hiển thị chúng ở đây */}
    </div>
  );
};

export default BlogDetail;
