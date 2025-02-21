import axios from "axios";

const API_BASE_URL = "http://localhost:3005/api/exercises/user";

/**
 * 🟢 Lấy danh sách categories (Bước 1)
 * @param {string} type - Loại bài tập (vd: grammar, vocabulary)
 * @param {string} token - Token xác thực
 * @returns {Promise<Array>} - Danh sách categories
 */
export const getCategories = async (type, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return null;
  }
};

/**
 * 🟢 Lấy danh sách subcategories theo category (Bước 2)
 * @param {string} type - Loại bài tập
 * @param {string} category - Tên category (vd: Tenses)
 * @param {string} token - Token xác thực
 * @returns {Promise<Array>} - Danh sách subcategories
 */
export const getSubcategories = async (type, category, token) => {
  try {
    const url = `${API_BASE_URL}/${type}/category/${category}`;
    console.log("🔗 API Request URL:", url);
    console.log("🔑 Token:", token);

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ API Response - Subcategories:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching subcategories:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * 🟢 Lấy danh sách câu hỏi theo subcategory (Bước 3)
 * @param {string} type - Loại bài tập
 * @param {string} category - Tên category
 * @param {string} subcategory - Tên subcategory
 * @param {string} token - Token xác thực
 * @returns {Promise<Array>} - Danh sách câu hỏi
 */
export const getQuestions = async (type, category, subcategory, token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${type}/category/${category}/subcategory/${subcategory}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    return [];
  }
};

/**
 * 🟢 Lấy danh sách bài test theo category (Bước 2)
 * @param {string} type - Loại bài tập (reading hoặc listening)
 * @param {string} category - Tên category (vd: Short Passage, Long Passage)
 * @param {string} token - Token xác thực
 * @returns {Promise<Array>} - Danh sách bài test
 */
export const getTests = async (type, category, token) => {
  try {
    const url = `${API_BASE_URL}/${type}/category/${category}`;
    console.log("🔗 API Request URL:", url);
    console.log("🔑 Token:", token);

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ API Response - Tests:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching tests:",
      error.response?.data || error.message
    );
    return [];
  }
};

/**
 * 🟢 Lấy danh sách câu hỏi theo bài test (Bước 3)
 * @param {string} type - Loại bài tập (reading hoặc listening)
 * @param {string} category - Tên category
 * @param {string} test - Tên bài test (vd: Test 1, Test 2)
 * @param {string} token - Token xác thực
 * @returns {Promise<Object>} - Chi tiết bài test gồm câu hỏi + passage/audioUrl
 */
export const getReadingListeningQuestions = async (
  type,
  category,
  test,
  token
) => {
  try {
    const url = `${API_BASE_URL}/${type}/category/${category}/test/${test}`; // Thêm `user` vào URL
    console.log("🔗 API Request URL:", url);
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching questions:", error);
    return null;
  }
};

const API_ADMIN_URL = "http://localhost:3005/api/exercises/admin";

export const createExercise = async (type, exerciseData, token) => {
  try {
    const response = await axios.post(
      `${API_ADMIN_URL}/${type}`,
      exerciseData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating exercise:",
      error.response?.data || error.message
    );
    throw error;
  }
};
