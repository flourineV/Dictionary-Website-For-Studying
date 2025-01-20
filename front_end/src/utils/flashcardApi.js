import axios from "axios";

const API_URL = "http://localhost:3005/api/flashcards"; // URL cơ bản cho flashcards

export const addFlashcard = async (word, meaning) => {
  try {
    // Lấy dữ liệu từ localStorage
    const user = JSON.parse(localStorage.getItem("user")); // Parse chuỗi JSON thành object
    if (!user || !user._id) {
      throw new Error("User ID is missing in localStorage");
    }
    const userId = user._id; // Lấy _id từ object user

    // Tạo URL kèm userId
    const url = `${API_URL}/${userId}`;

    // Gửi yêu cầu POST với word và meaning
    const response = await axios.post(url, { word, meaning });
    return response.data;
  } catch (error) {
    console.error("Error adding flashcard:", error);
    throw error;
  }
};

// Lấy danh sách flashcards
export const getFlashcards = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id; // Lấy _id từ object user

    // Tạo URL kèm userId
    const url = `${API_URL}/${userId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    throw error;
  }
};
