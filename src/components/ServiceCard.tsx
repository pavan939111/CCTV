"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

type ServiceCardProps = {
  title: string;
  sub: string;
  image: string;
  icon: any;
  description: string;
};

export default function ServiceCard({ title, sub, image, icon: Icon, description }: ServiceCardProps) {
  return (
    <div className="group relative h-[250px] rounded-2xl overflow-hidden border border-white/10 hover:border-accent/40 transition-all duration-500 bg-[#0B1220]/40 backdrop-blur-md cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.15)] flex flex-col justify-between p-5">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Top section: Icon & Sub */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="h-9 w-9 rounded-full bg-accent/25 backdrop-blur-md border border-accent text-accent-glow flex items-center justify-center shadow-lg group-hover:bg-accent group-hover:text-white transition-colors duration-300">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <span className="text-[9px] text-[#94A3B8] font-bold font-mono uppercase tracking-wider">
          {sub}
        </span>
      </div>

      {/* Bottom section: Text & Arrow */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-base font-black tracking-wide leading-none text-white uppercase font-heading group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <p className="text-[10px] text-text-secondary leading-relaxed mt-1.5 max-w-[28ch] line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center shadow-lg group-hover:bg-accent-glow hover:scale-105 transition-all duration-300 shrink-0">
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
