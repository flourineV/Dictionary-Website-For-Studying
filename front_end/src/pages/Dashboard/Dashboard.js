import { useState } from "react";
import { motion } from "framer-motion";
import images from "../../assets/images";
import { useParams, useNavigate } from "react-router-dom";
import SearchBar from "../../layouts/components/Search/Search";
import Card from "../../components/Card";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cardData = [
  {
    image: images.wotd,
    title: "Word of the Day",
    description: "Expand your vocabulary daily.",
    tags: [1, 2, 3],
  },
  {
    image: images.wotd,
    title: "Translate",
    description: "Instantly translate words.",
    tags: [1, 2, 3],
  },
  {
    image: images.wotd,
    title: "Writing Area",
    description: "Practice your writing skills.",
    tags: [1, 2, 3],
  },
  {
    image: images.wotd,
    title: "Chatbot",
    description: "Ask AI for English help.",
    tags: [1, 2, 3],
  },
];

const Dashboard = () => {
  const { word } = useParams();
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState(word || "");
  const [startIndex1, setStartIndex1] = useState(0); // State cho dòng card đầu tiên
  const [startIndex2, setStartIndex2] = useState(0); // State cho dòng card thứ hai

  const handleSearch = () => {
    if (searchWord.trim()) {
      navigate(`/word-meaning/${searchWord}`);
    }
  };

  // Hàm xử lý nút điều hướng cho dòng card đầu tiên
  const handleNext1 = () => {
    if (startIndex1 < cardData.length - 2) {
      setStartIndex1(startIndex1 + 1);
    }
  };

  const handlePrev1 = () => {
    if (startIndex1 > 0) {
      setStartIndex1(startIndex1 - 1);
    }
  };

  // Hàm xử lý nút điều hướng cho dòng card thứ hai
  const handleNext2 = () => {
    if (startIndex2 < cardData.length - 2) {
      setStartIndex2(startIndex2 + 1);
    }
  };

  const handlePrev2 = () => {
    if (startIndex2 > 0) {
      setStartIndex2(startIndex2 - 1);
    }
  };

  return (
    <div className="pt-1">
      <div className="w-screen h-96 bg-cyan-300 bg-opacity-80 flex items-center justify-center rounded-lg shadow-lg">
        <SearchBar
          word={searchWord}
          setWord={setSearchWord}
          handleSearch={handleSearch}
        />
      </div>

      {/* Dòng card đầu tiên */}
      <div className="relative mt-10 flex items-center justify-start ml-40">
        {/* Nút trái */}
        <button
          onClick={handlePrev1}
          disabled={startIndex1 === 0}
          className="w-12 h-12 absolute -left-16 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faChevronCircleLeft} className="w-8 h-8" />
        </button>

        {/* Danh sách Card */}
        <div className="w-2/3 flex overflow-hidden relative">
          <motion.div
            className="flex gap-4"
            animate={{ x: `-${startIndex1 * 54}%` }} // Sử dụng startIndex1
            transition={{ type: "tween", duration: 0.4 }}
          >
            {cardData.map((card, index) => (
              <div key={index} className="w-[50%] flex-shrink-0">
                <Card
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  tags={card.tags}
                  links
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Nút phải */}
        <button
          onClick={handleNext1}
          disabled={startIndex1 >= cardData.length - 2}
          className="w-12 h-12 absolute right-64 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faChevronCircleRight} className="w-8 h-8" />
        </button>
      </div>

      {/* Dòng card thứ hai */}
      <div className="relative mt-12 flex items-center justify-center">
        {/* Nút trái */}
        <button
          onClick={handlePrev2}
          disabled={startIndex2 === 0}
          className="absolute left-36 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faChevronCircleLeft} size="lg" />
        </button>

        {/* Danh sách Card */}
        <div className="w-2/3 flex overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${startIndex2 * 53}%` }} // Sử dụng startIndex2
            transition={{ type: "tween", duration: 0.4 }}
          >
            {cardData.map((card, index) => (
              <div key={index} className="w-[50%] flex-shrink-0">
                <Card
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  tags={card.tags}
                  links
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Nút phải */}
        <button
          onClick={handleNext2}
          disabled={startIndex2 >= cardData.length - 2}
          className="absolute right-36 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faChevronCircleRight} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
