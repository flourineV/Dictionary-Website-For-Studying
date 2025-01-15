import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchSection from "../components/SearchSection";
import Login from "../components/SignInModal";
import images from "../../assets/images";
import Banner from "../components/Banner/Banner";
import DailyActivityCalendar from "../../components/Calendar";
import SquareBox from "../../components/SquareBox";
import LeaderBoard from "../../components/LeaderBoard";
import BlogBox from "../../components/BlogBox";

const DefaultLayout = () => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [user, setUser] = useState(null); // User information state

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedIn && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Xử lý đăng nhập thành công
  const handleLoginSuccess = (userData) => {
    console.log("Login Success:", userData);
    setLogout(true);
    setUser(userData);
    localStorage.setItem("token", userData.token); // Lưu token vào localStorage
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu người dùng vào localStorage
    closeModal();
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null); // Clear user data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/"); // Điều hướng về trang chính
  };

  const handleButtonClick = (route) => navigate(route);

  return (
    <div>
      <Navbar logout={logout} />
      <SearchSection logo={images.logo} backgroundImage={images.background} />
      {isModalOpen && (
        <Login closeModal={closeModal} onLoginSuccess={handleLoginSuccess} />
      )}
      <div className="mt-2">
        <Banner />
      </div>

      <div className="flex container mx-auto mt-4 gap-8">
        <div className="flex-1 grid grid-cols-2 gap-10">
          <SquareBox
            images={[images.wordbox]}
            title="Word of the day"
            content="The journey of a thousand miles begins with a single step."
            buttonText="Grasp it!"
            onClick={() => handleButtonClick("/word-meaning")}
          />
          <SquareBox
            images={[images.study1box, images.study2box, images.study3box]}
            title="Your study"
            content="The more you learn, the more you earn."
            buttonText="Go studying"
            onClick={() => handleButtonClick("/study")}
          />
          <SquareBox
            images={[images.chatbot]}
            title="Learning Chatbot"
            content="A LLM-based tool to enhance your study and knowledge."
            buttonText="Ask?"
            onClick={() => handleButtonClick("/chatbot")}
          />
          <SquareBox
            images={[images.translate]}
            title="Flourine Translate"
            content="Every translator is a mediator between cultures."
            buttonText="Translate word"
            onClick={() => handleButtonClick("/translate")}
          />
        </div>

        <div className="flex flex-col gap-10">
          <div className="w-80">
            <DailyActivityCalendar />
          </div>
          <div className="w-80">
            <LeaderBoard />
          </div>
        </div>
      </div>
      <BlogBox
        images={images.wordbox}
        title="Blog Title"
        content="Short description of the blog post"
        buttonText="Read More"
        blogLink="/blog/123" // Đường dẫn tới bài viết chi tiết
        onClick={() => console.log("Go to blog post")}
      />
    </div>
  );
};

export default DefaultLayout;
