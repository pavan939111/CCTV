"use client";

import { useRef, MouseEvent } from "react";
import { ShieldCheck, Cpu, Award, BadgeHelp } from "lucide-react";

type BenefitItem = {
  title: string;
  desc: string;
  icon: any;
};

const benefitsList: BenefitItem[] = [
  {
    title: "Certified Installation",
    desc: "Rigorous setups following global surveillance installation frameworks and clean concealment parameters.",
    icon: ShieldCheck,
  },
  {
    title: "HD Night-Vision Setup",
    desc: "Infrared night vision, motion triggers, remote smartphone streaming, and immediate push alarms.",
    icon: Cpu,
  },
  {
    title: "Premium Brands",
    desc: "Authorized partner channels with world leading manufacturers like Hikvision, Dahua and CP Plus.",
    icon: Award,
  },
  {
    title: "24/7 Priority Support",
    desc: "Round-the-clock remote diagnosis to safeguard your active recordings and storage blocks.",
    icon: BadgeHelp,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose" className="w-full py-20 bg-bg-primary overflow-hidden border-b border-white/5 select-none relative z-10">
      {/* Background Radial Glow */}
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ VALUE ARCHITECTURE ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-text-primary tracking-tight uppercase">
            Why Choose <span className="text-accent">Nakshatra</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-[55ch] mx-auto leading-relaxed font-medium">
            We deliver high-fidelity configurations backed by strict quality and warranty benchmarks.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitsList.map((benefit, index) => (
            <WhyChooseCard key={index} benefit={benefit} />
          ))}
        </div>

      </div>
    </section>
  );
}

function WhyChooseCard({ benefit }: { benefit: BenefitItem }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const Icon = benefit.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="glass-card p-6 flex flex-col justify-between group glow-card cursor-pointer hover:border-accent/40 bg-[#0B1220]/20 backdrop-blur-md relative overflow-hidden select-none h-[240px]"
    >
      {/* Corner Bracket Details */}
      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/10 group-hover:border-accent transition-colors duration-300" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/10 group-hover:border-accent transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/10 group-hover:border-accent transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white/10 group-hover:border-accent transition-colors duration-300" />

      {/* Card Body */}
      <div className="space-y-4 relative z-10 flex-1">
        <div className="h-12 w-12 rounded bg-accent/10 border border-accent/25 text-accent-glow flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-md">
          <Icon className="h-6 w-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm sm:text-base font-black text-text-primary tracking-wide leading-tight group-hover:text-accent transition-colors duration-300 font-heading uppercase">
            {benefit.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed font-medium">
            {benefit.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
