"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Home, Building2, Building, ShoppingBag, Box, Activity, GraduationCap, Factory } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const servicesData = [
    { title: t.srvHome, sub: "Solutions", image: "/images/hero-globe-villa.png", icon: Home, link: "/cctv-installation" },
    { title: t.srvOffice, sub: "Solutions", image: "/images/cctv-lobby.png", icon: Building2, link: "/cctv-installation" },
    { title: t.srvApartment, sub: "Security", image: "/images/dome-camera.png", icon: Building, link: "/cctv-installation" },
    { title: t.srvRetail, sub: "Security", image: "/images/wifi-camera.png", icon: ShoppingBag, link: "/wireless-cctv-installation" },
    { title: t.srvWarehouse, sub: "Security", image: "/images/nvr.png", icon: Box, link: "/ip-camera-installation" },
    { title: t.srvHospital, sub: "Security", image: "/images/ptz-camera.png", icon: Activity, link: "/cctv-installation" },
    { title: t.srvSchool, sub: "Security", image: "/images/ip-camera.png", icon: GraduationCap, link: "/cctv-installation" },
    { title: t.srvFactory, sub: "Security", image: "/images/accessories.png", icon: Factory, link: "/ip-camera-installation" },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="w-full py-20 bg-bg-primary overflow-hidden border-b border-border-custom select-none relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 relative">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ SECURITY SOLUTIONS ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary tracking-tight leading-tight">
            {t.servicesHeading}
          </h2>
          <p className="text-sm text-text-secondary max-w-[60ch] mx-auto">
            {t.servicesSub}
          </p>

          <div className="hidden sm:flex absolute right-0 bottom-0 items-center gap-2">
            <button
              onClick={scrollLeft}
              className="h-10 w-10 rounded-full bg-bg-card border border-border-custom text-text-secondary hover:text-accent hover:border-accent flex items-center justify-center shadow-md active:scale-95 transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollRight}
              className="h-10 w-10 rounded-full bg-bg-card border border-border-custom text-text-secondary hover:text-accent hover:border-accent flex items-center justify-center shadow-md active:scale-95 transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Services Horizontal Scroll Wrapper */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {servicesData.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Link
                key={idx}
                href={service.link}
                className="group relative min-w-[280px] sm:min-w-[300px] h-[220px] rounded-2xl overflow-hidden border border-border-custom hover:border-accent/40 transition-all duration-500 bg-bg-card cursor-pointer snap-start flex flex-col justify-end p-5 shadow-custom"
              >
                <div className="absolute inset-0 w-full h-full z-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent pointer-events-none" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-accent/25 backdrop-blur-md border border-accent text-accent-glow flex items-center justify-center shrink-0 shadow-lg group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-text-primary leading-none font-heading">
                        {service.title}
                      </span>
                      <span className="text-[10px] text-text-secondary font-medium mt-1 block leading-none">
                        {service.sub}
                      </span>
                    </div>
                  </div>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
