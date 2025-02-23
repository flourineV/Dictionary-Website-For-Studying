import axios from "axios";

const API_URL = "http://localhost:3005/api";

export const updateScore = async (userId) => {
  try {
    const response = await axios.patch(`${API_URL}/score/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error update score: ", error);
    throw error;
  }
};

export const updateWordLearned = async (userId) => {
  try {
    const response = await axios.patch(`${API_URL}/wordLearned/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error updating word learned: ", error);
    throw error;
  }
};
