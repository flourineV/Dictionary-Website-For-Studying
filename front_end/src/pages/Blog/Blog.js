// src/pages/Blog.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import images from "../../assets/images";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Từ điển tiếng Anh: Cập nhật và tính năng mới",
      date: "2024-12-30",
      snippet:
        "Cập nhật tính năng mới cho ứng dụng từ điển giúp việc tra cứu trở nên dễ dàng hơn.",
      imageUrl: "https://via.placeholder.com/160x100",
    },
    {
      id: 2,
      title: "Cách xây dựng một ứng dụng từ điển",
      date: "2024-12-25",
      snippet:
        "Hướng dẫn chi tiết về cách tạo ứng dụng từ điển với React và Node.js.",
      imageUrl: "https://via.placeholder.com/160x100",
    },
    {
      id: 3,
      title: "Sử dụng MongoDB trong dự án từ điển",
      date: "2024-12-20",
      snippet:
        "MongDB là lựa chọn lý tưởng để lưu trữ dữ liệu cho ứng dụng từ điển.",
      imageUrl: "https://via.placeholder.com/160x100",
    },
    {
      id: 4,
      title: "Ứng dụng AI trong việc học tiếng Anh",
      date: "2024-12-18",
      snippet:
        "Khám phá cách AI đang thay đổi phương pháp học tiếng Anh và ứng dụng trong từ điển.",
      imageUrl: "https://via.placeholder.com/160x100",
    },
    {
      id: 5,
      title: "Cải tiến giao diện người dùng cho ứng dụng từ điển",
      date: "2024-12-15",
      snippet:
        "Một số mẹo về cải tiến UX/UI trong việc thiết kế ứng dụng từ điển.",
      imageUrl: "https://via.placeholder.com/160x100",
    },
    {
      id: 6,
      title: "Tương lai của từ điển kỹ thuật số",
      date: "2024-12-10",
      snippet:
        "Dự đoán về sự phát triển và ứng dụng của từ điển kỹ thuật số trong tương lai.",
      imageUrl: "https://via.placeholder.com/160x100",
    },
    {
      id: 7,
      title: "Tính năng flashcards trong ứng dụng từ điển",
      date: "2024-12-05",
      snippet:
        "Flashcards là tính năng hữu ích giúp người dùng học từ mới nhanh chóng và hiệu quả.",
      imageUrl: "https://via.placeholder.com/160x100",
    },
  ];

  const [showMore, setShowMore] = useState(false);

  const visiblePosts = showMore ? blogPosts : blogPosts.slice(0, 6);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Blog</h1>

      <div className="space-y-6">
        {visiblePosts.map((post) => (
          <div
            key={post.id}
            className="flex bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Link to={`/blog/${post.id}`} className="flex items-center w-full">
              <div className="w-1/5 h-32 overflow-hidden">
                <img
                  src={images.chatbot}
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
