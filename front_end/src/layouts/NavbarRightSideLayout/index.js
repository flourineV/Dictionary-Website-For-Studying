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
    <div>
      <div className="top-0 fixed z-50">
        <Navbar isLoggedIn={isLoggedIn} logout={handleLogout} />
      </div>
      <div className="flex w-screen container mx-auto mt-28">
        <div className="flex-1 w-2/3">{children}</div>
        <div className="flex w-1/3 space-y-8 justify-end">
          <div className="flex flex-col space-y-14">
            <Calendar />
            <LeaderBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarRightSideLayout;
