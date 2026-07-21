"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield, Users, Zap, Award, AwardIcon } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function TrustBar() {
  const { settings } = useSiteSettings();

  const trustItems = [
    { label: `${settings.installationsCount}+`, sub: "Successful Installs", icon: CheckCircle2 },
    { label: "10+", sub: "Years of Experience", icon: Shield },
    { label: "50+", sub: "Certified Engineers", icon: Users },
    { label: "Same Day", sub: "Service Available", icon: Zap },
    { label: "5 Year", sub: "Hardware Warranty", icon: Award },
    { label: "24×7", sub: "Support Available", icon: AwardIcon },
  ];

  return (
    <section className="w-full pb-12 pt-2 bg-bg-primary overflow-hidden select-none relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-5 lg:gap-0 items-center rounded-2xl border border-border-custom bg-bg-card px-3 py-5 shadow-custom divide-y md:divide-y-0 md:divide-x divide-border-custom"
        >
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center justify-center text-left p-3 gap-3 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="h-10 w-10 shrink-0 flex items-center justify-center text-accent">
                  <Icon className="h-7 w-7 stroke-[1.7]" />
                </div>
                <div className="space-y-1">
                  <span className="block text-xl font-black text-text-primary tracking-tight font-heading leading-none">
                    {item.label}
                  </span>
                  <span className="block text-[9px] text-text-secondary font-semibold leading-tight mt-1 max-w-[18ch]">
                    {item.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
