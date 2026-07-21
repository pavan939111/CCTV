"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type FloatingCardProps = {
  icon: any;
  title: string;
  subtitle: string;
  className?: string;
  delay?: number;
};

export default function FloatingCard({ icon: Icon, title, subtitle, className = "", delay = 0 }: FloatingCardProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -6, 0] 
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.2
        }
      }}
      className={`absolute flex items-start gap-2.5 border rounded-xl px-3.5 py-2.5 shadow-lg backdrop-blur-md select-none group transition-all duration-500 z-20 ${
        isLightMode 
          ? "bg-white/95 border-black/10 text-black shadow-black/5 hover:border-accent"
          : "bg-[#0B1220]/90 border-white/10 text-white shadow-black/40 hover:border-accent/40"
      } ${className}`}
    >
      {/* HUD status pulse */}
      <div className={`p-1 rounded shrink-0 mt-0.5 border ${
        isLightMode 
          ? "bg-accent/5 border-accent/20 text-accent" 
          : "bg-accent/10 border-accent/20 text-accent-glow"
      }`}>
        <span className={`h-1.5 w-1.5 rounded-full block animate-pulse ${
          isLightMode ? "bg-accent" : "bg-accent-glow"
        }`} />
      </div>

      <div className="text-left font-sans">
        <span className={`block text-[10px] font-black leading-none uppercase font-heading transition-colors duration-300 ${
          isLightMode ? "text-black group-hover:text-accent" : "text-white group-hover:text-accent-glow"
        }`}>
          {title}
        </span>
        <span className={`text-[8px] font-bold mt-1 block leading-none font-mono uppercase tracking-wider ${
          isLightMode ? "text-slate-500" : "text-[#94A3B8]"
        }`}>
          {subtitle}
        </span>
      </div>
    </motion.div>
  );
}
