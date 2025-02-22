import axios from "axios";

// Base URL của backend API
const API_URL = "http://localhost:3005/api/profile"; // Thay đổi theo URL thực tế của bạn

// Hàm lấy thông tin profile người dùng
export const getProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data; // Trả về dữ liệu profile từ API
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Hàm cập nhật thông tin profile người dùng
export const updateProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, profileData);
    return response.data; // Trả về dữ liệu đã cập nhật
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
