import { useLocation, useNavigate } from "react-router-dom";

const ExerciseResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) {
    return <p>Không có dữ liệu điểm số.</p>;
  }

  return (
    <div className="container mx-auto p-6 pt-20 text-center">
      <h1 className="text-3xl font-bold">Kết quả bài làm</h1>
      <p className="text-lg mt-4">
        Bạn đã đạt{" "}
        <strong>
          {result.score}/{result.total}
        </strong>{" "}
        điểm
      </p>

      <h2 className="text-xl font-semibold mt-6">Đáp án đúng</h2>
      <ul className="mt-4">
        {Object.entries(result.correctAnswers).map(([index, answer]) => (
          <li key={index} className="p-2 border rounded-md mt-2">
            Câu {parseInt(index) + 1}: {answer}
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/exercises")}
        className="bg-blue-500 text-white px-6 py-2 rounded-md mt-6"
      >
        Quay lại danh sách bài tập
      </button>
    </div>
  );
};

export default ExerciseResultPage;
