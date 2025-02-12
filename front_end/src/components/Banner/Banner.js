import React, { useEffect, useRef } from "react";

const messages = [
  "🚀 Tính năng mới sắp ra mắt! Hãy đón chờ nhé! 🚀",
  "🌟 Đừng quên khám phá các từ vựng mỗi ngày! 🌟",
  "📚 Cập nhật kho từ điển của bạn ngay hôm nay! 📚",
  "🎯 Học từ vựng thông minh hơn với chúng tôi! 🎯",
];

function Banner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    const banner = bannerRef.current;
    const clone = banner.innerHTML; // Lấy nội dung ban đầu
    banner.innerHTML += clone; // Nhân đôi để tạo hiệu ứng lặp liên tục

    let position = 0;
    function animate() {
      position -= 1; // Tốc độ cuộn
      if (position <= -banner.scrollWidth / 2) {
        position = 0; // Khi chạy hết một lượt, reset về đầu
      }
      banner.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-10 bg-gray-200 flex items-center">
      <div ref={bannerRef} className="flex whitespace-nowrap space-x-10">
        {messages.map((msg, index) => (
          <span key={index} className="text-lg text-gray-700">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Banner;
