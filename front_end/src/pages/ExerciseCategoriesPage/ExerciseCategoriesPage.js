import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategories } from "../../utils/exercisesApi";
import { getUserProgress } from "../../utils/progressApi"; // API lấy tiến trình
import { useSelector } from "react-redux";

const ExerciseCategoriesPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [progress, setProgress] = useState(null);
  const token = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user.user?._id); // Lấy từ Redux

  // Fetch danh sách categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("🔄 Fetching categories for type:", type);
        const data = await getCategories(type, token);
        console.log("📡 API Response - Categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [type, token]);

  // Fetch progress của user
  useEffect(() => {
    console.log("🔄 Fetching user progress...");
    getUserProgress(userId, token)
      .then((progressData) => {
        console.log(
          "📌 API Response - Progress:",
          JSON.stringify(progressData, null, 2)
        );
        setProgress(progressData);
      })
      .catch((error) => {
        console.error("❌ Error fetching progress:", error);
        setProgress(null);
      });
  }, [userId, token]);

  return (
    <div className="container mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        {type} Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((item, index) => {
          const categoryProgress = progress?.categories.find(
            (cat) => cat.type === type && cat.categoryName === item.name
          );

          const completion = categoryProgress ? categoryProgress.completion : 0;

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
              onClick={() =>
                navigate(
                  `/exercises/${type}/category/${encodeURIComponent(item.name)}`
                )
              }
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>

              {/* Hiển thị completion nếu có */}
              {completion > 0 && (
                <p className="text-gray-600 mb-2">
                  Hoàn thành:{" "}
                  <span className="text-green-600 font-semibold">
                    {completion.toFixed(2)}%
                  </span>
                </p>
              )}

              {/* Thanh tiến trình */}
              <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full transition-all ${
                    completion > 0 ? "bg-green-500" : "bg-gray-400"
                  }`}
                  style={{ width: `${completion}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExerciseCategoriesPage;
