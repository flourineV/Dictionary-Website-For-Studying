import { useState } from "react";
import { useSelector } from "react-redux";
import { createExercise } from "../../utils/exercisesApi";
import { useNavigate } from "react-router-dom";

const AdminCreateExercisePage = () => {
  const [type, setType] = useState("reading");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const token = useSelector((state) => state.user?.token);
  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exerciseData = {
      category,
      tests: [
        {
          name,
          passage,
          questions,
        },
      ],
    };

    try {
      const response = await createExercise(type, exerciseData, token);
      alert("Bài tập đã được tạo thành công!");
      navigate(`/admin`);
    } catch (error) {
      alert("Lỗi khi tạo bài tập!");
    }
  };

  return (
    <div className="container mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">Tạo Bài Tập Mới</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        {/* Chọn loại bài tập */}
        <label className="block text-lg font-semibold">Loại bài tập:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded-md w-full"
        >
          <option value="reading">Reading</option>
          <option value="listening">Listening</option>
          <option value="grammar">Grammar</option>
          <option value="vocab">Vocabulary</option>
        </select>
        <label className="block mt-4 text-lg font-semibold">
          Danh mục bài tập:
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md w-full"
          placeholder="Nhập danh mục (e.g., Short Passage, Vocabulary, Grammar)"
        />
        {/* Nhập tiêu đề bài tập */}
        <label className="block mt-4 text-lg font-semibold">Tên bài tập:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-md w-full"
        />

        {/* Nhập passage (chỉ với Reading) */}
        {type === "reading" && (
          <>
            <label className="block mt-4 text-lg font-semibold">
              Đoạn văn:
            </label>
            <textarea
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              className="p-2 border rounded-md w-full h-32"
            />
          </>
        )}

        {/* Nhập câu hỏi */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Danh sách câu hỏi:</h2>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="border p-4 rounded-md mt-4">
              <label className="block font-semibold">
                Câu hỏi {qIndex + 1}:
              </label>
              <input
                type="text"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "questionText", e.target.value)
                }
                className="p-2 border rounded-md w-full"
              />

              {/* Nhập các lựa chọn */}
              <div className="mt-2">
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      className="p-2 border rounded-md w-full"
                    />
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctAnswer === option}
                      onChange={() =>
                        handleQuestionChange(qIndex, "correctAnswer", option)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            + Thêm câu hỏi
          </button>
        </div>

        {/* Nút tạo bài tập */}
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md w-full"
        >
          Tạo bài tập
        </button>
      </form>
    </div>
  );
};

export default AdminCreateExercisePage;
