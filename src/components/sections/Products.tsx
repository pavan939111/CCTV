"use client";

import Image from "next/image";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";

type ProductItem = {
  name: string;
  image: string;
  price: string;
  features: string[];
};

const productsData: ProductItem[] = [
  {
    name: "Premium 4K IP Bullet Camera",
    image: "/images/ip-camera.png",
    price: "3,499",
    features: [
      "4K Ultra HD Resolution",
      "AI Person & Vehicle Detection",
      "Power-over-Ethernet (PoE) Support",
    ],
  },
  {
    name: "Smart WiFi Pan-Tilt Camera",
    image: "/images/wifi-camera.png",
    price: "2,199",
    features: [
      "360° Rotatable Dome View",
      "Two-Way Real-time Audio",
      "Human Motion Tracking Alerts",
    ],
  },
  {
    name: "High-Def Vandal Dome Camera",
    image: "/images/dome-camera.png",
    price: "1,899",
    features: [
      "5MP High-Resolution Sensor",
      "Weatherproof & Vandal-Resistant",
      "Smart Infrared Night Vision",
    ],
  },
  {
    name: "PTZ Speed Dome Camera",
    image: "/images/ptz-camera.png",
    price: "9,999",
    features: [
      "30x Optical Zoom Control",
      "Auto-Tracking Target Lock",
      "Long-Range Laser IR Night Vision",
    ],
  },
  {
    name: "Multi-Channel NVR Recorder",
    image: "/images/nvr.png",
    price: "6,499",
    features: [
      "H.265+ Smart Compression",
      "Supports Up to 16 Cameras",
      "Auto-Backup Cloud Logging",
    ],
  },
  {
    name: "CCTV Installation Accessories",
    image: "/images/accessories.png",
    price: "999",
    features: [
      "Coaxial Cat6 Copper Cables",
      "Heavy-Duty SMPS Power Unit",
      "Shielded BNC/DC Connectors",
    ],
  },
];

export default function Products() {
  const { t } = useLanguage();

  const getWhatsappUrl = (productName: string) => {
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      `Hello. I am interested in the ${productName}. Please share the quotation.`
    )}`;
  };

  return (
    <section id="products" className="w-full py-20 bg-bg-secondary border-b border-border-custom overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ CERTIFIED HARDWARE ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary tracking-tight">
            {t.productsHeading}
          </h2>
          <p className="text-sm text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            {t.productsSub}
          </p>
        </div>

        {/* Products Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory">
          {productsData.map((product) => (
            <div
              key={product.name}
              className="flex-shrink-0 w-[290px] sm:w-[320px] md:w-auto snap-center glass-card p-5 flex flex-col justify-between hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 bg-bg-card"
            >
              <div className="space-y-4">
                <div className="relative w-full h-[180px] sm:h-[220px] rounded-xl overflow-hidden bg-bg-primary border border-border-custom group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent pointer-events-none" />
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-text-primary font-heading tracking-wide leading-snug">
                  {product.name}
                </h3>

                <ul className="space-y-2 text-xs text-text-secondary">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-border-custom space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-text-secondary font-medium">{t.startingAt}</span>
                  <span className="text-lg sm:text-xl font-extrabold text-text-primary font-heading">
                    ₹{product.price}
                    <span className="text-xs text-text-secondary font-normal ml-0.5">*</span>
                  </span>
                </div>

                <div className="flex gap-2 text-xs">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-border-custom hover:bg-bg-primary text-text-primary font-bold transition-all active:scale-95"
                  >
                    <Phone className="h-3.5 w-3.5 text-accent" />
                    <span>{t.callBtn}</span>
                  </a>

                  <a
                    href={getWhatsappUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-success-whatsapp text-white font-bold transition-all active:scale-95 hover:opacity-90"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{t.inquiryBtn}</span>
                  </a>

                  <a
                    href="#contact"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-accent text-white font-bold hover:bg-accent/90 transition-all active:scale-95"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>{t.quoteBtn}</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
