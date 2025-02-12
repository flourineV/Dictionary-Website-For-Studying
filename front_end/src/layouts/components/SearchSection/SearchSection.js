import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StarsCanvas from "../../../components/Star";
import EarthCanvas from "../../../components/Earth";
import images from "../../../assets/images";
import SearchBar from "../Search/Search";
import AuthForm from "../../../pages/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faLanguage,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";

const SearchSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [showButtons, setShowButtons] = useState(false); // Trạng thái xuất hiện button
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const logoRef = useRef(null);
  const [word, setWord] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearch = () => {
    if (word.trim()) {
      navigate(`/word-meaning/${word}`);
    }
  };
  const handleSignInButton = (word) => {
    navigate(`/auth`);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    const buttonTimer = setTimeout(() => setShowButtons(true), 1300); // Delay xuất hiện button sau 1.3s
    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Stars */}
      <div className="absolute inset-0 z-0">
        <StarsCanvas />
      </div>

      {/* Logo and Search Bar Section */}
      <div
        className={`absolute -top-9 left-0 w-2/3 h-full flex flex-col items-center justify-center transition-all duration-1000 ${
          loaded ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        {/* Logo */}
        <div
          className="relative flex flex-col items-center w-auto cursor-pointer ml-20 -mt-14"
          onClick={handleLogoClick}
        >
          <img
            ref={logoRef}
            src={images.logo}
            alt="Logo"
            className="object-contain w-96 h-96 transition-opacity duration-300 hover:opacity-70 bg-transparent justify-start"
          />
          {/* Gạch ngang và chữ */}
          <div className="absolute bottom-20 flex flex-col items-center">
            <div className="w-48 h-0.5 bg-yellow-500 ml-40"></div>{" "}
            {/* Gạch ngang */}
            <p className="text-white text-lg font-thin mt-2 text-center ml-36">
              Happy to learn{" "}
              <span role="img" aria-label="smile">
                😊
              </span>
            </p>
          </div>
        </div>

        {/* Buttons - Hiệu ứng pump */}
        <div
          className={`flex space-x-4 -mt-12 ml-32 ${
            showButtons ? "animate-bounce-in" : "opacity-0"
          }`}
        >
          <button
            onClick={handleSignInButton}
            className="bg-red-500 hover:bg-white hover:text-red-500 transition-all duration-300 text-white font-bold py-3 px-6 rounded-3xl border-white border-2"
          >
            <FontAwesomeIcon icon={faSignIn} className="mr-2" />
            Sign in
          </button>
          <button className="bg-red-500 hover:bg-white hover:text-red-500 transition-all duration-300 text-white font-bold py-3 px-6 rounded-3xl border-white border-2">
            <FontAwesomeIcon icon={faLanguage} className="mr-3" />
            English
            <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-8 w-full flex justify-center items-center">
          <div className="w-full max-w-4xl px-8 ml-36 mt-10">
            <SearchBar
              word={word}
              setWord={setWord}
              handleSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Earth Section */}
      <div
        className={`absolute top-0 right-16 w-1/3 h-full transition-all duration-1000 ${
          loaded ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <EarthCanvas autoRotate={true} />
      </div>
    </div>
  );
};

export default SearchSection;
