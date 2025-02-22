import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";

import bgform from "../../assets/images/lofitrang.jpg";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, signUpUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    try {
      const userData = await dispatch(
        signInUser({ email: formData.email, password: formData.password })
      );
      console.log("Dữ liệu trả về từ signInUser:", userData);
      if (!userData) {
        alert("Lỗi: Không nhận được phản hồi từ server!");
        return;
      }

      localStorage.setItem("userInfo", JSON.stringify(userData));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSignUp = async () => {
    try {
      await dispatch(signUpUser(formData));
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };

  return (
    <div className="absolute flex w-full mx-auto h-screen bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{
          backgroundImage: `url(${bgform})`,
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0.5))",
        }}
      ></div>

      {/* Form Container */}
      <div className="relative flex w-full h-screen shadow-2xl rounded-lg overflow-hidden backdrop-blur-sm">
        <div
          className={`w-1/2 h-full flex flex-col items-center justify-center transition-all duration-1000 ${
            isSignUp
              ? "-translate-x-0 opacity-0 absolute"
              : "translate-x-full opacity-100 relative"
          }`}
        >
          <h1
            className="text-5xl font-bold text-white mb-5"
            style={{
              WebkitTextStroke: "1px black",
              WebkitTextFillColor: "white",
            }}
          >
            Sign In
          </h1>
          <div className="flex space-x-3 my-3">
            <a
              href="#"
              className="group w-12 h-12 flex items-center justify-center border border-black rounded-full transition-all duration-300 hover:bg-blue-600 shadow-md"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-gray-700 group-hover:text-white h-5 w-5"
              />
            </a>
            <a
              href="#"
              className="group w-12 h-12 flex items-center justify-center border border-black rounded-full transition-all duration-300 hover:bg-red-500 shadow-md"
            >
              <FontAwesomeIcon
                icon={faGooglePlusG}
                className="text-gray-700 group-hover:text-white h-7 w-7"
              />
            </a>
            <a
              href="#"
              className="group w-12 h-12 flex items-center justify-center border border-black rounded-full transition-all duration-300 hover:bg-gray-800 shadow-md"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="text-gray-700 group-hover:text-white h-6 w-6"
              />
            </a>
          </div>
          <h2 className="mt-7">or use your account</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autocomplete="off"
            className="w-2/4 p-3 border rounded-md mt-5 shadow-sm cursor-text"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="off"
            className="w-2/4 p-3 border rounded-md mt-5 shadow-sm cursor-text"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="mt-10 bg-red-500 text-white px-6 py-3 rounded-full w-1/4 shadow-lg hover:bg-white hover:text-red-500"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>

        {/* Sign Up */}
        <div
          className={`relative z-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-1000 ${
            isSignUp
              ? "translate-x-0 opacity-100 relative"
              : "translate-x-full opacity-0 absolute"
          }`}
        >
          <h1
            className="text-5xl font-bold text-white mb-5"
            style={{
              WebkitTextStroke: "1px black",
              WebkitTextFillColor: "white",
            }}
          >
            Create Account
          </h1>
          <div className="flex space-x-3 my-3">
            <a
              href="#"
              className="group w-12 h-12 flex items-center justify-center border border-black rounded-full transition-all duration-300 hover:bg-blue-600 shadow-md"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-gray-700 group-hover:text-white h-5 w-5"
              />
            </a>
            <a
              href="#"
              className="group w-12 h-12 flex items-center justify-center border border-black rounded-full transition-all duration-300 hover:bg-red-500 shadow-md"
            >
              <FontAwesomeIcon
                icon={faGooglePlusG}
                className="text-gray-700 group-hover:text-white h-7 w-7"
              />
            </a>
            <a
              href="#"
              className="group w-12 h-12 flex items-center justify-center border border-black rounded-full transition-all duration-300 hover:bg-gray-800 shadow-md"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="text-gray-700 group-hover:text-white h-6 w-6"
              />
            </a>
          </div>
          <h2 className="mt-7">or use your email for registration</h2>
          <input
            type="text"
            name="name"
            placeholder="Username"
            className="w-2/4 p-3 border rounded-md shadow-sm mt-5 cursor-text"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-2/4 p-3 border rounded-md mt-5 shadow-sm cursor-text"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-2/4 p-3 border rounded-md mt-5 shadow-sm cursor-text"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="mt-8 bg-red-500 text-white px-6 py-3 rounded-full w-1/4 shadow-lg hover:bg-white hover:text-red-500"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>

        {/* Overlay Panel */}
        <div
          className={`absolute top-0 left-0 right-0 w-1/2 h-full flex flex-col items-center justify-center text-white transition-transform duration-1000 ${
            isSignUp ? "translate-x-full" : "translate-x-0"
          } bg-gradient-to-r from-red-600 to-pink-600 text-center shadow-xl`}
        >
          {isSignUp ? (
            <>
              <h1 className="text-6xl font-bold">Welcome Back!</h1>
              <p className="px-6 text-2xl mt-4">
                To keep connected with us please login with your personal info.
              </p>
              <button
                className="mt-10 border border-white px-6 py-3 rounded-full hover:bg-white hover:text-red-500 transition-all duration-300"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <h1 className="text-6xl font-bold">Hello, Friend!</h1>
              <p className="px-6 text-2xl mt-4">
                Enter your personal details and start your journey with us
              </p>
              <button
                className="mt-10 border border-white px-6 py-3 rounded-full hover:bg-white hover:text-red-500 transition-all duration-300"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
