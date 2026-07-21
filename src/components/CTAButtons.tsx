"use client";

import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function CTAButtons() {
  const { settings } = useSiteSettings();

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    "Hello Nakshatra CCTV Services. I would like to book a free site visit for CCTV installation."
  )}`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 w-full">
      {/* Primary Action Button: Book Free Site Visit */}
      <a
        href="#contact"
        className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 h-14 rounded-xl bg-gradient-to-r from-accent via-blue-600 to-accent text-white font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(46,124,246,0.45)] hover:shadow-[0_0_40px_rgba(46,124,246,0.65)] hover:scale-[1.03] active:scale-95 transition-all duration-300 select-none overflow-hidden"
      >
        <CalendarDays className="h-5 w-5 relative z-10" />
        <span className="relative z-10 font-heading">Get Free Site Visit</span>
        <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
        {/* Soft specular sheen overlay */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </a>

      {/* Secondary Action Button: Chat on WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 h-14 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 dark:border-white/10 light:border-black/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-text-primary font-bold text-sm tracking-wide hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.03] active:scale-95 transition-all duration-300 select-none"
      >
        <MessageCircle className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
        <span className="font-heading">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
