import React from "react";
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return React.createElement(
    "group",
    { rotation: [0, 0, Math.PI / 4] },
    React.createElement(
      Points,
      {
        ref: ref,
        positions: sphere,
        stride: 4,
        frustumCulled: true, // Thêm frustumCulled nếu cần
        ...props,
      },
      React.createElement(PointMaterial, {
        transparent: true,
        color: "#f272c8",
        size: 0.005,
        sizeAttenuation: true,
        depthWrite: false,
      })
    )
  );
};

const StarsCanvas = () => {
  return React.createElement(
    "div",
    { className: "w-full h-auto absolute inset-0 z-[1]" },
    React.createElement(
      Canvas,
      { camera: { position: [0, 0, 1] } },
      React.createElement(
        Suspense,
        { fallback: null },
        React.createElement(Stars, null)
      ),
      React.createElement(Preload, { all: true })
    )
  );
};

export default StarsCanvas;
