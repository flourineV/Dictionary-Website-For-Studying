import axios from "axios";

const API_BASE_URL = "http://localhost:3005/api"; // Cập nhật nếu backend chạy ở cổng khác

// 🔥 API: Lấy tiến trình của user
export const getUserProgress = async (userId, token) => {
  try {
    console.log(
      `🚀 Gọi API get-progress cho userId: ${userId}, Token: ${token}`
    );

    const response = await axios.get(`${API_BASE_URL}/get-progress/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token nếu API cần xác thực
      },
    });

    console.log("✅ API getUserProgress thành công:", response.data);
    return response.data.data; // Trả về dữ liệu tiến trình
  } catch (error) {
    console.error(
      "❌ Lỗi khi gọi API getUserProgress:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateUserProgress = async (
  userId,
  type,
  categoryName,
  subOrTestType,
  subOrTestName,
  correct,
  token // Nhận token từ Redux
) => {
  try {
    console.log("📤 Gửi request updateUserProgress với dữ liệu:", {
      userId,
      type,
      categoryName,
      subOrTestType,
      subOrTestName,
      correct,
    });

    const response = await axios.post(
      `${API_BASE_URL}/update-progress`,
      {
        userId,
        type,
        categoryName,
        subOrTestType,
        subOrTestName,
        correct,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 Thêm token vào request
        },
      }
    );

    console.log("✅ API updateUserProgress thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi cập nhật tiến trình:",
      error.response?.data || error.message
    );
    throw error;
  }
};
