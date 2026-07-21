"use client";

import { 
  Home, Building, Briefcase, ShoppingBag, HardDrive, Factory, 
  GraduationCap, PlusSquare, Bed, Utensils, Shield, CreditCard, Castle 
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
    <section className="w-full py-20 bg-bg-secondary border-b border-border-custom overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ SECTOR PROTECTION ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary">
            {t.industriesHeading}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            {t.industriesSub}
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="glass-card p-4 flex flex-col items-center justify-center text-center space-y-3 bg-bg-card border border-border-custom hover:border-accent/40 hover:bg-bg-secondary transition-all duration-300 group cursor-pointer rounded-2xl"
              >
                <div className="p-2.5 rounded-xl bg-bg-primary text-text-secondary group-hover:text-accent group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="text-sm font-bold text-text-primary tracking-wide">
                  {ind.name}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
