import React from "react";

const Leaderboard = () => {
  const players = [
    { name: "Player 1", score: 1200 },
    { name: "Player 2", score: 1100 },
    { name: "Player 3", score: 1000 },
    { name: "Player 4", score: 900 },
    { name: "Player 5", score: 800 },
  ];

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg text-white w-[325px]">
      <h2 className="text-3xl font-bold mb-6 text-center">LEADERBOARD</h2>
      <div className="space-y-3">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm"
          >
            <span className="font-medium text-lg">{player.name}</span>
            <span className="text-lg font-semibold">{player.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
