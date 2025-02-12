import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchSection from "../components/SearchSection";
import Banner from "../../components/Banner/Banner";
import Stats from "../../components/Statistic";
import Intro from "../../components/Content";
import Footer from "../../components/Content/Footer";
import Body from "../../components/Content/Body";

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

  const handleButtonClick = (route) => navigate(route);

  return (
    <div>
      <Navbar logout={logout} />
      <SearchSection />
      <Banner />
      <Stats />
      <Intro />
      <Body />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
