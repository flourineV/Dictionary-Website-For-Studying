import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserProgress } from "../../utils/progressApi"; // API lấy tiến trình
import images from "../../assets/images";

const exercises = [
  {
    id: "grammar",
    title: "Grammar Practice",
    description: "Test your grammar skills with these exercises.",
    image: images.grammar,
  },
  {
    id: "vocabulary",
    title: "Vocabulary Quiz",
    description: "Challenge your vocabulary knowledge.",
    image: images.vocabulary,
  },
  {
    id: "reading",
    title: "Reading Comprehension",
    description: "Improve your reading skills with comprehension passages.",
    image: images.reading,
  },
  {
    id: "listening",
    title: "Listening Test",
    description: "Sharpen your listening abilities with audio exercises.",
    image: images.listening,
  },
];

const ExercisePage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const token = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user.user?._id);

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
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">English Exercises</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => {
          const exerciseProgress = progress?.progress?.[exercise.id] || 0;

          return (
            <div
              key={exercise.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
              onClick={() => navigate(`/exercises/${exercise.id}`)}
            >
              <img
                src={exercise.image}
                alt={exercise.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">
                  {exercise.title}
                </h2>
                <p className="text-gray-700">{exercise.description}</p>
              </div>

              {/* Hiển thị completion nếu có */}
              {exerciseProgress > 0 && (
                <p className="text-gray-600 text-center pb-2">
                  Hoàn thành:{" "}
                  <span className="text-green-600 font-semibold">
                    {exerciseProgress.toFixed(2)}%
                  </span>
                </p>
              )}

              {/* Thanh tiến trình */}
              <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full transition-all ${
                    exerciseProgress > 0 ? "bg-green-500" : "bg-gray-400"
                  }`}
                  style={{ width: `${exerciseProgress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExercisePage;
