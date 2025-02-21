import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestions } from "../../utils/exercisesApi";
import { useSelector } from "react-redux";

const ExerciseQuestionsPage = () => {
  const { type, category, subcategory } = useParams();
  const [questions, setQuestions] = useState([]);
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions(type, category, subcategory, token);
      setQuestions(
        data.flatMap((item) =>
          item.subcategories.flatMap((sub) => sub.questions)
        )
      );
    };
    fetchQuestions();
  }, [type, category, subcategory, token]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        {subcategory} Exercises
      </h1>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {question.questionText}
            </h2>
            {question.options.map((option, i) => (
              <button
                key={i}
                className="p-3 rounded-lg border-2 border-gray-300 hover:bg-gray-200 transition"
              >
                {option}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseQuestionsPage;
