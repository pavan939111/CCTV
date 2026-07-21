"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Brain, Eye, Bell, ShieldAlert, Smartphone, Fingerprint, Lock } from "lucide-react";
import FloatingCard from "./FloatingCard";

export default function HeroScene() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(document.documentElement.classList.contains("light"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Theme-aware asset mapping
  const houseImage = "/hero/house.png";
  const domeImage = "/hero/ai-dome.png";
  const cameraImage = isLightMode ? "/hero/cctv-camera-light.png" : "/hero/cctv-camera.png";

  return (
    <div className="relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] w-full select-none">
      
      {/* Visual background center dome glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full blur-[80px] pointer-events-none transition-colors duration-500 ${
        isLightMode ? "bg-accent/3" : "bg-accent/5"
      }`} />

      {/* Dome Villa Container */}
      <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] mt-10">
        
        {/* Layer 10: SVG Connection Lines (Connectors to central Dome) */}
        <svg className="absolute inset-0 w-full h-full z-15 pointer-events-none">
          {/* Left cards */}
          <line x1="22%" y1="18%" x2="50%" y2="50%" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
          <line x1="18%" y1="38%" x2="50%" y2="50%" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
          <line x1="20%" y1="84%" x2="50%" y2="50%" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
          {/* Right cards */}
          <line x1="80%" y1="28%" x2="50%" y2="50%" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
          <line x1="82%" y1="52%" x2="50%" y2="50%" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
          <line x1="80%" y1="84%" x2="50%" y2="50%" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
        </svg>

        {/* In Light Mode: Render House PNG with multiply blend to make its white background transparent */}
        {isLightMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-12 w-[280px] h-[220px] sm:w-[340px] sm:h-[260px] z-20 flex items-center justify-center mix-blend-multiply"
          >
            <Image
              src={houseImage}
              alt="Transparent Luxury Smart House"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-contain"
            />
          </motion.div>
        )}

        {/* In Dark Mode: Render the Dome Villa Composite with screen blend to make its black background transparent */}
        {!isLightMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-6 w-[310px] h-[280px] sm:w-[370px] sm:h-[330px] z-20 flex items-center justify-center mix-blend-screen"
          >
            <Image
              src={domeImage}
              alt="AI Hologram Security Dome"
              fill
              sizes="(max-width: 768px) 100vw, 370px"
              className="object-contain"
            />
          </motion.div>
        )}

        {/* Layer 7: Floating CCTV Camera */}
        <motion.div
          key={cameraImage}
          initial={{ opacity: 0, y: -20, rotate: -15 }}
          animate={{ 
            opacity: 1, 
            y: [0, -5, 0], 
            rotate: [-15, -13, -15] 
          }}
          transition={{
            opacity: { duration: 0.7, delay: 0.25 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-10 right-4 w-[160px] h-[120px] sm:w-[200px] sm:h-[150px] z-30"
        >
          <Image
            src={cameraImage}
            alt="Hikvision CCTV Bullet/Dome Camera"
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-contain"
          />
        </motion.div>

        {/* Layer 8: Security Shield padlock badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full flex items-center justify-center border-2 shadow-lg z-20 animate-[pulse_2.2s_infinite] transition-all duration-500 ${
            isLightMode 
              ? "bg-white border-accent text-accent shadow-[0_0_15px_rgba(29,95,209,0.3)]" 
              : "bg-[#050814]/90 border-accent text-accent shadow-[0_0_25px_rgba(46,124,246,0.5)]"
          }`}
        >
          <Lock className="h-6 w-6 text-accent-glow" />
        </motion.div>

        {/* Layer 9: Floating Feature Cards */}
        
        {/* Card 1: HD Night Vision */}
        <FloatingCard
          icon={Brain}
          title="HD Night Vision"
          subtitle="Crystal Clear"
          className="top-12 left-4"
          delay={0.5}
        />

        {/* Card 2: 24/7 Monitoring */}
        <FloatingCard
          icon={Eye}
          title="24×7 Surveillance"
          subtitle="Round the Clock"
          className="top-1/3 -left-12 sm:-left-16"
          delay={0.6}
        />

        {/* Card 3: Motion Detection */}
        <FloatingCard
          icon={ShieldAlert}
          title="Motion Detection"
          subtitle="Instant Alerts"
          className="top-[24%] -right-12 sm:-right-16"
          delay={0.7}
        />

        {/* Card 4: Face Recognition */}
        <FloatingCard
          icon={Fingerprint}
          title="Face Recognition"
          subtitle="Advanced Security"
          className="bottom-16 left-4"
          delay={0.8}
        />

        {/* Card 5: Mobile Access */}
        <FloatingCard
          icon={Smartphone}
          title="Mobile Access"
          subtitle="View Anywhere"
          className="top-[48%] -right-16 sm:-right-20"
          delay={0.9}
        />

        {/* Card 6: Instant Alerts */}
        <FloatingCard
          icon={Bell}
          title="Instant Alerts"
          subtitle="Stay Informed"
          className="bottom-16 right-4"
          delay={1.0}
        />

      </div>
    </div>
  );
}
