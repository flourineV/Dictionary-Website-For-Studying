import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ image, title, description, tags, link }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative bg-[#191229] text-white rounded-2xl shadow-lg p-4 max-w-sm overflow-hidden">
      {/* Hình ảnh */}
      <div
        className="relative w-full h-56 "
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl transition-transform duration-300 ease-in-out"
        />
        {/* Panel mờ xuất hiện khi hover */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 ${
            hovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full"
          }`}
        >
          <button
            onClick={() => navigate(link)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-red-500 transition"
          >
            View More
          </button>
        </div>
      </div>

      {/* Nội dung */}
      <h2 className="text-xl font-bold mt-4 text-center">{title}</h2>
      <p className="text-gray-300 mt-2 text-sm">{description}</p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-[#2e1b4b] text-purple-300 px-2 py-1 rounded-md"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
