"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, Wrench, Coins, Zap, HeartHandshake, MapPin, 
  Eye, FileText, Cpu, CheckCircle2 
} from "lucide-react";

const reasons = [
  { title: "Experienced Engineers", desc: "Certified, background-verified technician teams.", icon: Wrench },
  { title: "Branded Products", desc: "Official dealers of CP Plus, Hikvision, and Dahua.", icon: ShieldCheck },
  { title: "Affordable Prices", desc: "No hidden charges, standard estimates, transparent rates.", icon: Coins },
  { title: "Quick Installation", desc: "Prompt same-day scheduling and swift camera deployments.", icon: Zap },
  { title: "Top After-Sales Support", desc: "Continuous phone, remote login, and site assistance.", icon: HeartHandshake },
  { title: "Local Presence", desc: "Based locally to serve all major residential hubs.", icon: MapPin },
  { title: "Free Site Survey", desc: "Schedule a cost-free physical inspection of your venue.", icon: FileText },
  { title: "Customized Solutions", desc: "Visual coverage plans mapped to your specific perimeter.", icon: Eye },
  { title: "Latest Technology", desc: "Access AI detection, cloud backups, and smart triggers.", icon: Cpu },
  { title: "Warranty Assured", desc: "Up to 2-year manufacturer warranties on all hardware.", icon: CheckCircle2 },
];

export default function WhyChooseUs() {
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
    <section id="why-choose" className="w-full py-20 bg-bg-primary overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-primary">
            Why Choose <span className="text-accent">Nakshatra</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            We prioritize long-term safety and high-fidelity coverage over cheap, generic camera gear.
          </p>
        </div>

        {/* Reasons Grid (5x2 on desktop, 2x5 on mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className="glass-card p-5 bg-bg-secondary/20 hover:bg-bg-secondary/40 border border-border-custom hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-4"
              >
                <div className="p-3 rounded-full bg-bg-secondary border border-border-custom text-accent shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-text-primary leading-snug">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-normal">
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
