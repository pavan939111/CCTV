"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import CTAButtons from "./CTAButtons";
import HeroScene from "./HeroScene";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const highlights = [
  { label: "Certified Technicians", icon: BadgeCheck },
  { label: "Genuine Products", icon: ShieldCheck },
  { label: "Warranty Available", icon: ShieldCheck },
  { label: "24/7 Support", icon: Headphones },
];

export default function Hero() {
  const { settings } = useSiteSettings();
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const syncTheme = () => setIsLightMode(document.documentElement.classList.contains("light"));
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_42%,rgba(46,124,246,0.17),transparent_28%),radial-gradient(circle_at_5%_35%,rgba(46,124,246,0.08),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 surveillance-grid opacity-70" />
      <div className="absolute left-1/2 top-4 -z-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto grid min-h-[660px] max-w-7xl grid-cols-1 items-center gap-2 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-12 lg:pt-12">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative z-20 mx-auto max-w-xl py-6 text-center lg:mx-0 lg:py-0 lg:text-left"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-bg-card px-3.5 py-2 text-[10px] font-bold uppercase tracking-wide text-text-primary shadow-sm backdrop-blur-md">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/10 text-accent">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <span><span className="text-accent">Smart security.</span> Total peace of mind.</span>
          </div>

          <h1 className="font-heading text-[2.85rem] font-black leading-[0.99] tracking-[-0.055em] text-text-primary sm:text-6xl lg:text-[4.35rem]">
            {isLightMode ? (
              <>Secure Every Moment.<br /><span className="text-accent">Protect What Matters.</span></>
            ) : (
              <>Protect What<br /><span className="bg-gradient-to-r from-blue-300 via-accent to-blue-500 bg-clip-text text-transparent">Matters Most.</span></>
            )}
          </h1>

          <p className="mx-auto mt-7 max-w-[48ch] text-base font-medium leading-7 text-text-secondary lg:mx-0">
            Advanced <span className="font-semibold text-accent">AI-powered</span> CCTV solutions for homes, businesses and industries. Professional installation, <span className="font-semibold text-accent">24/7 monitoring</span>, and complete security you can trust in {settings.city}.
          </p>

          <div className="mt-8">
            <CTAButtons />
          </div>

          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border-custom pt-6 sm:grid-cols-4 lg:flex lg:items-center lg:gap-5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2 text-left text-[10px] font-semibold leading-tight text-text-primary">
                  <Icon className="h-4 w-4 shrink-0 text-accent" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="relative z-10 order-first lg:order-none"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 bg-accent/5 blur-[1px]" />
          <HeroScene />
          <div className="pointer-events-none absolute right-[16%] top-[11%] hidden items-center gap-2 rounded-xl border border-accent/25 bg-bg-primary/75 px-3 py-2 text-xs font-bold text-text-primary shadow-xl backdrop-blur-md sm:flex">
            <Sparkles className="h-4 w-4 text-accent" />
            AI Monitoring
          </div>
        </motion.div>
      </div>
    </section>
  );
}
