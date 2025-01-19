import axios from "axios";

const API_URL = "http://localhost:3005/api/flashcards"; // Thay bằng URL API của bạn

// Thêm flashcard vào database
export const addFlashcard = async (word, meaning) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.post(API_URL, { userId, word, meaning });
    return response.data;
  } catch (error) {
    console.error("Error adding flashcard:", error);
    throw error;
  }
};

// Lấy danh sách flashcards
export const getFlashcards = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`${API_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    throw error;
  }
};
