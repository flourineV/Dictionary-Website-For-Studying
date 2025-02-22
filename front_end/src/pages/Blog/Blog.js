import React, { useState, useEffect } from "react";
import { getAllBlogs } from "../../utils/blogApi"; // Import hàm từ utils/api
import BlogCard from "../../components/Blogcard";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Lấy dữ liệu blog từ API khi component mount
    const fetchBlogs = async () => {
      try {
        const blogs = await getAllBlogs();
        setBlogPosts(blogs); // Cập nhật state với dữ liệu blog từ API
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []); // Chạy một lần khi component mount

  const visiblePosts = showMore ? blogPosts : blogPosts.slice(0, 4); // Hiển thị 4 bài đầu

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-white text-4xl font-extrabold mb-8 text-center mt-5">
        BLOGS
      </h1>
      <h2 className="text-white text-xl font-light -mt-3 text-center">
        The things to improve your understanding
      </h2>
      <div className="bg-gray-300 h-[1px] w-[500px] mx-auto mt-10"></div>

      {/* Grid container */}
      <div className="grid grid-cols-2  gap-8 mt-10">
        {visiblePosts.map((blog) => (
          <BlogCard
            key={blog._id} // Sử dụng _id từ dữ liệu trả về
            title={blog.title}
            introduction={blog.introduction}
            content={blog.content}
            author={blog.author ? blog.author.name : "Unknown"} // Nếu không có author thì hiển thị "Unknown"
            rating={0} // Không có rating trong dữ liệu hiện tại, bạn có thể thay đổi nếu có thông tin đánh giá
            imageUrl={blog.image}
            authorImage={blog.authorImage} // Bạn có thể cập nhật ảnh tác giả nếu có thông tin
            timeAgo={new Date(blog.createdAt).toLocaleDateString()} // Hiển thị ngày tạo
          />
        ))}
      </div>

      {/* Show More button */}
      {blogPosts.length > 4 && !showMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowMore(true)}
            className="text-blue-500 font-semibold"
          >
            Xem thêm
          </button>
        </div>
      )}
      {showMore && blogPosts.length > 4 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowMore(false)}
            className="text-blue-500 font-semibold"
          >
            Thu gọn
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
