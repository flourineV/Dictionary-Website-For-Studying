import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserExercises } from "../../utils/exercisesApi"; // Import hàm API

const ExerciseDetailPage = () => {
  const { category, exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const token = useSelector((state) => state.token); // Lấy token từ Redux

  useEffect(() => {
    const fetchExercise = async () => {
      if (!token) return; // Nếu chưa có token, không gọi API

      const data = await getUserExercises(category, token);
      if (!data) return;

      // Tìm bài tập trong cả danh sách chính & subcategories
      let foundExercise = data.find((ex) => ex._id === exerciseId);
      if (!foundExercise) {
        data.forEach((ex) => {
          if (ex.subcategories) {
            ex.subcategories.forEach((sub) => {
              if (sub._id === exerciseId) foundExercise = sub;
            });
          }
        });
      }
      setExercise(foundExercise || null);
    };

    fetchExercise();
  }, [category, exerciseId, token]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  if (!exercise) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        {exercise.category} - {exercise.difficulty || "Unknown"}
      </h1>
      <div className="space-y-6">
        {exercise.questions.map((question) => (
          <div key={question._id} className="bg-gray-100 p-4 rounded-lg">
            <p className="text-lg font-semibold">{question.questionText}</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`p-2 border rounded ${
                    showResults
                      ? option === question.correctAnswer
                        ? "bg-green-300"
                        : option === selectedAnswers[question._id]
                        ? "bg-red-300"
                        : "bg-white"
                      : "bg-white hover:bg-gray-200"
                  }`}
                  onClick={() => handleAnswerSelect(question._id, option)}
                  disabled={showResults}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!showResults && (
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={checkAnswers}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default ExerciseDetailPage;
