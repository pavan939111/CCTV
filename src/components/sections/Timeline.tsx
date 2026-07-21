"use client";

import { motion } from "framer-motion";
import { 
  FileText, MapPin, ClipboardList, Receipt, 
  Wrench, CheckCircle2, ShieldAlert, HeartHandshake 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Timeline() {
  const { t } = useLanguage();

  const steps = [
    { num: 1, title: t.step1Title, desc: t.step1Desc, icon: ClipboardList },
    { num: 2, title: t.step2Title, desc: t.step2Desc, icon: MapPin },
    { num: 3, title: t.step3Title, desc: t.step3Desc, icon: ShieldAlert },
    { num: 4, title: t.step4Title, desc: t.step4Desc, icon: Receipt },
    { num: 5, title: t.step5Title, desc: t.step5Desc, icon: Wrench },
    { num: 6, title: t.step6Title, desc: t.step6Desc, icon: CheckCircle2 },
    { num: 7, title: t.step7Title, desc: t.step7Desc, icon: FileText },
    { num: 8, title: t.step8Title, desc: t.step8Desc, icon: HeartHandshake },
  ];

  return (
    <section className="w-full py-20 bg-bg-secondary overflow-hidden border-y border-border-custom">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-20">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ STEP-BY-STEP WORKFLOW ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary tracking-tight">
            {t.timelineHeading}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            {t.timelineSub}
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central timeline line */}
          <div className="absolute left-[30px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-border-custom" />

          {/* Timeline items */}
          <div className="space-y-16">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={step.num}
                  className={`flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  } relative`}
                >
                  {/* Step indicator circle */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1.5 flex items-center justify-center h-16 w-16 rounded-full bg-bg-primary border-2 border-accent shadow-[0_0_15px_rgba(46,124,246,0.3)] z-10 transition-all duration-300 hover:scale-110">
                    <span className="text-lg font-black text-text-primary font-heading">
                      {step.num}
                    </span>
                  </div>

                  <div className="w-full md:w-1/2 pl-24 md:pl-0 pr-0 md:pr-12 md:text-right text-left flex justify-start md:justify-end">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                      className={`glass-card p-6 bg-bg-card max-w-[420px] hover:border-accent/40 transition-all duration-300 w-full relative ${
                        isEven ? "md:text-left" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3 border-b border-border-custom pb-3">
                        <div className="p-2.5 rounded-lg bg-bg-secondary text-accent border border-border-custom shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-text-primary font-heading tracking-wide">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  <div className="hidden md:block w-1/2 pl-12" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
