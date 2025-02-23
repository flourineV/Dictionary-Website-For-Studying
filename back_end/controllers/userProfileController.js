const UserProfile = require("../models/userProfile");

// Lấy thông tin profile của người dùng
exports.getUserProfile = async (req, res) => {
  try {
    // Lấy thông tin profile dựa trên userId từ params
    const userProfile = await UserProfile.findOne({
      userId: req.params.userId,
    });

    // Kiểm tra xem có tìm thấy profile không
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
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

exports.createUserProfile = async (req, res) => {
  try {
    const { userId, displayName, age, gender, bio, country } = req.body;

    // Kiểm tra xem tất cả các trường có đầy đủ không
    if (!userId || !displayName || !age || !gender) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    // Kiểm tra xem profile đã tồn tại chưa
    const existingProfile = await UserProfile.findOne({ userId });

    if (existingProfile) {
      return res.status(400).json({ error: "User profile already exists" });
    }

    // Tạo mới profile
    const newProfile = new UserProfile({
      userId,
      displayName,
      age,
      gender,
      bio,
      country,
    });

    // Lưu profile vào cơ sở dữ liệu
    await newProfile.save();

    // Trả về thông tin profile đã tạo
    res.status(201).json(newProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật thông tin profile của người dùng
exports.updateUserProfile = async (req, res) => {
  try {
    // Lấy thông tin từ body của request
    const { displayName, age, gender, bio, country, avatar } = req.body;

    // Tìm profile người dùng theo userId (được truyền trong params)
    const userProfile = await UserProfile.findOne({
      userId: req.params.userId,
    });

    // Kiểm tra xem profile người dùng có tồn tại không
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    // Cập nhật các trường thông tin
    if (displayName) userProfile.displayName = displayName;
    if (age) userProfile.age = age;
    if (gender) userProfile.gender = gender;
    if (bio) userProfile.bio = bio;
    if (country) userProfile.country = country;
    if (avatar) userProfile.avatar = avatar;

    // Lưu lại thông tin đã cập nhật
    await userProfile.save();

    // Trả về profile đã được cập nhật
    res.status(200).json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật điểm số của người dùng
exports.updateScore = async (req, res) => {
  try {
    const { score } = req.body;

    // Kiểm tra xem điểm số có được gửi lên không
    if (score === undefined) {
      return res.status(400).json({ error: "Score is required" });
    }

    // Tìm profile người dùng theo userId
    const userProfile = await UserProfile.findOne({
      userId: req.params.userId,
    });

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    // Cập nhật điểm số
    userProfile.score += score;

    // Lưu lại thông tin đã cập nhật
    await userProfile.save();

    res
      .status(200)
      .json({ message: "Score updated successfully", userProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật số từ đã học của người dùng
exports.updateWordLearned = async (req, res) => {
  try {
    const { wordLearned } = req.body;

    // Kiểm tra xem số từ học được có được gửi lên không
    if (wordLearned === undefined) {
      return res.status(400).json({ error: "wordLearned is required" });
    }

    // Tìm profile người dùng theo userId
    const userProfile = await UserProfile.findOne({
      userId: req.params.userId,
    });

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    // Cập nhật số từ đã học
    userProfile.wordLearned += wordLearned;

    // Lưu lại thông tin đã cập nhật
    await userProfile.save();

    res
      .status(200)
      .json({
        message: "Word learned count updated successfully",
        userProfile,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
