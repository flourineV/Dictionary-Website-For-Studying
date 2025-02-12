import axios from "axios";

const API_BASE_URL = "http://localhost:3005/api/exercises";

export const getUserExercises = async (type, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      params: { type }, // Truyền type vào query
      headers: { Authorization: `Bearer ${token}` }, // Gửi token trong headers
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return null;
  }
};
