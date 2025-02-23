import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReadingListeningQuestions } from "../../utils/exercisesApi";
import { useSelector } from "react-redux";
import { updateUserProgress } from "../../utils/progressApi";

const ExerciseTestQuestionsPage = () => {
  const { type, category, test } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.token);
  const [exercise, setExercise] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const data = await getReadingListeningQuestions(
          type,
          category,
          test,
          token
        );
        setExercise(data);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };
    fetchExercise();
  }, [type, category, test, token]);

  const handleInputChange = (questionIndex, value) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    let score = 0;
    const total = exercise.questions.length;
    const correctAnswers = {};

    exercise.questions.forEach((question, index) => {
      correctAnswers[index] = question.correctAnswer;
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });

    try {
      console.log("📤 Gửi request updateUserProgress với dữ liệu:");
      console.log({
        userId: user._id,
        type,
        categoryName: category,
        subOrTestType: "test",
        subOrTestName: test,
        correct: score,
      });

      const response = await updateUserProgress(
        user._id,
        type,
        category,
        "test",
        test,
        score,
        token
      );

      console.log("✅ API updateUserProgress thành công:", response);

      // Điều hướng đến trang kết quả
      navigate(`/exercises/${type}/category/${category}/test/${test}/result`, {
        state: { score, total, correctAnswers },
      });
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật tiến trình:", error);

      if (error.response) {
        console.error("🛑 Response Status:", error.response.status);
        console.error("🛑 Response Data:", error.response.data);
        alert(
          `Có lỗi xảy ra: ${
            error.response.data.message || "Lỗi không xác định"
          }`
        );
      } else if (error.request) {
        console.error("🛑 Không nhận được phản hồi từ server:", error.request);
        alert(
          "Không thể kết nối đến server. Kiểm tra backend có đang chạy không!"
        );
      } else {
        console.error("🛑 Lỗi không xác định:", error.message);
        alert(`Lỗi không xác định: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!exercise) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">{exercise.name}</h1>

      {type === "reading" && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold">Passage</h2>
          <p>{exercise.passage}</p>
        </div>
      )}

      {type === "listening" && (
        <div className="mb-6">
          <audio controls className="w-full">
            <source src={exercise.audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          {exercise.transcript && (
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
              <h2 className="text-lg font-semibold">Transcript</h2>
              <p>{exercise.transcript}</p>
            </div>
          )}
        </div>
      )}

      <div>
        {exercise.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{question.questionText}</h3>
            {question.options ? (
              <ul>
                {question.options.map((option, i) => (
                  <li key={i} className="p-2 border rounded-md mt-2">
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleInputChange(index, option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <input
                type="text"
                className="p-2 border rounded-md w-full mt-2"
                placeholder="Nhập câu trả lời..."
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-2 rounded-md mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang chấm điểm..." : "Nộp bài"}
      </button>
    </div>
  );
};

export default ExerciseTestQuestionsPage;
