"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  sub: string;
  image: string;
  icon: LucideIcon;
  description: string;
};

export default function ServiceCard({ title, sub, image, icon: Icon, description }: ServiceCardProps) {
  return (
    <article aria-label={description} className="group relative h-[210px] rounded-xl overflow-hidden border border-border-custom hover:border-accent/50 transition-all duration-300 bg-bg-secondary cursor-pointer shadow-sm flex flex-col justify-end p-3">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 170px, 185px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/25 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10">
        <div className="absolute -top-8 left-0 h-8 w-8 rounded-full bg-accent text-white border-2 border-bg-secondary flex items-center justify-center shadow-lg">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-black leading-none text-white font-heading group-hover:text-accent-glow transition-colors duration-300">{title}</h3>
        <p className="text-[10px] text-white/75 leading-relaxed mt-1.5 line-clamp-1">{sub}</p>
      </div>
    </article>
  );
}
