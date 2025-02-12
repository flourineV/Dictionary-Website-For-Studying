import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MAX_VISIBILITY = 3;

export const Card = ({ title, content }) => (
  <div className="w-full h-full p-8 bg-[#191229] rounded-lg shadow-lg flex flex-col justify-center items-center">
    <h2 className="text-2xl  text-white font-bold text-center mb-4">{title}</h2>
    <p className="text-gray-300 text-justify">{content}</p>
  </div>
);

export const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <div className="relative w-96 h-96 perspective-500 transform-style-preserve-3d">
      {active > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 text-white text-5xl z-20 cursor-pointer bg-transparent border-none"
          onClick={() => setActive((i) => i - 1)}
        >
          <FontAwesomeIcon icon={faChevronCircleLeft} />
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="absolute w-full h-full transition-all duration-300 ease-out"
          style={{
            transform: `
              rotateY(calc(${(active - i) / 3} * 50deg))
              scaleY(calc(1 + ${Math.abs(active - i) / 3} * -0.4))
              translateZ(calc(${Math.abs(active - i) / 3} * -30rem))
              translateX(calc(${Math.sign(active - i)} * -5rem))
            `,
            filter: `blur(calc(${Math.abs(active - i) / 3} * 1rem))`,
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? 0 : 1,
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
            pointerEvents: active === i ? "auto" : "none",
            zIndex: active === i ? 1 : 0,
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button
          className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 text-white text-5xl z-20 cursor-pointer bg-transparent border-none"
          onClick={() => setActive((i) => i + 1)}
        >
          <FontAwesomeIcon icon={faChevronCircleRight} />
        </button>
      )}
    </div>
  );
};
