import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site.config";

export default function Footer() {
  return (
    <footer className="w-full bg-bg-secondary border-t border-border-custom text-text-secondary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About & Contact (NAP) */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-wider font-heading text-text-primary">
                NAKSHATRA
                <span className="text-accent ml-1">CCTV</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary">
              Professional CCTV installation, repair, and AMC services for homes, businesses, and industrial properties in {siteConfig.city}.
            </p>
            <div className="space-y-3.5 pt-2 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-text-secondary">{siteConfig.fullAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-accent transition-colors duration-300">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent transition-colors duration-300">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{siteConfig.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-base font-semibold text-text-primary uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#services" className="hover:text-accent transition-colors duration-300">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-accent transition-colors duration-300">
                  Products & Pricing
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-accent transition-colors duration-300">
                  Installation Gallery
                </Link>
              </li>
              <li>
                <Link href="#why-choose" className="hover:text-accent transition-colors duration-300">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-accent transition-colors duration-300">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-accent transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-6">
            <h4 className="text-base font-semibold text-text-primary uppercase tracking-wider font-heading">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
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
                  Annual Maintenance Contracts (AMC)
                </Link>
              </li>
              <li>
                <Link href="/access-control-system" className="hover:text-accent transition-colors duration-300">
                  Biometrics & Access Control
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Areas */}
          <div className="space-y-6">
            <h4 className="text-base font-semibold text-text-primary uppercase tracking-wider font-heading">
              Service Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {siteConfig.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-2.5 py-1 text-xs rounded bg-bg-primary/50 border border-border-custom text-text-secondary"
                >
                  {area}
                </span>
              ))}
            </div>
            {siteConfig.gstNumber && (
              <div className="pt-2 text-xs flex items-center gap-2 text-text-secondary/60">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>GST: {siteConfig.gstNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border-custom flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          
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

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition-colors duration-300" aria-label="Facebook">
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            <a href="#" className="hover:text-accent transition-colors duration-300" aria-label="Instagram">
              <svg className="h-4.5 w-4.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
