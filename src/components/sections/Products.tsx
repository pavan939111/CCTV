"use client";

import Image from "next/image";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { siteConfig } from "@/config/site.config";

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
  const getWhatsappUrl = (productName: string) => {
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      `Hello. I am interested in the ${productName}. Please share the quotation.`
    )}`;
  };

  return (
    <section id="products" className="w-full py-20 bg-bg-secondary border-y border-border-custom/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-primary">
            Branded <span className="text-accent">Products</span> & Hardware
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            We source certified, industry-leading security gear to ensure long-term durability. All devices carry standard manufacturer warranties.
          </p>
        </div>

        {/* Products Grid / Horizontal Scroll for Mobile */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent">
          {productsData.map((product) => (
            <div
              key={product.name}
              className="flex-shrink-0 w-[290px] sm:w-[320px] md:w-auto snap-center glass-card p-5 flex flex-col justify-between hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 bg-bg-primary/50"
            >
              {/* Product Card Header */}
              <div className="space-y-4">
                <div className="relative w-full h-[180px] sm:h-[220px] rounded-xl overflow-hidden bg-bg-primary border border-border-custom/40 group">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Accent Glow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/30 to-transparent pointer-events-none" />
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-wide leading-snug">
                  {product.name}
                </h3>

                {/* Features */}
                <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Footer & Actions */}
              <div className="mt-8 pt-4 border-t border-border-custom/50 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-text-secondary font-medium">Starting at</span>
                  <span className="text-lg sm:text-xl font-black text-text-primary font-heading">
                    ₹{product.price}
                    <span className="text-xs text-text-secondary font-normal ml-0.5">*</span>
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-2 text-xs">
                  {/* Call */}
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full border border-border-custom hover:bg-bg-secondary text-text-primary font-semibold transition-all duration-300 active:scale-95"
                    title="Call support"
                  >
                    <Phone className="h-3.5 w-3.5 text-accent" />
                    <span>Call</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={getWhatsappUrl(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-success-whatsapp text-white font-semibold transition-all duration-300 active:scale-95"
                    style={{ backgroundColor: "var(--success)" }}
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Inquiry</span>
                  </a>

                  {/* Get Quote */}
                  <a
                    href="#contact"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-accent text-white font-semibold hover:bg-accent-glow transition-all duration-300 active:scale-95"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Quote</span>
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
