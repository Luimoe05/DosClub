"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

const NODES = 11; // per strand
const STEP = 0.58; // radians between nodes
const RADIUS = 1.15;
const HEIGHT = 4.2;

type Palette = { bone: string; node: string; accent: string };

const LIGHT: Palette = { bone: "#7c7c86", node: "#5f5f68", accent: "#b23b6a" };
const DARK: Palette = { bone: "#9090a0", node: "#c8c8d0", accent: "#dd7ba6" };

function useHelix() {
  return useMemo(() => {
    const a: THREE.Vector3[] = [];
    const b: THREE.Vector3[] = [];
    for (let i = 0; i < NODES; i++) {
      const t = i * STEP;
      const y = (i / (NODES - 1) - 0.5) * HEIGHT;
      a.push(new THREE.Vector3(Math.cos(t) * RADIUS, y, Math.sin(t) * RADIUS));
      b.push(
        new THREE.Vector3(
          Math.cos(t + Math.PI) * RADIUS,
          y,
          Math.sin(t + Math.PI) * RADIUS,
        ),
      );
    }
    const rungs: THREE.Vector3[] = [];
    for (let i = 0; i < NODES; i++) rungs.push(a[i], b[i]);
    return { a, b, rungs };
  }, []);
}

function Helix({ palette }: { palette: Palette }) {
  const spin = useRef<THREE.Group>(null);
  const { a, b, rungs } = useHelix();

  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.28;
  });

  const accentIndices = new Set([2, 6, 9]);

  return (
    <group ref={spin}>
      <Line points={a} color={palette.bone} lineWidth={1.8} />
      <Line points={b} color={palette.bone} lineWidth={1.8} />
      <Line
        points={rungs}
        segments
        color={palette.bone}
        lineWidth={1}
        transparent
        opacity={0.45}
      />
      {[...a, ...b].map((p, i) => {
        const isAccent = accentIndices.has(i % NODES);
        return (
          <mesh key={i} position={p}>
            <sphereGeometry args={[isAccent ? 0.16 : 0.11, 24, 24]} />
            <meshStandardMaterial
              color={isAccent ? palette.accent : palette.node}
              roughness={0.35}
              metalness={0.1}
              emissive={isAccent ? palette.accent : "#000000"}
              emissiveIntensity={isAccent ? 0.3 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function HeroScene({
  interactive = true,
  dark = false,
}: {
  interactive?: boolean;
  dark?: boolean;
}) {
  const palette = dark ? DARK : LIGHT;
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight
        position={[-4, -2, -3]}
        intensity={0.4}
        color={palette.accent}
      />
      <PresentationControls
        enabled={interactive}
        global
        snap
        speed={1.2}
        polar={[-0.4, 0.4]}
        azimuth={[-0.7, 0.7]}
      >
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
          <Helix palette={palette} />
        </Float>
      </PresentationControls>
    </Canvas>
  );
}
