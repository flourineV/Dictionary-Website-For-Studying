import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-solid-svg-icons";

function SearchSection({ logo, backgroundImage }) {
  const navigate = useNavigate();
  const logoRef = useRef(null); // Sử dụng ref để lấy phần tử logo
  const [word, setWord] = useState("");
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearch = () => {
    if (word.trim()) {
      navigate(`/word-meaning/${word}`);
    }
  };

  const handleDragStart = (e) => {
    const logoElement = logoRef.current;
    if (logoElement) {
      // Tính toán chênh lệch giữa vị trí chuột và phần logo
      const offsetX = e.clientX - logoElement.getBoundingClientRect().left;
      const offsetY = e.clientY - logoElement.getBoundingClientRect().top;

      // Tạo ảnh mờ giống logo gốc với kích thước và tọa độ chính xác
      e.dataTransfer.setDragImage(logoElement, offsetX, offsetY);
    }
  };

  return (
    <div
      className="py-4 shadow-md h-80"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-center h-full space-x-8">
        {/* Logo */}
        <div
          className="relative flex justify-center items-center w-auto cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            ref={logoRef} // Gắn ref vào hình ảnh logo
            src={logo}
            alt="Logo"
            className="object-contain w-80 h-80 transition-opacity duration-300 hover:opacity-70 bg-transparent"
            draggable="true" // Bật tính năng kéo
            onDragStart={handleDragStart} // Thêm sự kiện dragstart
          />
          {/* Gạch ngang và chữ */}
          <div className="absolute bottom-16 flex flex-col items-center">
            <div className="w-48 h-0.5 bg-yellow-500 ml-28"></div>{" "}
            {/* Gạch ngang */}
            <p className="text-white text-lg font-thin mt-2 text-center ml-36">
              Happy to learn <FontAwesomeIcon icon={faSmile} />
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col items-center w-full max-w-4xl px-8">
          <div className="mt-10 ml-20 w-full">
            <SearchBar
              word={word}
              setWord={setWord}
              handleSearch={handleSearch}
            />
          </div>
          <div className="mt-4 flex space-x-4">
            <button className="bg-blue-950 text-white px-4 py-2 rounded-full">
              English
            </button>
            <button className="bg-blue-950 text-white px-4 py-2 rounded-full">
              Grammar
            </button>
            <button className="bg-blue-950 text-white px-4 py-2 rounded-full">
              French-English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
