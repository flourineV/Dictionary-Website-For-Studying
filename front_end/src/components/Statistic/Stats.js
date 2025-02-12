import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Counter = ({ value }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 1000;
      const increment = Math.ceil(value / (duration / 16));

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-4xl font-bold text-blue-700">
      {count.toLocaleString()}
      {value >= 100 && "+"}
    </div>
  );
};

const Stats = () => {
  const stats = [
    { value: 100, label: "Daily users" },
    { value: 120, label: "Users who has achieved High Results" },
    { value: 150, label: "Study materials" },
    { value: 8, label: "Learning service" },
    { value: 250, label: "Prizing & more" },
  ];

  return (
    <div className="flex justify-around bg-gray-200 text-white p-10">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <Counter value={stat.value} />
          <p className="text-black">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
