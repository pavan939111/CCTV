"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useLanguage } from "@/context/LanguageContext";

import Image from "next/image";

export default function Footer() {
  const { settings } = useSiteSettings();
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-bg-secondary/40 border-t border-border-custom text-text-secondary py-16 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: About & Contact */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
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
            <p className="text-xs leading-relaxed text-text-secondary">
              {t.footerDesc}
            </p>
            <div className="space-y-3.5 pt-2 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-text-secondary">{settings.fullAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-accent transition-colors duration-300">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-accent transition-colors duration-300">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{settings.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider font-heading">
              {t.quickLinks}
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="#services" className="hover:text-accent transition-colors duration-300">
                  {t.navServices}
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-accent transition-colors duration-300">
                  {t.navProducts}
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-accent transition-colors duration-300">
                  {t.navGallery}
                </Link>
              </li>
              <li>
                <Link href="#why-choose" className="hover:text-accent transition-colors duration-300">
                  {t.navWhyChoose}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-accent transition-colors duration-300">
                  {t.navContact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider font-heading">
              {t.servicesCol}
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/cctv-installation" className="hover:text-accent transition-colors duration-300">
                  CCTV Camera Installation
                </Link>
              </li>
              <li>
                <Link href="/cctv-repair" className="hover:text-accent transition-colors duration-300">
                  CCTV Repair & Service
                </Link>
              </li>
              <li>
                <Link href="/wireless-cctv-installation" className="hover:text-accent transition-colors duration-300">
                  Wireless Camera Setup
                </Link>
              </li>
              <li>
                <Link href="/ip-camera-installation" className="hover:text-accent transition-colors duration-300">
                  IP Camera Installation
                </Link>
              </li>
              <li>
                <Link href="/amc-services" className="hover:text-accent transition-colors duration-300">
                  Annual Maintenance Contracts
                </Link>
              </li>
              <li>
                <Link href="/biometric-attendance-system" className="hover:text-accent transition-colors duration-300">
                  Biometrics & Access Control
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Areas */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider font-heading">
              {t.areasCol}
            </h4>
            <div className="flex flex-wrap gap-2">
              {settings.serviceAreas.map((area: string) => (
                <span
                  key={area}
                  className="px-2.5 py-1 text-[10px] rounded bg-bg-primary/50 border border-border-custom text-text-secondary"
                >
                  {area}
                </span>
              ))}
            </div>
            {settings.gstNumber && (
              <div className="pt-2 text-[10px] flex items-center gap-2 text-text-secondary/60">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>GST: {settings.gstNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border-custom flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
          <p>© {new Date().getFullYear()} Nakshatra CCTV Services. {t.rightsReserved}</p>
          
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-accent transition-colors duration-300">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
