import React, { useEffect, useState } from "react";
import axios from "axios";

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const userId = localStorage.getItem("userId"); // Giả định userId được lưu trong localStorage

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get(`/api/flashcards/${userId}`);
        setFlashcards(response.data);
      } catch (error) {
        console.error("Không thể lấy danh sách flashcards:", error);
      }
    };

    fetchFlashcards();
  }, [userId]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Flashcards của tôi</h1>
      {flashcards.length === 0 ? (
        <p className="mt-4">
          Bạn chưa có flashcard nào. Hãy thêm từ mới để học!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {flashcards.map((card) => (
            <div
              key={card._id}
              className="p-4 border rounded shadow-md bg-white"
            >
              <h3 className="text-xl font-bold">{card.word}</h3>
              <p className="mt-2">{card.meaning}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashcardsPage;
