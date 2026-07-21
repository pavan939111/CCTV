"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle, ShieldCheck, HelpCircle, Lock } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function Hero() {
  const { settings } = useSiteSettings();

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    "Hello Nakshatra CCTV Services. I would like to know more about your CCTV installation services."
  )}`;

  return (
    <section className="relative w-full py-16 lg:py-24 bg-bg-primary overflow-hidden border-b border-white/5 flex items-center">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-6">
            
            {/* Top Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-[#0B1220]/60 px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] shadow-sm select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>Smart Security. Total Peace of Mind.</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading text-text-primary uppercase leading-[1.05]">
                Protect What <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-glow">Matters Most.</span>
              </h1>
              <p className="text-sm sm:text-base text-text-secondary max-w-[50ch] mx-auto lg:mx-0 leading-relaxed font-sans font-medium">
                Advanced AI-powered CCTV solutions for homes, businesses and industries. Professional installation, 24×7 monitoring, and complete security you can trust.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-accent text-white font-bold hover:bg-accent-glow shadow-custom transition-all duration-300 active:scale-95 uppercase text-xs tracking-wider font-heading"
              >
                <span>Get Free Site Visit</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-white/10 hover:border-accent/40 bg-bg-card hover:bg-bg-secondary text-text-primary font-bold transition-all duration-300 active:scale-95 uppercase text-xs tracking-wider font-heading"
              >
                <MessageCircle className="h-4 w-4 text-success-whatsapp" style={{ color: "var(--success)" }} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Bottom checkmarks row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 pt-6 border-t border-white/5 text-[10px] sm:text-xs font-bold text-text-secondary font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>Certified Technicians</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>Genuine Products</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>Warranty Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>24×7 Support</span>
              </div>
            </div>

          </div>

          {/* Right Column: Globe Villa dome camera and hud indicators */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[460px] sm:min-h-[520px] w-full">
            
            {/* Visual background center dome container */}
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] select-none mt-10">
              {/* Globe Villa */}
              <Image
                src="/images/hero-globe-villa.png"
                alt="Glowing Cyber Dome House"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-contain"
              />

              {/* Floating Camera */}
              <div className="absolute -top-16 -right-12 w-[180px] h-[140px] sm:w-[220px] sm:h-[170px] select-none hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/hero-hikvision-camera.png"
                  alt="Hikvision Security Bullet Camera Setup"
                  fill
                  sizes="(max-width: 768px) 100vw, 220px"
                  className="object-contain"
                />
              </div>

              {/* Centered Glowing Padlock Shield Badge at dome base */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-[#050814]/80 border-2 border-accent flex items-center justify-center text-accent shadow-[0_0_20px_rgba(46,124,246,0.5)] z-20 animate-[pulse_2s_infinite]">
                <Lock className="h-6 w-6 text-accent-glow" />
              </div>

              {/* Floating HUD Badges with double text labels */}

              {/* Badge 1: AI Monitoring */}
              <div className="absolute -top-6 left-6 flex items-start gap-2 bg-[#0B1220]/80 border border-white/10 rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm select-none font-sans text-left">
                <div className="p-1 rounded bg-accent/10 border border-accent/20 text-accent-glow shrink-0 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow block animate-pulse" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-white leading-none uppercase font-heading">AI Monitoring</span>
                  <span className="text-[8px] text-[#94A3B8] font-semibold mt-1 block leading-none font-mono">Smart Analysis</span>
                </div>
              </div>

              {/* Badge 2: 24x7 Surveillance */}
              <div className="absolute top-1/4 -left-16 flex items-start gap-2 bg-[#0B1220]/80 border border-white/10 rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm select-none font-sans text-left">
                <div className="p-1 rounded bg-accent/10 border border-accent/20 text-accent-glow shrink-0 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow block animate-pulse" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-white leading-none uppercase font-heading">24×7 Surveillance</span>
                  <span className="text-[8px] text-[#94A3B8] font-semibold mt-1 block leading-none font-mono">Round the Clock</span>
                </div>
              </div>

              {/* Badge 3: Face Recognition */}
              <div className="absolute bottom-16 -left-12 flex items-start gap-2 bg-[#0B1220]/80 border border-white/10 rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm select-none font-sans text-left">
                <div className="p-1 rounded bg-accent/10 border border-accent/20 text-accent-glow shrink-0 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow block animate-pulse" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-white leading-none uppercase font-heading">Face Recognition</span>
                  <span className="text-[8px] text-[#94A3B8] font-semibold mt-1 block leading-none font-mono">Advanced Security</span>
                </div>
              </div>

              {/* Badge 4: Motion Detection */}
              <div className="absolute top-12 -right-16 flex items-start gap-2 bg-[#0B1220]/80 border border-white/10 rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm select-none font-sans text-left z-10">
                <div className="p-1 rounded bg-accent/10 border border-accent/20 text-accent-glow shrink-0 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow block animate-pulse" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-white leading-none uppercase font-heading">Motion Detection</span>
                  <span className="text-[8px] text-[#94A3B8] font-semibold mt-1 block leading-none font-mono">Instant Alerts</span>
                </div>
              </div>

              {/* Badge 5: Mobile Access */}
              <div className="absolute top-1/2 -right-16 sm:-right-20 flex items-start gap-2 bg-[#0B1220]/80 border border-white/10 rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm select-none font-sans text-left">
                <div className="p-1 rounded bg-accent/10 border border-accent/20 text-accent-glow shrink-0 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow block animate-pulse" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-white leading-none uppercase font-heading">Mobile Access</span>
                  <span className="text-[8px] text-[#94A3B8] font-semibold mt-1 block leading-none font-mono">View Anywhere</span>
                </div>
              </div>

              {/* Badge 6: Instant Alerts */}
              <div className="absolute bottom-12 -right-12 flex items-start gap-2 bg-[#0B1220]/80 border border-white/10 rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm select-none font-sans text-left">
                <div className="p-1 rounded bg-accent/10 border border-accent/20 text-accent-glow shrink-0 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow block animate-pulse" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-white leading-none uppercase font-heading">Instant Alerts</span>
                  <span className="text-[8px] text-[#94A3B8] font-semibold mt-1 block leading-none font-mono">Stay Informed</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
