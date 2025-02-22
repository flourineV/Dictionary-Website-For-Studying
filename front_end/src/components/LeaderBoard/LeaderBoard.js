import React, { useState } from "react";
import images from "../../assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

const Leaderboard = () => {
  const players = [
    { name: "Player 1", score: 1200 },
    { name: "Player 2", score: 1100 },
    { name: "Player 1", score: 1200 },
    { name: "Player 2", score: 1100 },
    { name: "Player 1", score: 1200 },
  ];

  const studyImageArray = [
    images.study1box,
    images.study2box,
    images.study3box,
  ];

  const [selectedTab, setSelectedTab] = useState(1); // Mặc định chọn "Top 1"

  return (
    <div className="bg-[#191229] rounded-t-[25px] rounded-b-[25px] shadow-lg text-black w-[325px] h-[680px]">
      {/* Hình chữ nhật dưới tiêu đề */}
      <div className="h-[350px] bg-gradient-to-r from-purple-700 via-blue-800 to-indigo-900 mb-6 rounded-t-[25px] rounded-b-[55px] overflow-hidden">
        <h2 className="text-3xl font-light pt-7 text-center text-white">
          LEADERBOARD
        </h2>

        {/* Thanh ngang với 3 mục */}
        <div className="mr-3 ml-3 mt-5 relative flex justify-between items-center mb-6 bg-blue-950 bg-opacity-60 rounded-[50px] h-[50px]">
          {["All times", "This week", "This month"].map((label, index) => (
            <div
              key={index}
              onClick={() => setSelectedTab(index + 1)} // Set selected tab khi click
              className={`text-center cursor-pointer transition-all duration-300 rounded-[50px] py-2 px-4
                ${
                  selectedTab === index + 1
                    ? "bg-white text-black scale-90"
                    : "text-white"
                }`}
            >
              <p className="font-light">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex">
          {/* Cột đầu tiên: Hình tròn với layer */}
          <div className="flex justify-center items-center w-[30%] relative">
            <div className="z-20 absolute mb-28 text-[#C0C0C0]">
              <FontAwesomeIcon icon={faCrown} />
            </div>
            <div className="z-10 w-20 h-20 rounded-full bg-white">
              <img
                src={studyImageArray[0]}
                alt="Study 1"
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>{" "}
            <div className="z-20 absolute top-[100px] text-[#FFD700] font-bold text-[17px]">
              Thúy Vy
            </div>
            {/* Hình tròn nhỏ */}
            <div className="absolute w-40 h-40 rounded-full bg-blue-950 opacity-20"></div>{" "}
            {/* Hình tròn lớn, không bị tràn */}
          </div>

          {/* Cột thứ hai: Hình tròn */}
          <div className="flex justify-center items-start w-[40%] relative">
            <div className="z-10 absolute text-[#FFD700]">
              <FontAwesomeIcon icon={faCrown} />
            </div>
            <div
              className="z-10 w-28 h-28 rounded-full bg-white"
              style={{ transform: "translateY(40px)" }}
            >
              <img
                src={studyImageArray[0]}
                alt="Study 1"
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>{" "}
            {/* Hình tròn trung bình */}
            <div className="z-20 absolute top-[156px] text-[#FFD700] font-bold text-[19px]">
              Tuấn
            </div>
            <div className="absolute w-56 h-56 rounded-full bg-blue-950 opacity-35"></div>{" "}
            {/* Hình tròn lớn, không bị tràn */}
          </div>

          {/* Cột thứ ba: Hình tròn với layer */}
          <div className="flex justify-center items-center w-[30%] relative">
            <div className="z-20 mb-28 absolute text-[#CD7F32]">
              <FontAwesomeIcon icon={faCrown} />
            </div>
            <div className="z-10 w-20 h-20 rounded-full bg-white">
              <img
                src={studyImageArray[0]}
                alt="Study 1"
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>{" "}
            {/* Hình tròn nhỏ */}
            <div className="z-20 text-center absolute top-[100px] text-[#FFD700] font-bold text-[17px] break-words">
              Bách Nguyên
            </div>
            <div className="absolute w-40 h-40 rounded-full bg-blue-950 opacity-50"></div>{" "}
            {/* Hình tròn lớn, không bị tràn */}
          </div>
        </div>
      </div>

      {/* Hình chữ nhật này nằm dưới tiêu đề */}
      <div className="space-y-3 pr-5 pl-5">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 bg-[#290d61]  rounded-[25px] backdrop-blur-sm text-white"
          >
            <span className="font-light text-lg">{player.name}</span>
            <span className="text-lg font-bold">{player.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
