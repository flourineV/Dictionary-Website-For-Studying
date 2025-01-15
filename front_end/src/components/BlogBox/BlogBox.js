import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Để chuyển hướng người dùng đến bài viết chi tiết

const BlogBox = ({ images, title, content, buttonText, onClick, blogLink }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Bắt đầu từ phần tử ảo đầu tiên
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Tạo danh sách ảnh bao gồm phần tử ảo đầu và cuối
  const extendedImages =
    images.length > 1
      ? [images[images.length - 1], ...images, images[0]] // Mảng mở rộng
      : images; // Nếu chỉ có 1 ảnh, giữ nguyên

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      handleNextSlide();
    }, 4000); // Chuyển ảnh mỗi 4 giây

    return () => clearInterval(interval); // Clear interval khi component unmount
  }, [images]);

  const handleNextSlide = () => {
    if (images.length <= 1 || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevSlide = () => {
    if (images.length <= 1 || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    // Nếu ở phần tử ảo đầu hoặc cuối, quay lại phần tử thực
    if (currentIndex === 0) {
      setCurrentIndex(images.length); // Quay về ảnh cuối cùng thực
    } else if (currentIndex === images.length + 1) {
      setCurrentIndex(1); // Quay về ảnh đầu tiên thực
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xl border-2 border-blue-950"
      style={{ height: "350px" }} // Đặt chiều cao cố định cho box hình chữ nhật
    >
      {/* Slider section */}
      <div className="relative w-full h-48 overflow-hidden">
        <div
          className={`flex transition-transform duration-500 ease-in-out ${
            isTransitioning ? "" : "transition-none"
          }`}
          style={{
            transform: `translateX(${
              images.length > 1 ? -currentIndex * 100 : 0
            }%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover flex-shrink-0"
              style={{ flex: "0 0 100%" }}
            />
          ))}
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 flex flex-col justify-between h-full">
        <h3 className="text-2xl font-semibold text-blue-950 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{content}</p>
        <Link to={blogLink} className="block">
          <button
            onClick={onClick}
            className="w-full bg-red-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white hover:text-red-500 transition-all duration-300"
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogBox;
