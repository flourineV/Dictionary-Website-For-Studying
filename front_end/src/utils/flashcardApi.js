import axios from "axios";

const API_URL = "http://localhost:3005/api/flashcards"; // URL cơ bản cho flashcards

export const addFlashcard = async (userId, word, meaning) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}`, {
      word,
      meaning,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding flashcard:", error);
    throw error;
  }
};

// Lấy danh sách flashcards
export const getFlashcards = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    throw error;
  }
};
