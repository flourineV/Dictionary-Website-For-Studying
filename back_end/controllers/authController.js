const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

//Sign Up
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "This email has been used." });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: "user",
    });

    await newUser.save();
    console.log("✅ User registered:", newUser); // Kiểm tra user đã lưu

    const token = generateToken(newUser._id);
    console.log("🔑 Token generated:", token); // Kiểm tra token

    res.status(201).json({ user: newUser, token, role: newUser.role });
  } catch (error) {
    console.error("❌ Register Error:", error); // Log lỗi rõ hơn

    res.status(500).json({
      message: "Lỗi server",
      error: error.message || "Không có lỗi cụ thể",
    });
  }
};

//Sign In
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect." });
    }

    const token = generateToken(user._id, user.role);

    res.json({ user: user, token });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = { registerUser, loginUser };
