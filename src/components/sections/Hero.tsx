"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, Star, Award, Clock } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hello Nakshatra CCTV Services. I would like to schedule a free site visit for CCTV installation in " + siteConfig.city + "."
  )}`;

  return (
    <section className="relative w-full py-16 lg:py-28 bg-bg-primary overflow-hidden border-b border-border-custom flex items-center min-h-[85vh]">
      {/* Full-Bleed Hero Background: Camera Highlighted on Left, Safe Family on Right */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/hero-camera-family-banner.png"
          alt="Nakshatra CCTV Security Camera & Safe Family Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75 dark:opacity-65 filter brightness-[0.98] contrast-[1.05]"
        />
        {/* Soft Legibility Gradient Overlay (subtle in light mode, deep in dark mode) */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bg-primary/40 to-bg-primary/80 dark:via-bg-primary/70 dark:to-bg-primary/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/20 via-transparent to-bg-primary/60 dark:from-bg-primary/40 dark:to-bg-primary/80" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Side (Clear Space to Highlight Camera from Background Image) */}
          <div className="hidden lg:block lg:col-span-5 relative h-full min-h-[300px]">
            {/* Minimalist Floating HUD Badge on Left Camera */}
            <div className="absolute bottom-6 left-4 bg-bg-secondary/90 border border-border-custom backdrop-blur-md px-4 py-2.5 rounded-2xl text-xs font-semibold text-text-primary shadow-xl flex items-center gap-2.5 pointer-events-none">
              <span className="h-2.5 w-2.5 rounded-full bg-accent animate-ping" />
              <span>24/7 Surveillance</span>
            </div>
          </div>

          {/* Right Side Column: All Text Content, Headline, Subtext & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6"
          >
            {/* Top Micro Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-bg-secondary/90 px-4 py-1.5 rounded-full border border-border-custom text-[11px] font-semibold text-text-secondary shadow-md select-none backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span>{t.heroBadge}</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight font-heading text-text-primary leading-[1.1]">
                {t.heroH1Pre}{" "}
                <span className="text-accent">
                  {t.heroH1Accent}
                </span>{" "}
                {t.heroH1Post}
              </h1>
              <p className="text-base sm:text-lg text-text-secondary max-w-[65ch] mx-auto lg:mx-0 leading-relaxed font-sans font-normal backdrop-blur-xs">
                {t.heroSub}
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contact"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 shadow-custom transition-all duration-300 active:scale-95 text-base tracking-wide font-heading"
              >
                <span>{t.getFreeSiteVisit}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-success-whatsapp/40 bg-success-whatsapp/10 hover:bg-success-whatsapp/20 text-success-whatsapp font-semibold transition-all duration-300 active:scale-95 text-base tracking-wide font-heading backdrop-blur-md"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t.chatOnWhatsapp}</span>
              </a>
            </div>

            {/* Micro Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-border-custom text-xs font-medium text-text-secondary backdrop-blur-xs">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Star className="h-4 w-4 text-accent fill-accent shrink-0" />
                <span>{t.ratingsCount}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Award className="h-4 w-4 text-accent shrink-0" />
                <span>{t.certifiedEngineers}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Clock className="h-4 w-4 text-accent shrink-0" />
                <span>{t.sameDayService}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>{t.support247}</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
