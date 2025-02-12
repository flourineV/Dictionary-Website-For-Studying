import axios from "axios";

const APIuser = "http://localhost:3005/api/auth";

// Đăng ký người dùng
export const SignUp = async (userData) => {
  try {
    const response = await axios.post(`${APIuser}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi đăng ký người dùng");
  }
};

// Đăng nhập người dùng
export const SignIn = async (userData) => {
  try {
    const response = await axios.post(`${APIuser}/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi đăng nhập");
  }
};
