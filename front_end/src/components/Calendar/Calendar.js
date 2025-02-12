import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // State để lưu ngày hiện tại
  const currentYear = new Date().getFullYear(); // Lấy năm hiện tại

  // Hàm để lấy tên tháng
  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  // Hàm để lấy số ngày trong tháng
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Hàm để lấy ngày bắt đầu của tháng (ngày đầu tiên của tháng là thứ mấy)
  const getStartDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Hàm chuyển đến tháng trước
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    if (newDate.getFullYear() === currentYear) {
      setCurrentDate(newDate);
    }
  };

  // Hàm chuyển đến tháng sau
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    if (newDate.getFullYear() === currentYear) {
      setCurrentDate(newDate);
    }
  };

  // Kiểm tra xem có thể chuyển đến tháng trước hay không
  const canGoToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    return newDate.getFullYear() === currentYear;
  };

  // Kiểm tra xem có thể chuyển đến tháng sau hay không
  const canGoToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate.getFullYear() === currentYear;
  };

  // Tạo danh sách ngày trong tháng
  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getStartDayOfMonth(currentDate);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Tạo danh sách ngày trống (để lấp đầy các ô trống trước ngày đầu tiên của tháng)
  const emptyDays = Array.from({ length: startDay }, (_, i) => null);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Phần header với nút chuyển tháng */}
      <div className="flex items-center justify-between p-4 bg-gray-100">
        <button
          onClick={goToPreviousMonth}
          disabled={!canGoToPreviousMonth()}
          className={`p-2 ${
            canGoToPreviousMonth()
              ? "text-gray-700 hover:bg-gray-200"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          ←
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold">{getMonthName(currentDate)}</h2>
          <p className="text-gray-600">{currentYear}</p>
        </div>
        <button
          onClick={goToNextMonth}
          disabled={!canGoToNextMonth()}
          className={`p-2 ${
            canGoToNextMonth()
              ? "text-gray-700 hover:bg-gray-200"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          →
        </button>
      </div>

      {/* Phần lịch */}
      <div className="p-4">
        <div className="grid grid-cols-7 gap-2">
          {/* Hiển thị các ngày trong tuần */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-bold text-gray-700">
              {day}
            </div>
          ))}
          {/* Hiển thị các ô trống trước ngày đầu tiên của tháng */}
          {emptyDays.map((_, index) => (
            <div
              key={`empty-${index}`}
              className="text-center p-2 text-gray-400"
            >
              {""}
            </div>
          ))}
          {/* Hiển thị các ngày trong tháng */}
          {daysArray.map((day) => (
            <div
              key={day}
              className="text-center p-2 rounded text-gray-900 hover:bg-gray-100 cursor-pointer"
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
