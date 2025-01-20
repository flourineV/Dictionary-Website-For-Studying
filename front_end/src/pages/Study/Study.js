import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import SquareBox from "../../components/SquareBox";
import images from "../../assets/images";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Thêm import useSelector
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Study = () => {
  const [animate, setAnimate] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        setAnimate(true);
      }
    },
  });
  const userId = useSelector((state) => state.user.userId); // Lấy userId từ Redux

  // Kiểm tra nếu không có userId, điều hướng về trang login

  // Generate dates from today backwards
  const generatePastDates = (days) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - i);
      dates.push(`${pastDate.getDate()}/${pastDate.getMonth() + 1}`); // Định dạng "date/month"
    }
    return dates.reverse();
  };

  useEffect(() => {
    // Simulated data for words learned and exercises completed
    const dates = generatePastDates(7);
    const wordsLearned = [5, 10, 7, 15, 8, 12, 9]; // Replace with real data
    const exercisesCompleted = [3, 7, 5, 10, 6, 8, 4]; // Replace with real data

    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Words Learned",
          data: wordsLearned,
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Exercises Completed",
          data: exercisesCompleted,
          backgroundColor: "rgba(255, 99, 132, 0.7)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weekly Study Progress",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

  const wordImageArray = [images.wordbox];
  const studyImageArray = [
    images.study1box,
    images.study2box,
    images.study3box,
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Your Study Progress
      </h1>
      <div
        ref={ref}
        className={` bg-azure rounded-lg shadow-md p-6 transition-all duration-1000 ${
          animate
            ? "transform translate-y-0 opacity-100"
            : "transform translate-y-10 opacity-0"
        }`}
      >
        <Bar data={chartData} options={options} />
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8 mt-10">
        <SquareBox
          images={[images.flashcards]}
          title="📚 Flashcards"
          content="Reviewing previous words is the key to master it!"
          buttonText="Flashcards GO!"
          onClick={() => navigate(`/flashcards/${userId}`)} // Điều hướng tới "/studymaterials"
        />
        <SquareBox
          images={[images.exercises]}
          title="📝 English Exercises"
          content="Practice exercises to reinforce your learning."
          buttonText="Start Practicing"
          onClick={() => navigate("/exercises")} // Điều hướng tới "/studymaterials"
        />
        <SquareBox
          images={[images.studymaterials]}
          title="Study Materials"
          content="A profound source of study materials (include IELTS)"
          buttonText="Learning GO!"
          onClick={() => navigate("/studymaterials")} // Điều hướng tới "/studymaterials"
        />
        <SquareBox
          images={[images.writing]}
          title="Writing Area"
          content="Write your own essays and scores will be appeared!"
          buttonText="Writing GO!"
          onClick={() => navigate("/writingarea")} // Điều hướng tới "/studymaterials"
        />
      </div>
    </div>
  );
};

export default Study;
