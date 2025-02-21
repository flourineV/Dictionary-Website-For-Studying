import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTests } from "../../utils/exercisesApi"; // API fetch tests
import { getUserProgress } from "../../utils/progressApi"; // API lấy tiến trình
import { useSelector } from "react-redux";

const ExerciseTestsPage = () => {
  const { type, category } = useParams();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [progress, setProgress] = useState(null);
  const token = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user.user?._id); // Lấy từ Redux
  // Fetch danh sách bài test
  useEffect(() => {
    const fetchTests = async () => {
      try {
        console.log("🔄 Fetching tests...");
        const testData = await getTests(type, category, token);
        console.log(
          "📌 API Response - Tests:",
          JSON.stringify(testData, null, 2)
        );
        setTests(testData);
      } catch (error) {
        console.error("❌ Error fetching tests:", error);
        setTests([]);
      }
    };

    fetchTests();
  }, [type, category, token]);

  useEffect(() => {
    console.log("✅ userId trong useEffect:", userId); // Kiểm tra userId có hợp lệ không

    const fetchProgress = async () => {
      try {
        console.log("🔄 Fetching user progress...");
        const progressData = await getUserProgress(userId, token);

        if (!progressData) {
          console.error("❌ API trả về `undefined` hoặc `null`");
          return;
        }

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

    if (userId) {
      fetchProgress();
    }
  }, [userId]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Tiêu đề trang */}
      <h1 className="text-4xl font-bold text-center mb-10 capitalize text-gray-800">
        {category} Tests ({type})
      </h1>

      {/* Nếu không có bài test */}
      {tests.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          Không có bài test nào.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.map((test, index) => {
            const categoryProgress = progress?.categories.find(
              (cat) => cat.type === type && cat.categoryName === category
            );
            const testProgress = categoryProgress?.subOrTests.find(
              (t) => t.name === test.name
            );

            // Nếu có kết quả, lấy `accuracy`, nếu không thì mặc định 0
            const accuracy = testProgress ? testProgress.accuracy : 0;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transform transition-all hover:-translate-y-1"
                onClick={() => {
                  console.log(
                    `Navigating to: /exercises/${type}/category/${category}/test/${test.name}`
                  );
                  navigate(
                    `/exercises/${type}/category/${encodeURIComponent(
                      category
                    )}/test/${test.name}`
                  );
                }}
              >
                {/* Tên bài test */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {test.name}
                </h2>

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
      )}
    </div>
  );
};

export default ExerciseTestsPage;
