"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Brands from "@/components/sections/Brands";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import FloatingActions from "@/components/layout/FloatingActions";
import { siteConfig } from "@/config/site.config";
import { ShieldCheck, Award, Users, Wrench } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function AboutPage() {
  const { settings } = useSiteSettings();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-bg-primary pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
              ✦ ABOUT NAKSHATRA CCTV SERVICES ✦
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-text-primary tracking-tight">
              Protecting Homes & Enterprises Across <span className="text-accent">{settings.city}</span>
            </h1>
            <p className="text-base text-text-secondary leading-relaxed">
              Founded with a mission to deliver enterprise-grade security to local homes, retail outlets, and commercial facilities, Nakshatra CCTV Services has completed over {settings.installationsCount} successful installations.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 bg-bg-card border border-border-custom rounded-2xl text-center space-y-2">
              <ShieldCheck className="h-8 w-8 text-accent mx-auto" />
              <h3 className="text-3xl font-black font-heading text-text-primary">{settings.installationsCount}</h3>
              <p className="text-xs text-text-secondary">Installations Completed</p>
            </div>
            <div className="glass-card p-6 bg-bg-card border border-border-custom rounded-2xl text-center space-y-2">
              <Award className="h-8 w-8 text-accent mx-auto" />
              <h3 className="text-3xl font-black font-heading text-text-primary">100%</h3>
              <p className="text-xs text-text-secondary">Genuine Branded Hardware</p>
            </div>
            <div className="glass-card p-6 bg-bg-card border border-border-custom rounded-2xl text-center space-y-2">
              <Users className="h-8 w-8 text-accent mx-auto" />
              <h3 className="text-3xl font-black font-heading text-text-primary">4.9★</h3>
              <p className="text-xs text-text-secondary">Average Client Rating</p>
            </div>
            <div className="glass-card p-6 bg-bg-card border border-border-custom rounded-2xl text-center space-y-2">
              <Wrench className="h-8 w-8 text-accent mx-auto" />
              <h3 className="text-3xl font-black font-heading text-text-primary">24×7</h3>
              <p className="text-xs text-text-secondary">Support SLA</p>
            </div>
          </div>

          {/* Why Choose Section */}
          <WhyChooseUs />

          {/* Brands */}
          <Brands />

        </div>
      </main>
      <Footer />
      <MobileBottomBar />
      <FloatingActions />
    </>
  );
}
