import React from "react";
import images from "../../assets/images";

const DictionaryIntro = () => {
  const introductionText = `
    Are you looking for more than just a dictionary? TheFlourine Dictionary is designed to be your all-in-one English learning tool, providing everything you need to expand your vocabulary, improve your writing skills, and master English effectively. Whether you’re a beginner or an advanced learner, our platform offers the perfect resources to support your journey.
  `;
  return (
    <div className="bg-gray-100">
      <div className="w-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:mt-20 ml-16 mr-16">
            {" "}
            {/* Removed -ml-10 */}
            <h1 className="text-4xl font-bold mb-4">
              Welcome to TheFlourine Dictionary 🚀
            </h1>
            <h2 className="text-2xl font-light mb-4">
              Your ultimate English Learning Companion!
            </h2>
            <p className="text-lg font-light leading-relaxed text-justify mt-10">
              {introductionText}
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-end relative">
            <img
              src={images.logormbg}
              alt="Hình ảnh từ điển"
              className="w-56 h-56 absolute left-10 top-3 -rotate-12 animate-float"
              style={{ transformOrigin: "bottom right" }}
            />
            <img
              src={images.introstudy}
              alt="Hình ảnh từ điển"
              className="max-w-full h-auto inline-block" // Added inline-block
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DictionaryIntro;
