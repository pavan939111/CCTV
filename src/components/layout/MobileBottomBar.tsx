"use client";

import { Phone, FileText, ArrowUp } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function MobileBottomBar() {
  const { settings } = useSiteSettings();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-bg-primary border-t border-white/10 shadow-2xl overflow-hidden h-14 select-none">
      <div className="grid grid-cols-6 h-full items-stretch">
        
        {/* Call Now (Spans 3 Columns, Accent Blue) */}
        <a
          href={`tel:${settings.phone}`}
          className="col-span-3 bg-accent text-white flex items-center justify-center gap-3 transition-colors duration-300 hover:bg-accent-glow active:scale-[0.98]"
        >
          <Phone className="h-5 w-5 shrink-0" />
          <div className="text-left font-heading">
            <span className="block text-xs font-black leading-none uppercase">Call Now</span>
            <span className="text-[9px] text-white/70 font-normal mt-0.5 block leading-none">Tap to call</span>
          </div>
        </a>

        {/* Get Quote (Spans 2 Columns, Dark Blue/Gray) */}
        <a
          href="#contact"
          className="col-span-2 bg-[#0B1220]/90 text-white flex items-center justify-center gap-2 border-r border-white/10 transition-colors duration-300 hover:bg-[#0f192b] active:scale-[0.98]"
        >
          <FileText className="h-5 w-5 shrink-0 text-accent" />
          <div className="text-left font-heading">
            <span className="block text-xs font-black leading-none uppercase">Get Quote</span>
            <span className="text-[9px] text-text-secondary font-normal mt-0.5 block leading-none">Quick inquiry</span>
          </div>
        </a>

        {/* Top (Spans 1 Column, Dark Blue/Gray) */}
        <button
          onClick={handleScrollTop}
          className="col-span-1 bg-[#0B1220]/90 text-white flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 hover:bg-[#0f192b] active:scale-[0.98]"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4.5 w-4.5 text-[#94A3B8]" />
          <span className="text-[8px] font-black uppercase font-heading text-[#94A3B8] leading-none">Top</span>
        </button>

      </div>
    </div>
  );
}
