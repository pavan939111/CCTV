"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/sections/Contact";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import FloatingActions from "@/components/layout/FloatingActions";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";

type ServicePageProps = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  features: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  slug: string;
};

export default function InnerPageTemplate({
  title,
  subtitle,
  description,
  highlights,
  features,
  faqs,
  slug,
}: ServicePageProps) {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();

  const phone = settings.phone || siteConfig.phone;
  const whatsappNumber = settings.whatsappNumber || siteConfig.whatsappNumber;
  const city = settings.city || siteConfig.city;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Nakshatra CCTV Services. I need details about ${title} in ${city}. Please share details.`
  )}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://nakshatracctv.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": `https://nakshatracctv.com/${slug}`
      }
    ]
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteConfig.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city,
        "addressCountry": "IN"
      }
    },
    "areaServed": city,
    "description": description
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Navbar />

      <main className="flex-1 flex flex-col relative z-10 bg-bg-primary">
        {/* Breadcrumb & Inner Page Hero */}
        <section className="w-full pt-12 pb-16 bg-gradient-to-b from-bg-secondary/40 to-bg-primary border-b border-border-custom relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-2 text-xs font-medium text-text-secondary mb-6">
              <Link href="/" className="hover:text-accent transition-colors">{t.navHome}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-text-primary font-semibold">{title}</span>
            </div>

            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                ✦ Professional Security Service ✦
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-text-primary tracking-tight leading-tight">
                {title} in <span className="text-accent">{city}</span>
              </h1>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
                {subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 shadow-custom text-sm font-heading flex items-center gap-2"
                >
                  <span>{t.getFreeSiteVisit}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-success-whatsapp/40 bg-success-whatsapp/10 text-success-whatsapp font-semibold text-sm font-heading flex items-center gap-2 hover:bg-success-whatsapp/20"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{t.chatOnWhatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Overview & Key Highlights */}
        <section className="w-full py-16 bg-bg-primary border-b border-border-custom">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-8 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
                  Why You Need <span className="text-accent">{title}</span>
                </h2>
                <p className="text-text-secondary text-base leading-relaxed">
                  {description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {features.map((feat, idx) => (
                    <div key={idx} className="glass-card p-5 bg-bg-card border border-border-custom rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-accent font-bold font-heading text-base">
                        <ShieldCheck className="h-5 w-5 shrink-0" />
                        <h3>{feat.title}</h3>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Quick Action Box */}
              <div className="lg:col-span-4 glass-card p-6 bg-bg-card border border-border-custom rounded-2xl space-y-6 sticky top-24">
                <div className="space-y-2 border-b border-border-custom pb-4">
                  <h3 className="text-lg font-bold font-heading text-text-primary">
                    Book Service Today
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Connect directly with our senior security technicians in {city}.
                  </p>
                </div>

                <div className="space-y-3">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-text-primary font-medium">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-3">
                  <a
                    href={`tel:${phone}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-border-custom text-text-primary font-bold text-xs hover:bg-bg-secondary transition-all"
                  >
                    <Phone className="h-4 w-4 text-accent" />
                    <span>Call {phone}</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-success-whatsapp text-white font-bold text-xs hover:opacity-90 transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{t.chatOnWhatsapp}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="w-full py-16 bg-bg-secondary border-b border-border-custom">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-text-primary">
                  {t.faqHeading}
                </h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="glass-card p-5 bg-bg-card border border-border-custom rounded-2xl space-y-2">
                    <h3 className="text-base font-bold text-text-primary font-heading">
                      {faq.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Contact />
      </main>

      <Footer />
      <MobileBottomBar />
      <FloatingActions />
    </>
  );
}
