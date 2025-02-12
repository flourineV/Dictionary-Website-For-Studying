import React, { useState, useEffect } from "react";
import { Carousel, Card } from "../../components/Flashcard/Flashcard.js";
import { getFlashcards } from "../../utils/flashcardApi.js";
import { useSelector } from "react-redux";

const FlashcardPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const user = useSelector((state) => state.user.user || null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const result = await getFlashcards(user._id);
        if (result && Array.isArray(result)) {
          setFlashcards(result);
        } else {
          console.error("Invalid data format:", result);
        }
      } catch (error) {
        console.error("Failed to fetch flashcards:", error);
      }
    };

    fetchFlashcards();
  }, [user]);

  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden bg-white">
      {flashcards.length > 0 ? (
        <Carousel>
          {flashcards.map((flashcard, i) => (
            <Card key={i} title={flashcard.word} content={flashcard.meaning} />
          ))}
        </Carousel>
      ) : (
        <p className="text-gray-500">Bạn chưa có flashcard nào.</p>
      )}
    </div>
  );
};

export default FlashcardPage;
