"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: `How much does CCTV installation cost in ${siteConfig.city}?`,
    answer: `The cost of CCTV installation in ${siteConfig.city} depends on camera types (analog or IP network), quantities, and layout complexity. A basic 4-camera High-Definition analog system setup starts around ₹12,000–₹15,000 including DVR and wiring. Advanced digital IP camera setups (4K Resolution, POE cabling) start at ₹20,000. Contact us for a precise, itemized quote based on your free site survey.`,
  },
  {
    question: "Which CCTV brand is the best for security?",
    answer: "We recommend CP Plus, Hikvision, and Dahua for residential and standard commercial properties. These brands represent the highest value-for-money, reliability, and app features. For premium high-security perimeters, Honeywell and Axis offer specialized enterprise equipment. We only deal in 100% genuine OEM products carrying official factory warranties.",
  },
  {
    question: "How many cameras do I need for my home or retail shop?",
    answer: "A standard double-story home typically requires 4 cameras: 1 at the main entrance, 1 at the rear exit, and 2 covering side pathways or the parking driveway. For small retail shops, 2 to 3 cameras are usually sufficient: 1 covering the cash counter directly and 2 capturing customer aisles and loading entryways. We design personalized, custom coverage layouts during our site surveys.",
  },
  {
    question: "How long does the physical installation process take?",
    answer: "For standard residential setups (2 to 4 cameras), the installation is typically completed in 3 to 5 hours on a single day. For larger offices or warehouses (8+ cameras, POE network switches, NVR configurations), it can take 1 to 2 days. We ensure clean cabling, robust conduit routing, and zero mess.",
  },
  {
    question: "Do you provide warranties on hardware and installation services?",
    answer: "Yes, absolutely. All CCTV hardware (cameras, recorders, hard drives, power supplies) carries standard manufacturer warranties ranging from 1 to 2 years. In addition, Nakshatra provides a comprehensive 1-year service warranty on all labor, cabling, and structural layouts. If you experience video loss, we resolve it at no service cost.",
  },
  {
    question: "Do you offer Annual Maintenance Contracts (AMC)?",
    answer: "Yes, we provide both Comprehensive and Non-Comprehensive AMCs for homes, offices, schools, and apartments. Our AMC covers periodic visual alignment checks, camera lens cleaning, cabling diagnostics, connector checking, backup recording test checks, and rapid priority support. Regular checkups prevent server crashes or system downtime.",
  },
  {
    question: "Can I monitor my security cameras live on my mobile phone?",
    answer: "Yes. All modern CCTV setups we install support remote cloud monitoring. We configure official mobile apps (like Hik-Connect, gCMOB, DMSS) on your smartphones and tablets, allowing you to stream live video grids, review past recording history, and receive motion alert notifications from anywhere in the world with an active internet connection.",
  },
];

export default function FAQ() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-20 bg-bg-primary overflow-hidden border-b border-border-custom">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ FREQUENTLY ASKED QUESTIONS ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary">
            {t.faqHeading}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            {t.faqSub}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card overflow-hidden transition-all duration-300 bg-bg-card border border-border-custom rounded-xl"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 flex items-center justify-between text-left gap-4 transition-colors hover:bg-bg-secondary/40"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-text-primary tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-text-secondary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-border-custom" : "max-h-0"
                  } overflow-hidden`}
                >
                  <div className="p-5 text-xs sm:text-sm text-text-secondary leading-relaxed bg-bg-primary/40">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
