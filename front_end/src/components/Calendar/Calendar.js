import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../index.css";
import { enUS } from "date-fns/locale";

function DailyActivityCalendar() {
  const [date, setDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [activeStartDate, setActiveStartDate] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );

  const today = new Date();

  // Hàm điều hướng thủ công
  const handleNavigation = (direction) => {
    const currentYear = today.getFullYear();
    const currentMonth = activeStartDate.getMonth();
    const currentDate = activeStartDate;

    let newDate;

    if (direction === "prev") {
      // Điều hướng tháng trước
      newDate = new Date(currentDate.setMonth(currentMonth - 1));
    } else if (direction === "next") {
      // Điều hướng tháng sau
      newDate = new Date(currentDate.setMonth(currentMonth + 1));
    }

    // Giới hạn trong năm hiện tại
    if (newDate.getFullYear() === currentYear) {
      setActiveStartDate(newDate);
    }
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    // Lắng nghe sự kiện thay đổi của localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="relative left-12 bg-blue-950 p-4 rounded-lg shadow-md w-80">
      <h2 className="text-white text-lg font-bold mb-4 text-center">
        Daily Activity
      </h2>
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => handleNavigation("prev")}
            className={`text-white ${
              activeStartDate.getMonth() === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            ◄
          </button>
          <span className="font-bold text-white">
            {activeStartDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => handleNavigation("next")}
            className={`text-white ${
              activeStartDate.getMonth() === 11
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            ►
          </button>
        </div>
        <Calendar
          onChange={(value) => setDate(value)}
          value={date}
          locale={enUS}
          tileClassName={({ date }) => {
            const isToday =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();
            return isToday ? "today" : "";
          }}
          className={`custom-calendar ${!isLoggedIn ? "opacity-50" : ""}`}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={() => {}}
          showNeighboringMonth={false}
          prevLabel={null} // Ẩn điều hướng mặc định
          nextLabel={null} // Ẩn điều hướng mặc định
          prev2Label={null} // Ẩn điều hướng năm
          next2Label={null} // Ẩn điều hướng năm
          navigationLabel={() => null} // Không hiển thị tiêu đề mặc định
        />
        {!isLoggedIn && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 cover-layer">
            <button
              onClick={handleLogin}
              className="bg-white text-blue-950 font-bold py-2 px-4 rounded shadow-lg z-30"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyActivityCalendar;
