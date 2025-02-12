import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserExercises } from "../../utils/exercisesApi"; // Import hàm fetch API
import { useSelector } from "react-redux";

const ExerciseListPage = () => {
  const { category } = useParams(); // Lấy loại bài tập từ URL (grammar, vocab,...)
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const fetchExercises = async () => {
      const data = await getUserExercises(category, token);
      console.log("Fetched exercises:", data); // Debug xem API trả về gì
      if (data) setExercises(data);
    };
    fetchExercises();
  }, [category]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        {category} Exercises
      </h1>
      {exercises.length === 0 ? (
        <p className="text-center text-gray-500">No exercises found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise._id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/exercises/${category}/${exercise._id}`)}
            >
              <h2 className="text-xl font-semibold">{exercise.category}</h2>
              <p className="text-gray-600">Difficulty: {exercise.difficulty}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseListPage;
