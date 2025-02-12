import { Html, useProgress } from "@react-three/drei";
import React from "react"; // Import React is necessary for React.createElement

const CanvasLoader = () => {
  const { progress } = useProgress();
  return React.createElement(
    Html,
    {
      as: "div",
      center: true,
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      },
    },
    React.createElement("span", { className: "canvas-loader" }),
    React.createElement(
      "p",
      {
        style: {
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        },
      },
      `${progress.toFixed(2)}%` // Chú ý cách nội suy chuỗi trong JS
    )
  );
};

export default CanvasLoader;
