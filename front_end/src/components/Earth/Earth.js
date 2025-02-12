import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf"); // Ensure correct path
  const orbitRef = useRef();

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.update(); // Cập nhật trạng thái quay của OrbitControls
    }
  });

  return (
    <>
      <primitive
        object={earth.scene}
        scale={2.5}
        position-y={0}
        rotation-y={0}
      />
      <OrbitControls
        ref={orbitRef}
        autoRotate
        autoRotateSpeed={1.3} // Tốc độ quay
        enableZoom={false}
        maxPolarAngle={Math.PI / 2} // Giới hạn góc quay dọc
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="always" // Luôn cập nhật khung hình để duy trì quay
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
