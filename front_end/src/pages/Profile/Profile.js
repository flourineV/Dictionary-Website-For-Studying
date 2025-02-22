import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfile, updateProfile } from "../../utils/profileApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faGlobe,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Profile = ({ currentUserId }) => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    avatar: "",
    displayName: "",
    age: 0,
    gender: "",
    bio: "",
    country: "",
    score: 0,
    wordLearned: 0,
    settings: {
      theme: "light",
      notifications: true,
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getProfile(userId);
        setUserProfile(data);
        setProfileData(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleEditToggle = () => {
    console.log("isEditing:", !isEditing); // Debug: Kiểm tra giá trị của isEditing
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        userId: profileData.userId,
        displayName: profileData.displayName,
        avatar: profileData.avatar,
        age: profileData.age,
        gender: profileData.gender,
        bio: profileData.bio,
        country: profileData.country,
      };

      await updateProfile(userId, updatedData);
      setIsEditing(false);

      const data = await getProfile(userId);
      setUserProfile(data);
      setProfileData(data);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="w-screen mx-auto bg-gradient-to-r from-[#300e56] to-[#1a0420] p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col md:flex-row items-center mt-16">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={profileData.avatar}
              alt="User Avatar"
              className="w-60 h-60 rounded-full object-cover mb-6 md:mb-0 shadow-lg border-4 border-white transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Profile Info */}
          <div className="text-center md:text-left ml-8 flex-1">
            <h1 className="text-3xl font-semibold text-white mb-2">
              {profileData.displayName}
            </h1>
            <p className="text-lg text-gray-300">{profileData.bio}</p>
            <div className="flex items-center justify-center md:justify-start space-x-4 mt-4">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faBirthdayCake}
                  className="text-gray-300 mr-2"
                />
                <p className="text-sm text-gray-300">
                  {profileData.age} years old
                </p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faVenusMars}
                  className="text-gray-300 mr-2"
                />
                <p className="text-sm text-gray-300 capitalize">
                  {profileData.gender}
                </p>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="text-gray-300 mr-2"
                />
                <p className="text-sm text-gray-300">{profileData.country}</p>
              </div>
            </div>
          </div>

          {/* Progress Circles for Score and Words Learned */}
          <div className="flex space-x-8 mr-[500px]">
            <div className="w-32 h-32">
              <CircularProgressbar
                value={profileData.score}
                text={`${profileData.score}/100`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#4ade80",
                  trailColor: "#374151",
                })}
              />
              <p className="text-center text-gray-300 mt-2">Score</p>
            </div>
            <div className="w-32 h-32">
              <CircularProgressbar
                value={profileData.wordLearned}
                text={`${profileData.wordLearned}/100`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#60a5fa",
                  trailColor: "#374151",
                })}
              />
              <p className="text-center text-gray-300 mt-2">Words Learned</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-300"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Editing Form */}
        {isEditing && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Edit Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Display Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Avatar URL
                </label>
                <input
                  type="text"
                  name="avatar"
                  value={profileData.avatar}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={profileData.age}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={profileData.country}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
