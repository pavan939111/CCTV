"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, FileText, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
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

export default function Products() {
  const { t } = useLanguage();
  const { settings } = useSiteSettings();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            name: data.name || "",
            image: data.image || "",
            price: data.price || "0",
            description: data.description || "",
            features: Array.isArray(data.features) ? data.features : [],
            timestamp: data.timestamp ? data.timestamp.toDate() : new Date(0),
          });
        });
        items.sort((a, b) => b.timestamp - a.timestamp);
        setProducts(items);
      } catch (err) {
        console.error("Error fetching products from Firestore:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getWhatsappUrl = (productName: string) => {
    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
      `Hello. I am interested in the ${productName}. Please share the quotation.`
    )}`;
  };

  if (loading) {
    return (
      <div className="w-full py-16 flex justify-center items-center bg-bg-secondary">
        <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }


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
  const { settings } = useSiteSettings();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="glass-card p-5 flex flex-col justify-between hover:border-accent/40 transition-all duration-300 bg-bg-card rounded-2xl relative group shadow-sm border border-border-custom hover:shadow-lg">
      
      {/* Product Information */}
      <div className="space-y-4">
        {/* Image Frame */}
        <div className="relative w-full h-[180px] sm:h-[200px] rounded-xl overflow-hidden bg-bg-primary border border-border-custom group-hover:border-accent/20 transition-colors">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
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
              href={`tel:${settings.phone}`}
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
