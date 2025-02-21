import config from "../../../config"; //config
import { Link, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import images from "../../../assets/images";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  YoutubeIcon,
} from "../../../components/Icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { signOutUser } from "../../../redux/actions/userActions";

function Navbar() {
  const user = useSelector((state) => state.user.user || null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation();
  const logoRef = useRef(null);

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
    if (menuOpen && !e.target.closest(".popup-menu")) {
      setMenuOpen(false);
    }
    if (
      dropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setDropdownOpen(false);
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
  const isActive = (path) => location.pathname === path;
  const links = [
    user
      ? { name: "Dashboard", to: config.routes.dashboard }
      : { name: "Home", to: config.routes.home },
    { name: "Translate", to: config.routes.translate },
    { name: "Study", to: config.routes.study },
    { name: "Blog", to: config.routes.blog.blogs },
  ];

  const activeLink = links.find((link) => isActive(link.to));

  const handleSignOut = () => {
    dispatch(signOutUser());
    navigate("/");
  };

  return (
    <>
      <nav
        className="fixed bg-[#191229] text-white shadow-md w-full"
        style={{ height: "3.5rem", zIndex: 48 }}
      >
        <div className="flex justify-between items-center h-full px-4">
          <div className="flex items-center space-x-8 relative">
            {" "}
            <FontAwesomeIcon
              icon={faBars}
              className="fa-solid faBars w-6 h-6 cursor-pointer hover:text-gray-300 transition-all duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`text-white font-bold text-lg relative`}
                style={isActive(link.to) ? { color: "yellow" } : {}}
              >
                {link.name}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="underline" //id link
                    className="absolute bottom-[-3px] left-0 top-[40px] h-1 bg-blue-500 w-full"
                    style={{
                      boxShadow:
                        "0 2px 5px rgba(0, 102, 255, 1), 0 -6px 12px rgba(0, 128, 255, 0.8)",
                      borderRadius: "15px",
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Navbar items */}
          <div className="flex space-x-6 items-center">
            {/* Social Media Icons */}
            <div className="relative flex space-x-4 -right-3">
              <YoutubeIcon className="cursor-pointer hover:text-gray-300 transition-all duration-200" />
              <FacebookIcon className="cursor-pointer hover:text-gray-300 transition-all duration-200" />
              <InstagramIcon className="cursor-pointer hover:text-gray-300 transition-all duration-200" />
              <GithubIcon className="cursor-pointer hover:text-gray-300 transition-all duration-200" />
            </div>
            {user && (
              <div
                className="relative flex items-center space-x-3 hover:bg-gray-500 transition-all duration-200 px-3 py-1 rounded-lg -right-3 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-white font-semibold">{user.name}</span>{" "}
                {/* Hiển thị tên user */}
                <img
                  src={user.avatar || images.defaultavt} // Avatar user
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                />
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-14 w-48 bg-white text-black shadow-lg rounded-lg"
                  >
                    <div className="p-2 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        <Link to="/settings">Settings</Link>
                      </li>

                      {/* 🟢 Nếu là admin, hiển thị thêm mục "Create Exercise" */}
                      {user.role === "admin" && (
                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-blue-600">
                          <Link to="/admin/create-exercise">
                            Create Exercise
                          </Link>
                        </li>
                      )}

                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-600"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
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
    </>
  );
}

export default Navbar;
