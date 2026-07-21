"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import Image from "next/image";
import CctvModel from "./CctvModel";

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [useFallback, setUseFallback] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect if we should use fallback (mobile, low-power, or reduced motion)
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Set fallback if mobile or reduced motion is preferred
    setUseFallback(isMobile || prefersReducedMotion);

    // Detect initial theme
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light"));
    };

    checkTheme();

    // Set up a MutationObserver to listen for class changes on <html>
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return <FallbackPoster isLightMode={false} />;
  }

  if (useFallback) {
    return <FallbackPoster isLightMode={isLightMode} />;
  }

  return (
    <div className="w-full h-[350px] sm:h-[450px] lg:h-[550px] relative select-none">
      <Suspense fallback={<FallbackPoster isLightMode={isLightMode} />}>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          {/* Subtle ambient light */}
          <ambientLight intensity={isLightMode ? 0.6 : 0.2} />

          {/* Key light simulating light from top-left */}
          <directionalLight
            position={[-5, 5, 5]}
            intensity={isLightMode ? 1.2 : 0.8}
            color={isLightMode ? "#ffffff" : "#d8e2ff"}
          />

          {/* Electric blue rim light behind the model */}
          <pointLight
            position={[2, -2, -2]}
            intensity={isLightMode ? 1.5 : 3.0}
            color="#2E7CF6"
          />

          {/* 3D CCTV Model */}
          <CctvModel />

          {/* Restrict camera controls so user can only drag/rotate slightly */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

function FallbackPoster({ isLightMode }: { isLightMode: boolean }) {
  return (
    <div className="w-full h-[350px] sm:h-[450px] lg:h-[550px] relative rounded-2xl overflow-hidden shadow-custom">
      <Image
        src={isLightMode ? "/images/hero-poster-light.png" : "/images/hero-poster-dark.png"}
        alt="Nakshatra CCTV Premium Camera Surveillance System"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      {/* Laser light overlay simulation */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
