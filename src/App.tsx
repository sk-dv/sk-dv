import {
  Center,
  Float,
  OrbitControls,
  Point,
  PointMaterial,
  Points,
  Text3D,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useState } from "react";
import "./input.css";
import github from "./assets/github.png";
import linkedin from "./assets/linkedin.png";

export const App = () => {
  const [points] = useState(() =>
    Array.from({ length: 500 }, (_) => [
      THREE.MathUtils.randFloatSpread(50),
      THREE.MathUtils.randFloatSpread(50),
      THREE.MathUtils.randFloatSpread(50),
    ])
  );

  return (
    <div className="h-full">
      <Canvas style={{ backgroundColor: "black" }}>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} />
          <Points limit={points.length} range={points.length}>
            <PointMaterial
              transparent
              vertexColors
              size={5}
              sizeAttenuation={false}
              depthWrite={false}
            />
            {points.map((position) => (
              <Point
                color="hotpink"
                position={position as [number, number, number]}
              />
            ))}
          </Points>
          <Center>
            <Float floatIntensity={5} speed={2}>
              <Text3D
                font={"/fonts/sf_mono_light.json"}
                bevelEnabled
                curveSegments={200}
                bevelThickness={0.01}
                height={0.1}
                letterSpacing={-0.1}
                size={1}
              >
                skdv
                <meshBasicMaterial color="white" />
              </Text3D>
            </Float>
          </Center>
        </Suspense>
      </Canvas>
      <div className="fixed bottom-0 flex flex-row w-full justify-center my-8">
        <a href="https://github.com/sk-dv" target="_blank">
          <div className="w-14">
            <img src={github} />
          </div>
        </a>
        <p className="mx-4" />
        <a href="https://www.linkedin.com/in/felipeosornio/" target="_blank">
          <div className="w-14">
            <img src={linkedin} />
          </div>
        </a>
      </div>
    </div>
  );
};
