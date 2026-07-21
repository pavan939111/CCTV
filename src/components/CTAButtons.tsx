"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function CTAButtons() {
  const { settings } = useSiteSettings();

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    "Hello Nakshatra CCTV Services. I would like to know more about your CCTV installation services."
  )}`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full">
      {/* Primary Action Button */}
      <a
        href="#contact"
        className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-lg bg-accent text-white font-bold tracking-wide shadow-custom hover:bg-accent-glow hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase text-xs font-heading"
      >
        <span>Get Free Site Visit</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
      </a>

      {/* Secondary Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-lg border border-white/10 hover:border-accent/40 bg-bg-card hover:bg-bg-secondary text-text-primary font-bold tracking-wide transition-all duration-300 active:scale-95 hover:scale-[1.02] uppercase text-xs font-heading"
      >
        <MessageCircle className="h-4.5 w-4.5 text-success-whatsapp" style={{ color: "var(--success)" }} />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}
