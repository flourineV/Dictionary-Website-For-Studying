import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Calendar from "../../components/Calendar";
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
    <div className="w-screen bg-black">
      <div className="top-0 fixed z-50">
        <Navbar isLoggedIn={isLoggedIn} logout={handleLogout} />
      </div>
      <div className="mt-12 pl-20 flex w-screen">
        {/* Phần 2/3 bên trái: Các card */}
        <div className="flex-1 w-2/3">{children}</div>

        {/* Phần 1/3 bên phải: Calendar và Leaderboard */}
        <div className="mb-10 mt-10 flex w-1/3 space-y-8 justify-center">
          <div className="flex flex-col space-y-8">
            <Calendar />
            <LeaderBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarRightSideLayout;
