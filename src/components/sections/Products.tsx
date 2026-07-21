"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, MessageCircle, FileText, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/context/LanguageContext";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

type ProductItem = {
  name: string;
  image: string;
  price: string;
  description: string;
  features: string[];
};

const defaultProductsData: ProductItem[] = [
  {
    name: "Premium 4K IP Bullet Camera",
    image: "/images/ip-camera.png",
    price: "3,499",
    description: "Enterprise-grade weatherproof bullet security camera featuring ultra-sharp 4K monitoring. Ideal for outdoor driveways, boundaries, and commercial sites.",
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
    description: "Highly versatile smart wireless dome camera with full 360-degree pan-tilt control, real-time two-way audio, and direct smartphone notification alerts.",
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
    description: "Compact dome security camera designed for indoor rooms, offices, and retail lobbies. Outfitted with smart infrared lights for clear night vision.",
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
    description: "Heavy-duty outdoor speed dome camera with 30x optical zoom capabilities, active tracking system locks, and long-range laser night illumination.",
    features: [
      "30x Optical Zoom Control",
      "Auto-Tracking Target Lock",
      "Long-Range Laser Night Vision",
    ],
  },
  {
    name: "Multi-Channel NVR Recorder",
    image: "/images/nvr.png",
    price: "6,499",
    description: "Centralized network video recorder for security video storage, managing up to 16 digital IP feeds with smart space-saving H.265+ compression.",
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
    description: "High-grade components including solid copper Cat6 cabling, consolidated SMPS power distributors, and gold-plated BNC connectors.",
    features: [
      "Coaxial Cat6 Copper Cables",
      "Heavy-Duty SMPS Power Unit",
      "Shielded BNC/DC Connectors",
    ],
  },
];

export default function Products() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<ProductItem[]>(defaultProductsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const items: ProductItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            name: data.name || "",
            image: data.image || "",
            price: data.price || "0",
            description: data.description || "",
            features: Array.isArray(data.features) ? data.features : [],
          });
        });
        if (items.length > 0) {
          setProducts(items);
        }
      } catch (err) {
        console.error("Error fetching products from Firestore:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getWhatsappUrl = (productName: string) => {
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      `Hello. I am interested in the ${productName}. Please share the quotation.`
    )}`;
  };

  return (
    <section id="products" className="w-full py-16 md:py-24 bg-bg-secondary border-b border-border-custom overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12 md:mb-20">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ CERTIFIED HARDWARE ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary tracking-tight">
            {t.productsHeading}
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            {t.productsSub}
          </p>
        </div>

        {/* Products Grid */}
        {loading && products === defaultProductsData ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs text-text-secondary">Loading hardware catalogue...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                t={t}
                getWhatsappUrl={getWhatsappUrl}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

/* Individual Interactive Product Card Component */
function ProductCard({
  product,
  t,
  getWhatsappUrl,
}: {
  product: ProductItem;
  t: any;
  getWhatsappUrl: (name: string) => string;
}) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="glass-card p-5 flex flex-col justify-between hover:border-accent/40 transition-all duration-300 bg-bg-card rounded-2xl relative group shadow-sm border border-border-custom hover:shadow-lg">
      
      {/* Product Information */}
      <div className="space-y-4">
        {/* Image Frame */}
        <div className="relative w-full h-[180px] sm:h-[200px] rounded-xl overflow-hidden bg-bg-primary border border-border-custom group-hover:border-accent/20 transition-colors">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/20 to-transparent pointer-events-none" />
        </div>

        <div className="space-y-2">
          {/* Title */}
          <h3 className="text-lg font-bold text-text-primary font-heading tracking-wide leading-snug">
            {product.name}
          </h3>

          {/* Description Text - Rich, detailed context */}
          <p className="text-xs text-text-secondary leading-relaxed font-sans font-normal">
            {product.description}
          </p>

          {/* Features Checklist */}
          {product.features && product.features.length > 0 && (
            <ul className="grid grid-cols-1 gap-2 pt-2 text-[11px] text-text-secondary">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Pricing & Unified Contact Action */}
      <div className="mt-6 pt-4 border-t border-border-custom relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold font-sans">{t.startingAt}</span>
            <span className="text-xl font-extrabold text-text-primary font-heading mt-0.5">
              ₹{product.price}
              <span className="text-xs text-text-secondary font-normal ml-0.5">*</span>
            </span>
          </div>

          {/* Single Action Button that reveals options */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold font-heading bg-accent text-white hover:bg-accent/90 shadow-md transition-all duration-300 active:scale-95 uppercase tracking-wider cursor-pointer"
          >
            <span>Get Quote</span>
            {showOptions ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>

        {/* Expandable Options Panel */}
        {showOptions && (
          <div className="absolute bottom-16 right-0 left-0 bg-bg-secondary border border-border-custom rounded-xl p-3 shadow-xl flex items-center justify-around gap-2 animate-fadeIn z-20 backdrop-blur-md">
            
            {/* Call */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex flex-col items-center gap-1.5 p-2 hover:bg-bg-primary rounded-lg transition-colors flex-1 text-center"
            >
              <div className="p-2.5 rounded-full bg-accent/10 border border-accent/20">
                <Phone className="h-4 w-4 text-accent" />
              </div>
              <span className="text-[9px] font-bold text-text-primary uppercase tracking-wide">Call Now</span>
            </a>

            {/* WhatsApp */}
            <a
              href={getWhatsappUrl(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-2 hover:bg-bg-primary rounded-lg transition-colors flex-1 text-center"
            >
              <div className="p-2.5 rounded-full bg-success-whatsapp/10 border border-success-whatsapp/20">
                <MessageCircle className="h-4 w-4 text-success-whatsapp" />
              </div>
              <span className="text-[9px] font-bold text-text-primary uppercase tracking-wide">WhatsApp</span>
            </a>

            {/* Free Quote Form */}
            <a
              href="#contact"
              onClick={() => setShowOptions(false)}
              className="flex flex-col items-center gap-1.5 p-2 hover:bg-bg-primary rounded-lg transition-colors flex-1 text-center"
            >
              <div className="p-2.5 rounded-full bg-accent/10 border border-accent/20">
                <FileText className="h-4 w-4 text-accent" />
              </div>
              <span className="text-[9px] font-bold text-text-primary uppercase tracking-wide">Get Quote</span>
            </a>

          </div>
        )}
      </div>

    </div>
  );
}
