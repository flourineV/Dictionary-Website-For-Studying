import config from "../../../config"; //config
import { Link, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import images from "../../../assets/images";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  YoutubeIcon,
} from "../../../components/Icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEarthAmericas,
  faSignIn,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import Login from "../SignInModal";

function Navbar() {
  const location = useLocation();
  const logoRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedIn && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []); // Chỉ chạy một lần khi component được render

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    navigate("/");
    localStorage.setItem("user", JSON.stringify(user)); // Lưu thông tin người dùng
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isActive = (path) => location.pathname === path;

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOutsideClick = (e) => {
    const menu = e.target.closest(".popup-menu");
    if (!menu) {
      setMenuOpen(false);
    }
  };

  const handleDragStart = (e) => {
    const logoElement = logoRef.current;
    if (logoElement) {
      const offsetX = e.clientX - logoElement.getBoundingClientRect().left;
      const offsetY = e.clientY - logoElement.getBoundingClientRect().top;
      e.dataTransfer.setDragImage(logoElement, offsetX, offsetY);
    }
  };

  return (
    <>
      <nav
        className="fixed bg-blue-950 text-white shadow-md w-full"
        style={{ height: "3.5rem", zIndex: 48 }}
      >
        <div className="flex justify-between items-center h-full px-4">
          <div className="flex items-center space-x-8">
            <FontAwesomeIcon
              icon={faBars}
              className="fa-solid faBars w-6 h-6 cursor-pointer hover:text-gray-300 transition-all duration-200"
              onClick={() => setMenuOpen(!menuOpen)} // Toggle the menu on click
            />
            <Link
              to={config.routes.home}
              className={`text-white font-bold text-lg hover:border-b-2 hover:border-green-600 ${
                isActive(config.routes.home)
                  ? "border-b-2 border-green-600 shadow-lg"
                  : ""
              }`}
            >
              Home
            </Link>

            <Link
              to={config.routes.translate}
              className={`text-white font-bold text-lg hover:border-b-2 border-green-600 ${
                isActive(config.routes.translate)
                  ? "border-b-2 border-green-600"
                  : ""
              }`}
            >
              Translate
            </Link>
            <Link
              to={config.routes.study}
              className={`text-white font-bold text-lg hover:border-b-2 border-green-600 ${
                isActive(config.routes.study)
                  ? "border-b-2 border-green-600"
                  : ""
              }`}
            >
              Study
            </Link>
            <Link
              to={config.routes.blog}
              className={`text-white font-bold text-lg hover:border-b-2 border-green-600 ${
                isActive(config.routes.blog)
                  ? "border-b-2 border-green-600"
                  : ""
              }`}
            >
              Blog
            </Link>
            <Link
              to={config.routes.shops}
              className={`text-white font-bold text-lg hover:border-b-2 border-green-600 ${
                isActive(config.routes.shops)
                  ? "border-b-2 border-green-600"
                  : ""
              }`}
            >
              Shops
            </Link>
          </div>

          {/* Navbar items */}
          <div className="flex space-x-6 items-center">
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <YoutubeIcon className="cursor-pointer hover:text-gray-300 transition-all duration-200" />
              <FacebookIcon className="cursor-pointer hover:text-gray-300 transition-all duration-200" />
              <InstagramIcon className="cursor-pointer hover:text-gray-300 transition-all duration-200" />
              <GithubIcon className="cursor-pointer hover:text-gray-300 transition-all duration-200" />
            </div>

            {/* Language Selector */}
            <div className="relative">
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <FontAwesomeIcon
                  icon={faEarthAmericas}
                  className="fa-solid fa-earth-americas w-6 h-6"
                />
              </div>
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="appearance-none bg-red-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white hover:text-red-500 transition-all duration-300"
              >
                <option value="English">English</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
            {/*display user info hoặc sign in button */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div
                  className="relative cursor-pointer flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-lg"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={
                      user?.avatar ||
                      "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                    }
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-white hover:text-gray-300">
                    {user?.name || user?.username}
                  </p>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 top-12 bg-white text-black rounded-lg shadow-md w-48"
                    >
                      <Link
                        to={`/profile/${user?.id}`} // Dẫn đến trang profile người dùng
                        className="block px-4 py-2 text-sm hover:bg-gray-200 rounded-lg"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 rounded-lg"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openModal}
                  className="bg-red-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white hover:text-red-500 transition-all duration-300"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Popup Menu */}
        <div
          className={`fixed left-0 top-0 bg-white w-80 h-full z-20 flex flex-col space-y-4 p-4 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button (X) */}
          <button
            onClick={() => setMenuOpen(false)} // Close the menu when clicked
            className="absolute top-4 right-4 text-2xl text-black font-bold"
          >
            ×
          </button>

          <div className="relative flex justify-start -top-16 -left-3 w-auto bg-transparent mb-6 max-w-full">
            <img
              ref={logoRef}
              src={images.logoblack}
              alt="LogoBlack"
              className="object-contain w-48 h-48 duration-300 hover:opacity-70 bg-transparent"
              draggable="true"
              onDragStart={handleDragStart}
            />
            {/* Divider */}
            <div className="w-28 h-0.5 bg-yellow-300 mt-32 absolute z-10 left-20"></div>
            <div className="w-full h-px absolute bg-gray-300 mt-44">
              <div className="flex flex-col space-y-3 mb-6">
                {/* Thêm mt-10 để xích các mục menu xuống mà không thay đổi vị trí logo */}
                <div className="text-lg font-semibold text-black mt-4">
                  Dictionary
                </div>
                <div className="w-full h-px bg-gray-300"></div>
                <div className="text-lg font-semibold text-black mt-4">
                  Translate
                </div>
                <div className="w-full h-px bg-gray-300"></div>
                <div className="text-lg font-semibold text-black mt-4">
                  Study
                </div>
                <div className="w-full h-px bg-gray-300"></div>
                <div className="text-lg font-semibold text-black mt-4">
                  Chatbot
                </div>
                <div className="w-full h-px bg-gray-300"></div>
                <div className="text-lg font-semibold text-black mt-4">
                  Shop
                </div>
                <div className="w-full h-px bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div
            onClick={handleOutsideClick}
            className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm"
            style={{ zIndex: 5 }}
          ></div>
        )}
      </nav>
      {isModalOpen && (
        <Login closeModal={closeModal} onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default Navbar;
