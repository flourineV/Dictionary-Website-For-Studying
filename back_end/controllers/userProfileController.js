import userprofile from "../models/userprofile.js";

// Lấy thông tin profile của user
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ JWT
    const profile = await userprofile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Cập nhật profile user
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body; // Dữ liệu gửi từ frontend

    const updatedProfile = await userprofile.findOneAndUpdate(
      { userId },
      { $set: updates }, // Cập nhật từng trường được gửi từ frontend
      { new: true, upsert: true }
    );

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
