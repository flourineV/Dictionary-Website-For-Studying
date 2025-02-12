import React from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">English Exercises</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
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
              <h2 className="text-2xl font-semibold mb-2">{exercise.title}</h2>
              <p className="text-gray-700">{exercise.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExercisePage;
