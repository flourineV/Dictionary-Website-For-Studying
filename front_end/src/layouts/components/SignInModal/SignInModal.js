import React, { useState } from "react";
import { Link } from "react-router-dom";

import { loginUser } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

import { GoogleLogin } from "@react-oauth/google";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SignUp, SignIn } from "../../../utils/userRequest";

function Login({ closeModal, onLoginSuccess }) {
  const [animationDirection, setAnimationDirection] = useState("down");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const toggleMode = () => {
    setAnimationDirection(isLogin ? "up" : "down");
    setTimeout(() => {
      setIsLogin((prev) => !prev); // Sử dụng callback để tránh vấn đề state bất đồng bộ
    }, 500);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const formData = { name, email, password };

    try {
      const result = await SignUp(formData); // Gọi API SignUp
      setMessage(result.message);
      setError("");

      const newUser = {
        ...result.user,
        avatar:
          "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg", // Đường dẫn ảnh avatar mặc định
        name: result.user.name || result.user.username, // Nếu không có tên, dùng username làm tên
      };

      dispatch(loginUser(newUser)); // Dispatch thông tin người dùng vào Redux
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("userId", result.user._id);
      onLoginSuccess(newUser); // Gọi callback khi đăng nhập thành công
      closeModal();
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const formData = { email, password };

    try {
      const result = await SignIn(formData);
      setMessage("Login thành công");

      const loggedInUser = {
        ...result.user,
        avatar:
          result.user.avatar ||
          "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg", // Avatar mặc định nếu không có
        name: result.user.name || result.user.username, // Dùng tên người dùng hoặc username nếu không có tên
      };

      dispatch(loginUser(loggedInUser)); // Dispatch thông tin người dùng vào Redux
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("userId", result.user._id);

      onLoginSuccess(result.user); // Gọi callback khi đăng nhập thành công
      closeModal();
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await handleLogin(e);
    } else {
      await handleSignUp(e);
    }
  };

  const handleGoogleLogin = (response) => {
    console.log("Google login success", response);
  };

  const responseFacebook = (response) => {
    console.log("Facebook login success", response);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-1/3 relative transform transition-transform duration-500 ease-out ${
          animationDirection === "down" ? "slide-down" : "slide-up"
        }`}
      >
        {/* Nút đóng modal */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6" // Tăng kích thước của icon (6 là size lớn hơn)
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Tiêu đề Login/Sign Up */}
        <h1 className="text-2xl font-bold text-center mb-3">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        {/* Form Login/Sign Up */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-3"
              >
                {passwordVisible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute right-3 top-3"
                >
                  {confirmPasswordVisible ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </button>
              </div>
            </div>
          )}

          {!isLogin && (
            <div className="mb-3 flex items-center">
              <input
                type="checkbox"
                id="acceptTerms"
                required
                className="mr-2"
              />
              <label htmlFor="acceptTerms" className="text-gray-600">
                I accept the{" "}
                <Link
                  to="/terms-of-service"
                  className="text-blue-500 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="text-blue-500 hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-600 text-sm bg-white">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Các nút đăng nhập bằng Google và Facebook */}
          <div className="mt-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log("Google login failed")}
              useOneTap
            />
          </div>
          <div className="mt-4">
            {/* <FacebookLogin
              appId="YOUR_FACEBOOK_APP_ID"
              fields="name,email,picture"
              callback={responseFacebook}
              textButton="Login with Facebook"
              cssClass="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            /> */}
          </div>
        </form>

        {/* Chuyển đổi Login/Sign Up */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
      {message && <div className="text-green-500">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default Login;
