import axios from "axios";

const API_BASE_URL = "http://localhost:3005/api/blogs";

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching all blogs", error);
    return null;
  }
};

export const getBlogById = async (blogId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${blogId}`); // Fetch blog by ID
    return response.data; // Return blog data
  } catch (error) {
    console.error(`❌ Error fetching blog with ID ${blogId}`, error);
    return null;
  }
};
