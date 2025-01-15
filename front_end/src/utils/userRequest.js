import axios from "axios";

const APIuser = "http://localhost:3005/api/user";

// Đăng ký người dùng
export const SignUp = async (userData) => {
  try {
    const response = await axios.post(`${APIuser}/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi đăng ký người dùng");
  }
};

// Đăng nhập người dùng
export const SignIn = async (userData) => {
  try {
    const response = await axios.post(`${APIuser}/signin`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Lỗi đăng nhập");
  }
};
