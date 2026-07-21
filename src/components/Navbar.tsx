"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Shield, Lock } from "lucide-react";
import ThemeToggle from "./ui/ThemeToggle";
import LanguageToggle from "./ui/LanguageToggle";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { settings } = useSiteSettings();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t.navHome, href: "/" },
    { name: t.navServices, href: "/#services" },
    { name: t.navProducts, href: "/products" },
    { name: t.navWhyChoose, href: "/#why-choose" },
    { name: t.navContact, href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
          isScrolled
            ? "bg-bg-primary/80 backdrop-blur-md border-b border-border-custom py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(46,124,246,0.25)] border border-accent/40">
                <Image
                  src="/images/nakshatra-logo.png"
                  alt="Nakshatra CCTV Services Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider font-heading text-text-primary leading-none uppercase">
                  {t.brandName}
                </span>
                <span className="text-[9px] font-bold text-accent tracking-widest mt-0.5 uppercase leading-none">
                  {t.brandSub}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Navbar Actions (Right Side) */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
              <LanguageToggle />
              <ThemeToggle />

              <Link
                href="/admin"
                className="text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-accent transition-colors duration-300 flex items-center gap-1.5 mr-2"
              >
                <Lock className="h-3.5 w-3.5 text-accent" />
                <span>Login</span>
              </Link>

              {/* Call Hotline */}
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 text-xs text-text-primary font-bold hover:text-accent transition-colors duration-300 font-heading"
              >
                <div className="p-2 rounded-full bg-accent/10 border border-accent/20">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <span className="block text-[9px] text-text-secondary uppercase font-semibold leading-none">{t.callUsAnytime}</span>
                  <span className="block text-xs mt-1 leading-none">{settings.phone}</span>
                </div>
              </a>

              {/* Get Free Site Visit CTA */}
              <Link
                href="#contact"
                className="px-5 py-2.5 rounded-full text-xs font-bold font-heading bg-accent text-white hover:bg-accent/90 shadow-custom transition-all duration-300 active:scale-95 uppercase tracking-wider"
              >
                {t.getFreeSiteVisit}
              </Link>
            </div>

            {/* Mobile Navigation controls */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay Panel */}
      <div
        className={`fixed inset-0 z-[110] lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div onClick={() => setIsMobileMenuOpen(false)} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
        <div
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-bg-primary border-l border-white/10 p-6 shadow-2xl transition-transform duration-300 flex flex-col justify-between ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-8 mt-12">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold uppercase tracking-wider text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Login Link inside Mobile Side Drawer Menu */}
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-accent transition-colors duration-300 flex items-center gap-2 mt-2 pt-4 border-t border-border-custom"
              >
                <Lock className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4 mb-16">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg border border-white/10 text-text-primary text-xs font-bold hover:bg-bg-secondary transition-all duration-300"
            >
              <Phone className="h-4 w-4" />
              <span>Call: {settings.phone}</span>
            </a>
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-3.5 rounded-lg bg-accent text-white text-xs font-bold hover:bg-accent-glow shadow-custom transition-all duration-300"
            >
              Get Free Site Visit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
