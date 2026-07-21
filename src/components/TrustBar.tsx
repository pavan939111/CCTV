"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Shield, Users, Clock, Award, AwardIcon } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function TrustBar() {
  const { settings } = useSiteSettings();

  const trustItems = [
    { label: `${settings.installationsCount}+`, sub: "Successful Installs", icon: CheckCircle2 },
    { label: "10+", sub: "Years of Experience", icon: Shield },
    { label: "50+", sub: "Certified Engineers", icon: Users },
    { label: "Same Day", sub: "Service Guaranteed", icon: Clock },
    { label: "5 Year", sub: "Hardware Warranty", icon: Award },
    { label: "24×7", sub: "Support Available", icon: AwardIcon },
  ];

  return (
    <section className="w-full py-8 bg-bg-primary overflow-hidden border-b border-white/5 select-none relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center text-center divide-y md:divide-y-0 md:divide-x divide-white/5"
        >
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center p-3 gap-2 hover:scale-[1.02] transition-transform duration-300 first:pt-0 md:first:pt-3 md:first:pl-0"
              >
                <div className="h-8 w-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <span className="block text-lg font-black text-text-primary tracking-tight font-heading leading-none uppercase">
                    {item.label}
                  </span>
                  <span className="block text-[9px] text-text-secondary uppercase font-semibold leading-none tracking-wider font-mono mt-1 max-w-[18ch] mx-auto">
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
