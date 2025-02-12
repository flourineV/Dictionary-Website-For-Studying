const User = require("../models/User");

// Lấy danh sách user (Admin Only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Không trả về password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Xóa user (Admin Only)
const deleteUsers = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = { getUsers, deleteUsers };
