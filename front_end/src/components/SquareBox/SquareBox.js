import React, { useState, useEffect } from "react";

const SquareBox = ({ images, title, content, buttonText, onClick }) => {
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
      className="bg-blue-950 rounded-lg shadow-md overflow-hidden w-full border-2 border-blue-950"
      style={{ height: "410px", maxWidth: "500px" }} // Đặt chiều cao cố định và giới hạn chiều rộng
    >
      {/* Slider section */}
      <div className="relative w-full h-60 overflow-hidden">
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
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-2xl font-semibold text-white mb-2 text-center">
          {title}
        </h3>
        <p className="text-gray-300 mb-4 text-center">{content}</p>
        <button
          onClick={onClick}
          className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white hover:text-red-500 transition-all duration-300"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SquareBox;
