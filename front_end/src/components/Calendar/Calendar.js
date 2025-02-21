import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null); // 🟢 Lưu ngày đang hover

  const currentYear = new Date().getFullYear();
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const [wordList, setWordList] = useState([]); // 🟢 Danh sách từ vựng từ file .txt
  const [randomWords, setRandomWords] = useState({});
  const navigate = useNavigate();
  const getMonthName = (date) =>
    date.toLocaleString("default", { month: "long" });
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getStartDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    if (newDate.getFullYear() === currentYear) setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    if (newDate.getFullYear() === currentYear) setCurrentDate(newDate);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getStartDayOfMonth(currentDate);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, (_, i) => null);
  useEffect(() => {
    fetch("/data/valid_words.txt") // Đặt file words.txt trong thư mục public
      .then((response) => response.text())
      .then((text) => {
        const words = text
          .split("\n")
          .map((word) => word.trim())
          .filter((word) => word.length > 0);
        setWordList(words);
      })
      .catch((error) => console.error("❌ Lỗi khi load từ vựng:", error));
  }, []);

  const getRandomWord = () => {
    if (wordList.length === 0) return "Loading...";
    return wordList[Math.floor(Math.random() * wordList.length)];
  };

  useEffect(() => {
    if (wordList.length === 0) return;

    // 🟢 Lấy từ vựng đã lưu trong localStorage (nếu có)
    const storedWords = JSON.parse(localStorage.getItem("randomWords")) || {};
    const newWords = { ...storedWords };

    // 🟢 Nếu chưa có từ vựng cho hôm nay, tạo mới và lưu lại
    for (let i = 1; i <= today; i++) {
      if (!newWords[i]) {
        newWords[i] = getRandomWord();
      }
    }

    // 🟢 Lưu vào localStorage để giữ nguyên từ đã random trước đó
    localStorage.setItem("randomWords", JSON.stringify(newWords));
    setRandomWords(newWords);
  }, [wordList, today]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
        <img
          src={images.bgform}
          alt="Calendar Header"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-100">
        <button
          onClick={goToPreviousMonth}
          className="p-2 text-gray-700 hover:bg-gray-200 rounded-full"
        >
          ←
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold">{getMonthName(currentDate)}</h2>
          <p className="text-gray-600">{currentYear}</p>
        </div>
        <button
          onClick={goToNextMonth}
          className="p-2 text-gray-700 hover:bg-gray-200 rounded-full"
        >
          →
        </button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-bold text-gray-700">
              {day}
            </div>
          ))}

          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="text-center p-2">
              {""}
            </div>
          ))}

          {daysArray.map((day) => {
            const isPastDay =
              currentDate.getMonth() === currentMonth
                ? day <= today
                : currentDate.getMonth() < currentMonth;
            const isToday =
              currentDate.getMonth() === currentMonth && day === today;
            const isHovered = hoveredDay === day; // 🟢 Kiểm tra ngày được hover

            return (
              <div
                key={day}
                className="relative text-center p-1.5 rounded text-gray-900 cursor-pointer flex items-center justify-center"
                onMouseEnter={() => setHoveredDay(day)} // 🟢 Khi hover vào ngày
                onMouseLeave={() => setHoveredDay(null)} // 🟢 Khi rời khỏi ngày
                onClick={() =>
                  isPastDay && navigate(`/word-meaning/${randomWords[day]}`)
                }
              >
                {/* 🟢 Nếu hover vào ngày quá khứ, hiện nền xanh phía sau số */}
                {isPastDay && isHovered && (
                  <div className="absolute inset-0 bg-blue-300 opacity-50 rounded-full transition-opacity duration-300 ease-in-out -bottom-1 top-1"></div>
                )}
                {isToday && (
                  <div className="absolute inset-0 bg-green-400 rounded-full -bottom-1 top-1"></div>
                )}
                <span className="relative z-10">{day}</span>
                {isPastDay && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
                )}

                {/* 🟢 Tooltip chỉ hiện khi hover vào ngày, và biến mất khi rời khỏi */}
                {isPastDay && isHovered && (
                  <div className="z-20 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-100 ">
                    Peanut
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
