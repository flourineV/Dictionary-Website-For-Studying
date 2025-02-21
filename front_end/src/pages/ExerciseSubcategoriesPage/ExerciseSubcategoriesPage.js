import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSubcategories } from "../../utils/exercisesApi"; // API fetch subcategories
import { getUserProgress } from "../../utils/progressApi"; // API lấy progress
import { useSelector } from "react-redux";

const ExerciseSubcategoriesPage = () => {
  const { type, category } = useParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [progress, setProgress] = useState(null);
  const token = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user?.id); // Lấy từ Redux

  // Fetch danh sách subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        console.log("🔄 Fetching subcategories...");
        const data = await getSubcategories(type, category, token);
        setSubcategories(data);
        console.log("📡 API Response - Subcategories:", data);
      } catch (error) {
        console.error("❌ Error fetching subcategories:", error);
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [type, category, token]);

  // Fetch progress của user
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        console.log("🔄 Fetching user progress...");
        const progressData = await getUserProgress(userId, token);
        console.log(
          "📌 API Response - Progress:",
          JSON.stringify(progressData, null, 2)
        );
        setProgress(progressData);
      } catch (error) {
        console.error("❌ Error fetching progress:", error);
        setProgress(null);
      }
    };

    if (userId && token) {
      fetchProgress();
    }
  }, [userId, token]);

  return (
    <div className="container mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        {category} Exercises ({type})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subcategories.map((item, index) => {
          const categoryProgress = progress?.categories.find(
            (cat) => cat.type === type && cat.categoryName === category
          );
          const subProgress = categoryProgress?.subOrTests.find(
            (sub) => sub.name === item.name
          );

          const accuracy = subProgress ? subProgress.accuracy : 0;

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
              onClick={() =>
                navigate(
                  `/exercises/${type}/category/${encodeURIComponent(
                    category
                  )}/subcategory/${item.name}`
                )
              }
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>

              {/* Hiển thị accuracy nếu có */}
              {accuracy > 0 && (
                <p className="text-gray-600 mb-2">
                  Độ chính xác:{" "}
                  <span className="text-green-600 font-semibold">
                    {accuracy.toFixed(2)}%
                  </span>
                </p>
              )}

              {/* Thanh tiến trình */}
              <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full transition-all ${
                    accuracy > 0 ? "bg-green-500" : "bg-gray-400"
                  }`}
                  style={{ width: `${accuracy}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExerciseSubcategoriesPage;
