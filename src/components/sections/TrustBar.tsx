"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Clock, Award, Tag, Shield, Headphones } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useLanguage } from "@/context/LanguageContext";

export default function TrustBar() {
  const { settings } = useSiteSettings();
  const { t } = useLanguage();

  const trustItems = [
    { label: `${settings.installationsCount}`, sub: t.installationsCountLabel, icon: CheckCircle2 },
    { label: "10+", sub: t.yearsExpLabel, icon: ShieldCheck },
    { label: "50+", sub: t.techniciansCountLabel, icon: Clock },
    { label: "24×7", sub: t.support247, icon: Headphones },
    { label: "Genuine", sub: t.genuineProductsLabel, icon: Award },
    { label: "Best", sub: t.affordablePricingLabel, icon: Tag },
    { label: "Warranty", sub: t.warrantyAvailableLabel, icon: Shield },
  ];

  return (
    <section className="w-full py-8 bg-bg-secondary select-none relative z-10 border-b border-border-custom">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center text-center"
        >
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center justify-center gap-2.5 p-2 bg-bg-card border border-border-custom rounded-xl"
              >
                <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-xs font-bold text-text-primary font-heading">
                    {item.label}
                  </span>
                  <span className="block text-[10px] text-text-secondary font-medium">
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
