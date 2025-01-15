const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

///Đăng ký người dùng
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const score = 0;
  const wordlearned = 0;
  try {
    // //Kiểm tra xem email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    //Tạo người dùng mới
    const newUser = new User({
      name,
      email,
      password,
      score,
      wordlearned,
    });

    //Lưu người dùng vô cơ sở dữ liệu
    const savedUser = await newUser.save();
    res.status(201).json({ message: "Signup thành công", user: savedUser });
  } catch (error) {
    console.error("Error during signup:", error); // Thêm log chi tiết lỗi vào console
    res
      .status(500)
      .json({ message: "Lỗi khi đăng ký người dùng", error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // Tìm người dùng qua email
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Kiểm tra mật khẩu
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });
    res.status(200).json({ user, token });
  } catch (err) {
    console.error("Error during signin:", err); // Ghi log lỗi
    res.status(500).json({ message: "Lỗi khi đăng nhập", error: err.message });
  }
});

module.exports = router;
