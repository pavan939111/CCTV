"use client";

import { motion } from "framer-motion";
import { 
  Wrench, ShieldCheck, Coins, Zap, HeartHandshake, 
  CheckCircle2, FileText, Settings, Cpu, Users 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseUsSection() {
  const { t } = useLanguage();

  const reasons = [
    { title: t.r1Title, desc: t.r1Desc, icon: Wrench },
    { title: t.r2Title, desc: t.r2Desc, icon: ShieldCheck },
    { title: t.r3Title, desc: t.r3Desc, icon: Coins },
    { title: t.r4Title, desc: t.r4Desc, icon: Zap },
    { title: t.r5Title, desc: t.r5Desc, icon: HeartHandshake },
    { title: t.r6Title, desc: t.r6Desc, icon: CheckCircle2 },
    { title: t.r7Title, desc: t.r7Desc, icon: FileText },
    { title: t.r8Title, desc: t.r8Desc, icon: Settings },
    { title: t.r9Title, desc: t.r9Desc, icon: Cpu },
    { title: t.r10Title, desc: t.r10Desc, icon: Users },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="why-choose" className="w-full py-16 lg:py-24 bg-bg-primary overflow-hidden border-b border-border-custom relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <span className="text-[11px] uppercase font-bold tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ WHY CHOOSE NAKSHATRA ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary tracking-tight">
            {t.whyChooseHeading}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            {t.whyChooseSub}
          </p>
        </div>

        {/* 10 Icon Cards Grid (5x2 on desktop, 2x5 on mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className="glass-card p-5 bg-bg-card hover:bg-bg-secondary/40 border border-border-custom hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-3 rounded-2xl group"
              >
                <div className="p-3.5 rounded-full bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-text-primary font-heading leading-tight group-hover:text-accent transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
