"use client";

import { motion } from "framer-motion";
import { 
  FileText, MapPin, ClipboardList, Receipt, 
  Wrench, CheckCircle2, ShieldAlert, HeartHandshake 
} from "lucide-react";

type Step = {
  num: number;
  title: string;
  desc: string;
  icon: any;
};

const steps: Step[] = [
  { num: 1, title: "Free Consultation", desc: "We discuss your surveillance needs and evaluate the scope over phone or message.", icon: ClipboardList },
  { num: 2, title: "Site Visit", desc: "Our engineers inspect the physical premises to analyze angles, lighting, and cable paths.", icon: MapPin },
  { num: 3, title: "Requirement Analysis", desc: "We finalize focal lengths, resolution needs, storage budgets, and hardware types.", icon: ShieldAlert },
  { num: 4, title: "Detailed Quotation", desc: "You receive a standard, itemized quote containing transparent hardware and labor costs.", icon: Receipt },
  { num: 5, title: "Professional Installation", desc: "Our technicians run high-grade cables, mount cameras, and position Recorders cleanly.", icon: Wrench },
  { num: 6, title: "Testing & Alignment", desc: "We configure remote logins, fine-tune angles, adjust motion sensitivity, and check feeds.", icon: CheckCircle2 },
  { num: 7, title: "Client Training", desc: "We teach you how to review recording history, monitor live video feeds on mobile, and fetch clips.", icon: FileText },
  { num: 8, title: "Best After-Sales Support", desc: "Receive immediate phone support, firmware updates, and physical site AMC audits.", icon: HeartHandshake },
];

export default function Timeline() {
  return (
    <section className="w-full py-20 bg-bg-secondary overflow-hidden border-y border-border-custom/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-primary">
            Our Installation <span className="text-accent">Process</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            From the initial inspection to lifelong technical support, we ensure a seamless and professional setup.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central timeline line */}
          <div className="absolute left-[30px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-border-custom/50" />

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
                  {/* Glowing step indicator circle */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1.5 flex items-center justify-center h-16 w-16 rounded-full bg-bg-primary border-2 border-accent shadow-[0_0_15px_rgba(46,124,246,0.3)] z-10 transition-all duration-300 hover:scale-110">
                    <span className="text-lg font-black text-text-primary font-heading">
                      {step.num}
                    </span>
                  </div>

                  {/* Spacer / Content block wrapper */}
                  <div className="w-full md:w-1/2 pl-24 md:pl-0 pr-0 md:pr-12 md:text-right text-left flex justify-start md:justify-end">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                      className={`glass-card p-6 bg-bg-primary/50 max-w-[420px] hover:border-accent/30 transition-all duration-300 w-full relative ${
                        isEven ? "md:text-left" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3 border-b border-border-custom/40 pb-3">
                        <div className="p-2.5 rounded-lg bg-bg-secondary text-accent border border-border-custom shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-wide">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer column for aligning alternate content on desktop */}
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
