"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import CTAButtons from "./CTAButtons";
import HeroScene from "./HeroScene";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function Hero() {
  const { settings } = useSiteSettings();

  return (
    <section className="relative w-full py-12 lg:py-24 bg-bg-primary overflow-hidden border-b border-white/5 flex items-center select-none">
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 surveillance-grid opacity-60 z-0 pointer-events-none" />

      {/* Cyber Glow Accent */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and actions */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-6">
            
            {/* Small Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 bg-[#0B1220]/60 px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>Smart Security. Total Peace of Mind.</span>
              </div>
            </motion.div>

            {/* Large Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-text-primary uppercase leading-[1.05]">
                Protect What <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-glow">
                  Matters Most.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-text-secondary max-w-[50ch] mx-auto lg:mx-0 leading-relaxed font-sans font-medium">
                Advanced AI-powered CCTV solutions for homes, businesses and industries in {settings.city}. Professional installation, 24×7 monitoring, and complete security you can trust.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <CTAButtons />
            </motion.div>

            {/* Small Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 pt-6 border-t border-white/5 text-[10px] sm:text-xs font-bold text-text-secondary font-mono"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>Certified Engineers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>Genuine Products</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>Warranty Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>24×7 Support</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Composite Hero Scene graphic */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <HeroScene />
          </div>

        </div>
      </div>
    </section>
  );
}
