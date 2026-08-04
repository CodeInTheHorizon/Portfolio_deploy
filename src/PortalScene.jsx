import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";

function PortalGeometry() {
  const ring = useRef();
  const inner = useRef();
  useFrame((state, delta) => {
    ring.current.rotation.z += delta * 0.24;
    inner.current.rotation.z -= delta * 0.48;
    ring.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });
  return (
    <>
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
        <group ref={ring}>
          <mesh>
            <torusGeometry args={[2.05, 0.1, 16, 128]} />
            <meshStandardMaterial
              color="#ff6028"
              emissive="#ff3d15"
              emissiveIntensity={4}
              roughness={0.25}
            />
          </mesh>
          {Array.from({ length: 16 }, (_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i * Math.PI) / 8) * 2.35,
                Math.sin((i * Math.PI) / 8) * 2.35,
                0,
              ]}
              rotation={[0, 0, (i * Math.PI) / 8]}
            >
              <boxGeometry args={[0.12, 0.04, 0.03]} />
              <meshBasicMaterial color="#ffd45a" />
            </mesh>
          ))}
        </group>
      </Float>
      <group ref={inner}>
        <mesh>
          <torusGeometry args={[1.65, 0.025, 8, 100]} />
          <meshBasicMaterial color="#ffd369" transparent opacity={0.8} />
        </mesh>
      </group>
    </>
  );
}

export default function PortalScene({ light }) {
  return (
    <Canvas
      className="portal-canvas"
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={[light ? "#f6f0e9" : "#07050e"]} />
      <fog attach="fog" args={[light ? "#f6f0e9" : "#07050e", 7, 15]} />
      <ambientLight intensity={light ? 1.2 : 0.35} />
      <pointLight
        color={light ? "#e8a739" : "#ff6a2b"}
        intensity={15}
        distance={10}
      />
      <Stars
        radius={12}
        depth={20}
        count={600}
        factor={2}
        saturation={0}
        fade
        speed={0.35}
      />
      <Sparkles
        count={100}
        scale={7}
        size={3}
        speed={0.45}
        color={light ? "#d89124" : "#ff7a31"}
      />
      <PortalGeometry />
    </Canvas>
  );
}
