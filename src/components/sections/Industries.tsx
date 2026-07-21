"use client";

import Image from "next/image";
import { 
  Home, Building, Briefcase, ShoppingBag, HardDrive, Factory, 
  GraduationCap, PlusSquare, Bed, Utensils, Shield, CreditCard, Castle, Camera 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const industries = [
  { name: "Homes", icon: Home },
  { name: "Apartments", icon: Building },
  { name: "Offices", icon: Briefcase },
  { name: "Retail Shops", icon: ShoppingBag },
  { name: "Warehouses", icon: HardDrive },
  { name: "Factories", icon: Factory },
  { name: "Schools", icon: GraduationCap },
  { name: "Hospitals", icon: PlusSquare },
  { name: "Hotels", icon: Bed },
  { name: "Restaurants", icon: Utensils },
  { name: "Construction Sites", icon: Shield },
  { name: "Banks & ATMs", icon: CreditCard },
  { name: "Govt Buildings", icon: Castle },
];

export default function Industries() {
  const { t } = useLanguage();

  return (
    <section className="w-full py-16 md:py-24 bg-bg-secondary border-b border-border-custom overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ SECTOR PROTECTION ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary">
            {t.industriesHeading}
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            {t.industriesSub}
          </p>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Highlighted CCTV Security Camera monitoring montage */}
          <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[350px] lg:h-[450px] rounded-2xl overflow-hidden border border-border-custom shadow-xl">
            <Image
              src="/images/sectors-we-protect-banner.png"
              alt="CCTV Security Camera monitoring Homes, Offices, and Warehouses"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover hover:scale-102 transition-transform duration-700"
            />
            {/* Floating Camera FOV Indicator */}
            <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md border border-accent/30 pointer-events-none select-none">
              <Camera className="h-3.5 w-3.5" />
              <span>FOV Scan Active</span>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/70 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Column: Grid list of sectors */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {industries.map((ind) => {
                const Icon = ind.icon;
                return (
                  <div
                    key={ind.name}
                    className="glass-card p-3 md:p-4 flex items-center gap-3 bg-bg-card border border-border-custom hover:border-accent/40 hover:bg-bg-secondary transition-all duration-300 group cursor-pointer rounded-xl"
                  >
                    <div className="p-2 rounded-lg bg-bg-primary text-text-secondary group-hover:text-accent group-hover:scale-105 transition-all duration-300">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-text-primary tracking-wide leading-none">
                      {ind.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
