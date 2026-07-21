"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CctvModel() {
  const groupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    if (groupRef.current) {
      // Slow rotation: 0.15 rad/s
      groupRef.current.rotation.y = elapsed * 0.15;
      // Slight vertical nodding wobble
      groupRef.current.rotation.x = Math.sin(elapsed * 0.5) * 0.05 - 0.2; // slight tilt down
    }

    if (beamRef.current) {
      // Pulsing scanning beam width
      const pulse = 1 + Math.sin(elapsed * 4) * 0.05;
      beamRef.current.scale.set(pulse, 1, pulse);

      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        // Pulse opacity slightly
        mat.opacity = 0.08 + Math.sin(elapsed * 4) * 0.03;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {/* Ceiling Mount Ring */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.2, 32]} />
        <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Main Dome Upper Base */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.4, 32]} />
        <meshStandardMaterial color="#0F172A" roughness={0.4} metalness={0.9} />
      </mesh>

      {/* Inner Rotating Sphere (CCTV Head) */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial color="#1E293B" roughness={0.1} metalness={0.85} />
      </mesh>

      {/* Lens Port / Bezel */}
      <mesh position={[0, 0.15, 0.75]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.15, 32]} />
        <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Camera Lens Core (Cyan Glow) */}
      <mesh position={[0, 0.15, 0.83]} rotation={[0.4, 0, 0]}>
        <sphereGeometry args={[0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#00A8FF" />
      </mesh>

      {/* Outer Smoked Glass Protective Dome */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[1.35, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
        <meshPhysicalMaterial
          color="#0B1D3A"
          transparent
          opacity={0.35}
          roughness={0.05}
          metalness={0.1}
          transmission={0.8}
          thickness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Scanning Laser Beam (pointing down/forward) */}
      <mesh ref={beamRef} position={[0, -1.8, 1.5]} rotation={[0.6, 0, 0]}>
        <coneGeometry args={[1.8, 5.0, 32, 1, true]} />
        <meshBasicMaterial
          color="#2E7CF6"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
