"use client";

import { motion } from "framer-motion";

type FloatingCardProps = {
  icon: any;
  title: string;
  subtitle: string;
  className?: string;
  delay?: number;
};

export default function FloatingCard({ icon: Icon, title, subtitle, className = "", delay = 0 }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -6, 0] // Floating bounce loop
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
      className={`absolute flex items-start gap-2 bg-[#0B1220]/80 border border-white/10 rounded-xl px-3 py-2 shadow-lg backdrop-blur-md select-none group hover:border-accent/40 hover:scale-102 transition-colors duration-300 z-20 ${className}`}
    >
      {/* HUD status pulse */}
      <div className="p-1 rounded bg-accent/10 border border-accent/20 text-accent-glow shrink-0 mt-0.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-glow block animate-pulse" />
      </div>

      <div className="text-left font-sans">
        <span className="block text-[10px] font-black text-white leading-none uppercase font-heading group-hover:text-accent transition-colors duration-300">
          {title}
        </span>
        <span className="text-[8px] text-[#94A3B8] font-bold mt-1 block leading-none font-mono uppercase tracking-wider">
          {subtitle}
        </span>
      </div>
    </motion.div>
  );
}
