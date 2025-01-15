import React from "react";

function Banner() {
  return (
    <div className="relative w-full overflow-hidden h-10">
      <div className="absolute whitespace-nowrap animate-marquee text-lg text-gray-700 flex space-x-10">
        <span>🚀 Tính năng mới sắp ra mắt! Hãy đón chờ nhé! 🚀</span>
        <span>🌟 Đừng quên khám phá các từ vựng mỗi ngày! 🌟</span>
        <span>📚 Cập nhật kho từ điển của bạn ngay hôm nay! 📚</span>
        <span>📚 Cập nhật kho từ điển của bạn ngay hôm nay! 📚</span>
      </div>
    </div>
  );
}

export default Banner;
