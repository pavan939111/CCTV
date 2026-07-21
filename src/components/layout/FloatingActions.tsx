"use client";

import { useState, useEffect } from "react";
import { ArrowUp, MessageSquare } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { settings } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    "Hello Nakshatra CCTV Services. I would like to know more about your CCTV installation services."
  )}`;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-6 z-40 flex flex-col gap-4 items-end pointer-events-none">
      {/* Scroll-to-top button */}
      <button
        onClick={scrollToTop}
        className={`p-3 rounded-full bg-bg-card backdrop-blur-md border border-border-custom text-text-primary shadow-custom hover:bg-bg-secondary hover:text-accent transition-all duration-500 pointer-events-auto active:scale-90 ${
          showScrollTop
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Floating WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-custom hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto group animate-[pulse_2s_infinite]"
        style={{
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        }}
        aria-label="Chat on WhatsApp"
      >
        {/* Red Notification Badge */}
        <span className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-red-600 text-white border-2 border-bg-primary flex items-center justify-center text-[10px] font-black font-mono shadow-md z-10 animate-bounce">
          1
        </span>
        {/* Glow pulsing ring around the button */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75" />
        <MessageSquare className="h-7 w-7" />
      </a>
    </div>
  );
}
