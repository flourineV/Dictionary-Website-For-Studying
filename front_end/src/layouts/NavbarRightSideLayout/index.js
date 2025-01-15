import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import DailyActivityCalendar from "../../components/Calendar";
import LeaderBoard from "../../components/LeaderBoard";

const NavbarRightSideLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/"); // Điều hướng về trang chính
  };

  return (
    <div>
      <div className="top-0 fixed z-50">
        <Navbar isLoggedIn={isLoggedIn} logout={handleLogout} />
      </div>
      <div className="flex container mx-auto mt-20 gap-8">
        {/* Content Area */}
        <div className="flex-1">{children}</div>
        {/* Right Sidebar */}
        <div className="flex flex-col gap-10">
          <div className="w-80">
            <DailyActivityCalendar />
          </div>
          <div className="w-80">
            <LeaderBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarRightSideLayout;
