const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET, // Đảm bảo biến môi trường này có giá trị
    { expiresIn: "5d" }
  );
};

module.exports = generateToken;
