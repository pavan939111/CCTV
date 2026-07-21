"use client";

import { Phone, FileText, ArrowUp } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileBottomBar() {
  const { settings } = useSiteSettings();
  const { t } = useLanguage();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-bg-primary border-t border-border-custom shadow-2xl overflow-hidden h-14 select-none">
      <div className="grid grid-cols-6 h-full items-stretch">
        
        {/* Call Now */}
        <a
          href={`tel:${settings.phone}`}
          className="col-span-3 bg-accent text-white flex items-center justify-center gap-2.5 transition-colors duration-300 hover:bg-accent/90 active:scale-[0.98]"
        >
          <Phone className="h-4.5 w-4.5 shrink-0" />
          <div className="text-left font-heading">
            <span className="block text-xs font-bold leading-none uppercase">{t.callNowBar}</span>
            <span className="text-[9px] text-white/80 font-medium mt-0.5 block leading-none">{settings.phone}</span>
          </div>
        </a>

        {/* Get Quote */}
        <a
          href="#contact"
          className="col-span-2 bg-bg-secondary text-text-primary flex items-center justify-center gap-1.5 border-r border-border-custom transition-colors duration-300 active:scale-[0.98]"
        >
          <FileText className="h-4 w-4 shrink-0 text-accent" />
          <div className="text-left font-heading">
            <span className="block text-xs font-bold leading-none uppercase">{t.getQuoteBar}</span>
          </div>
        </a>

        {/* Scroll Top */}
        <button
          onClick={handleScrollTop}
          className="col-span-1 bg-bg-secondary text-text-secondary flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 active:scale-[0.98]"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4 text-accent" />
          <span className="text-[8px] font-bold uppercase font-heading leading-none">Top</span>
        </button>

      </div>
    </div>
  );
}
