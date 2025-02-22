import { useState, useRef } from "react";
import { motion } from "framer-motion";
import images from "../../assets/images";
import { useParams, useNavigate } from "react-router-dom";
import SearchBar from "../../layouts/components/Search/Search";
import Card from "../../components/Card";
import Calendar from "../../components/Calendar";
import Leaderboard from "../../components/LeaderBoard";
import Footer from "../../components/Content/Footer";

const cardData = [
  {
    image: images.wotd,
    title: "Word of the Day",
    description: "Expand your vocabulary daily.",
    tags: ["vocabs", "daily", ""],
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
    title: "Reading Tools",
    description: "Tools to improve your reading skills.",
    tags: [1, 2, 3],
  },
  {
    image: images.wotd,
    title: "Audio Dictionary",
    description: "Listen to word pronunciation.",
    tags: [1, 2, 3],
  },
  {
    image: images.wotd,
    title: "Learning Tools",
    description: "Interactive learning tools.",
    tags: [1, 2, 3],
  },
];

const Dashboard = () => {
  const { word } = useParams();
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState(word || "");
  const logoRef = useRef(null);

  const handleSearch = () => {
    if (searchWord.trim()) {
      navigate(`/word-meaning/${searchWord}`);
    }
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="pt-1 bg-black w-screen">
      {/* Phần header với gradient và logo */}
      <div className="w-screen h-96 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-opacity-80 grid grid-cols-4 items-center justify-center rounded-lg shadow-lg px-8">
        {/* Cột 1: Logo */}
        <div
          className="relative flex flex-col items-end cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src={images.logoblack}
            alt="Logo"
            className="object-contain w-72 h-72 transition-opacity duration-300 hover:opacity-70"
          />
          {/* Gạch ngang và chữ */}
          <div className="absolute bottom-14 right-5 flex flex-col items-center">
            <div className="w-32 h-1 bg-yellow-500"></div> {/* Gạch ngang */}
            <p className="text-black text-lg font-thin mt-2 text-center">
              Happy to learn 😊
            </p>
          </div>
        </div>

        {/* Cột 2 & 3: SearchBar */}
        <div className="col-span-2 flex justify-center">
          <SearchBar
            word={searchWord}
            setWord={setSearchWord}
            handleSearch={handleSearch}
          />
        </div>

        {/* Các hình khối trang trí */}
        <div className="w-24 h-24 bg-yellow-400 absolute right-0 mt-72"></div>
        <div className="w-24 h-10 bg-blue-400 absolute right-24 mt-[344px]"></div>
        <div className="w-10 h-24 bg-blue-500 absolute left-0 mt-[100px]"></div>
        <div className="w-24 h-24 bg-yellow-400 absolute left-0 mt-72"></div>
        <div className="w-14 h-14 bg-green-400 rounded-full absolute -left-8 -mt-64"></div>
        <div className="w-10 h-10 bg-green-500 rounded-full absolute right-28 mt-64"></div>
        <div className="w-64 h-7 bg-pink-300 absolute right-0 mt-20"></div>
        <div className="w-10 h-10 bg-purple-400 rounded-full absolute left-28 mt-80"></div>
      </div>

      {/* Phần chính: Flexbox chia thành 2/3 và 1/3 */}

      {/* Phần chính: Flexbox chia thành 2/3 và 1/3 */}
      <div className="mt-20 pl-20 flex w-screen">
        {/* Phần 2/3 bên trái: Các card */}
        <div className="flex-1 w-2/3">
          <div className="grid grid-cols-3 gap-10">
            {" "}
            {/* 3 card mỗi hàng */}
            {cardData.map((card, index) => (
              <motion.div key={index} className="duration-300 hover:scale-105">
                <Card
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  tags={card.tags}
                  links
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Phần 1/3 bên phải: Calendar và Leaderboard */}
        <div className="flex w-1/3 space-y-8 justify-center">
          <div className="flex flex-col space-y-8">
            <Calendar />
            <Leaderboard />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
