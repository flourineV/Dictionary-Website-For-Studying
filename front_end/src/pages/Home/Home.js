import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layouts/components/Navbar";
import SearchSection from "../../layouts/components/SearchSection";
import Banner from "../../components/Banner/Banner";
import Stats from "../../components/Statistic";
import Intro from "../../components/Content";
import Footer from "../../components/Content/Footer";
import Body from "../../components/Content/Body";

const Home = () => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar logout={logout} />
      <div className="flex-grow">
        <SearchSection className="p-4 md:p-8" />
        <Banner className="p-4 md:p-8" />
        <Stats className="p-4 md:p-8" />
        <Intro className="p-4 md:p-8" />
        <Body className="p-4 md:p-8" />
      </div>
      <Footer className="p-4 md:p-8" />
    </div>
  );
};

export default Home;
