import React from "react";

import BallCanvas from "./Canvas/Ball.js";
import SectionWrapper from "./Canvas/SectionWrapper.js";

import images from "../../assets/images/index.js";

//define avatar
const technologies = [
  {
    name: "Logo web",
    icon: images.logoblack,
  },
  {
    name: "Logo web",
    icon: images.logoblack,
  },
];

const Avt = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (
        <div className="w-28 h-28" key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Avt, "");
