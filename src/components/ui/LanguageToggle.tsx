"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-card hover:bg-bg-secondary border border-border-custom text-text-primary text-xs font-semibold transition-all duration-300 active:scale-95 select-none"
      title="Switch Language / భాషను మార్చండి"
      aria-label="Toggle language between English and Telugu"
    >
      <Globe className="h-3.5 w-3.5 text-accent" />
      <span className="font-heading">
        {language === "en" ? (
          <span>EN · <strong className="text-accent">తెలుగు</strong></span>
        ) : (
          <span>తెలుగు · <strong className="text-accent">EN</strong></span>
        )}
      </span>
    </button>
  );
}
