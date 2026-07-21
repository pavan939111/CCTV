"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Home, Building2, Building, ShoppingBag, Box, Activity, GraduationCap, Factory } from "lucide-react";

type ServiceCard = {
  title: string;
  sub: string;
  image: string;
  icon: any;
};

const servicesData: ServiceCard[] = [
  {
    title: "Home Security",
    sub: "Solutions",
    image: "/images/hero-globe-villa.png",
    icon: Home,
  },
  {
    title: "Office Security",
    sub: "Solutions",
    image: "/images/cctv-lobby.png",
    icon: Building2,
  },
  {
    title: "Apartment",
    sub: "Security",
    image: "/images/dome-camera.png",
    icon: Building,
  },
  {
    title: "Retail Store",
    sub: "Security",
    image: "/images/wifi-camera.png",
    icon: ShoppingBag,
  },
  {
    title: "Warehouse",
    sub: "Security",
    image: "/images/nvr.png",
    icon: Box,
  },
  {
    title: "Hospital",
    sub: "Security",
    image: "/images/ptz-camera.png",
    icon: Activity,
  },
  {
    title: "School & College",
    sub: "Security",
    image: "/images/ip-camera.png",
    icon: GraduationCap,
  },
  {
    title: "Industrial",
    sub: "Security",
    image: "/images/accessories.png",
    icon: Factory,
  },
];

export default function Services() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="services" className="w-full py-20 bg-bg-primary overflow-hidden border-b border-white/5 select-none relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 relative">
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent font-mono">
            ✦ Our Security Solutions ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-text-primary tracking-tight uppercase leading-tight">
            Complete CCTV Solutions <br />
            Under <span className="text-accent">One Roof</span>
          </h2>
          
          {/* Scroll Nav Buttons (Absolute Edges on Desktop) */}
          <div className="absolute right-0 bottom-0 flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="h-10 w-10 rounded-full bg-[#0B1220]/80 border border-white/10 text-[#94A3B8] hover:text-accent hover:border-accent flex items-center justify-center shadow-md active:scale-95 transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollRight}
              className="h-10 w-10 rounded-full bg-[#0B1220]/80 border border-white/10 text-[#94A3B8] hover:text-accent hover:border-accent flex items-center justify-center shadow-md active:scale-95 transition-all duration-300"
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
              <div
                key={idx}
                className="group relative min-w-[280px] sm:min-w-[300px] h-[220px] rounded-2xl overflow-hidden border border-white/10 hover:border-accent/40 transition-all duration-500 bg-[#0B1220]/40 backdrop-blur-sm cursor-pointer snap-start flex flex-col justify-end p-4 shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Bottom Metadata Block */}
                <div className="relative z-10 flex items-center gap-3">
                  {/* Icon badge inside blue circle */}
                  <div className="h-9 w-9 rounded-full bg-accent/25 backdrop-blur-md border border-accent text-accent-glow flex items-center justify-center shrink-0 shadow-lg group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-xs font-black text-white leading-none uppercase font-heading">
                      {service.title}
                    </span>
                    <span className="text-[9px] text-[#94A3B8] font-bold mt-1 block leading-none font-mono uppercase tracking-wider">
                      {service.sub}
                    </span>
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
