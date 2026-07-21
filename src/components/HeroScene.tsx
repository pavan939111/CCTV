"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Brain, Eye, Bell, ShieldAlert, Smartphone, Fingerprint, Lock } from "lucide-react";
import FloatingCard from "./FloatingCard";

export default function HeroScene() {
  return (
    <div className="relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] w-full">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Cyber Dome Villa Container */}
      <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] select-none mt-10">
        
        {/* Layer 5: Smart House inside holographic dome */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 z-10 w-full h-full"
        >
          <Image
            src="/hero/house.png"
            alt="Holographic Dome Villa Security System"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-contain"
          />
        </motion.div>

        {/* Layer 8: Hikvision Security CCTV Camera */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: -3 }}
          animate={{ 
            opacity: 1, 
            y: [0, -4, 0], // Floating loop
            rotate: [0, 1, 0] 
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.3 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -top-16 -right-12 w-[180px] h-[140px] sm:w-[220px] sm:h-[170px] z-30 select-none"
        >
          <Image
            src="/hero/cctv-camera.png"
            alt="Hikvision CCTV Bullet Camera"
            fill
            sizes="(max-width: 768px) 100vw, 220px"
            className="object-contain"
          />
        </motion.div>

        {/* Layer 6: Security Padlock Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-[#050814]/90 border-2 border-accent flex items-center justify-center text-accent shadow-[0_0_25px_rgba(46,124,246,0.6)] z-20 animate-[pulse_2.2s_infinite]"
        >
          <Lock className="h-6 w-6 text-accent-glow" />
        </motion.div>

        {/* Layer 7: Floating Telemetry Cards */}
        
        {/* Card 1: AI Monitoring */}
        <FloatingCard
          icon={Brain}
          title="AI Monitoring"
          subtitle="Smart Analysis"
          className="-top-6 left-6"
          delay={0.6}
        />

        {/* Card 2: 24/7 Monitoring */}
        <FloatingCard
          icon={Eye}
          title="24×7 Surveillance"
          subtitle="Round the Clock"
          className="top-1/4 -left-16"
          delay={0.7}
        />

        {/* Card 3: Motion Detection */}
        <FloatingCard
          icon={ShieldAlert}
          title="Motion Detection"
          subtitle="Instant Alerts"
          className="top-12 -right-16"
          delay={0.8}
        />

        {/* Card 4: Face Recognition */}
        <FloatingCard
          icon={Fingerprint}
          title="Face Recognition"
          subtitle="Advanced Security"
          className="bottom-16 -left-12"
          delay={0.9}
        />

        {/* Card 5: Mobile Access */}
        <FloatingCard
          icon={Smartphone}
          title="Mobile Access"
          subtitle="View Anywhere"
          className="top-1/2 -right-16 sm:-right-20"
          delay={1.0}
        />

        {/* Card 6: Instant Alerts */}
        <FloatingCard
          icon={Bell}
          title="Instant Alerts"
          subtitle="Stay Informed"
          className="bottom-12 -right-12"
          delay={1.1}
        />

      </div>
    </div>
  );
}
