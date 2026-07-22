"use client";

import { useState, useEffect, useRef, MouseEvent, TouchEvent } from "react";
import { Eye, X, MoveHorizontal, Camera } from "lucide-react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

type GalleryItem = {
  id: string;
  title: string;
  location: string;
  image: string;
  desc: string;
  gridRef: string;
};

export default function Gallery() {
  // Before / After Slider State
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Gallery dynamic state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox State
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, "gallery"));
        const querySnapshot = await getDocs(q);
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            title: data.title || "",
            location: data.location || "",
            image: data.image || "",
            desc: data.desc || "",
            gridRef: data.gridRef || "",
            timestamp: data.timestamp ? data.timestamp.toDate() : new Date(0),
          });
        });
        items.sort((a, b) => b.timestamp - a.timestamp);
        setGalleryItems(items);
      } catch (err) {
        console.error("Error fetching gallery from Firestore:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Drag handlers for before/after slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-16 flex justify-center items-center bg-bg-primary">
        <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (galleryItems.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="w-full py-16 md:py-24 bg-bg-primary overflow-hidden surveillance-grid border-b border-border-custom/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            SURVEILLANCE ARCHIVES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary tracking-tight">
            Cabling Makeovers & Installations
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-[55ch] mx-auto leading-relaxed">
            Drag the scanner slider below to audit our clean conduit layouts compared to generic installations.
          </p>
        </div>

        {/* High-tech Before/After Scanner Scope Slider */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-20 relative">
          
          {/* Active target scanner border decorators */}
          <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-accent-glow -mt-2 -ml-2 z-10" />
          <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-accent-glow -mt-2 -mr-2 z-10" />
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent-glow -mb-2 -ml-2 z-10" />
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent-glow -mb-2 -mr-2 z-10" />

          {/* Telemetry diagnostics header on slider */}
          <div className="absolute top-4 left-4 z-20 font-mono text-[9px] bg-black/70 border border-white/10 px-2 py-1 rounded text-accent-glow flex items-center gap-1.5 font-bold uppercase select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-glow animate-pulse" />
            <span>Target Scanner Scope // ACTIVE</span>
          </div>

          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onTouchStart={() => { isDragging.current = true; }}
            onTouchEnd={() => { isDragging.current = false; }}
            className="relative w-full h-[260px] sm:h-[350px] lg:h-[400px] rounded-xl overflow-hidden border border-border-custom cursor-ew-resize select-none"
          >
            {/* HUD Central Reticle Crosshairs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 border border-accent/20 rounded-full pointer-events-none z-10 flex items-center justify-center">
              <span className="text-[10px] text-accent/30 font-mono">+</span>
            </div>

            {/* Before Image (Messy) */}
            <div className="absolute inset-0 w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cctv-before.png"
                alt="Messy analog CCTV coaxial wiring before makeover"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 z-10 px-2.5 py-1 rounded bg-black/80 border border-white/10 text-[9px] font-bold text-white uppercase font-mono tracking-wider">
                INPUT: COAXIAL_CHAOS
              </span>
            </div>

            {/* After Image Container (Structured) */}
            <div
              className="absolute inset-y-0 left-0 w-full h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="absolute inset-0 w-full h-full min-w-full">
                <div className="relative w-full h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || 800 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/cctv-after.png"
                    alt="Neat Cat6 conduit routing after professional makeover"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="absolute bottom-4 left-4 z-10 px-2.5 py-1 rounded bg-accent/90 border border-white/10 text-[9px] font-bold text-white uppercase font-mono tracking-wider whitespace-nowrap">
                OUTPUT: NAKSHATRA_GRID
              </span>
            </div>

            {/* Divider line & Drag Handle Indicator */}
            <div
              className="absolute inset-y-0 w-0.5 bg-accent-glow cursor-ew-resize z-20 flex items-center justify-center shadow-[0_0_10px_rgba(0,168,255,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="h-8 w-8 rounded bg-[#0B1220] text-accent border border-accent/40 flex items-center justify-center shadow-custom -ml-[16px] hover:scale-105 active:scale-95 transition-transform duration-300">
                <MoveHorizontal className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Projects Grid */}
        <div>
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-text-secondary font-mono mb-8">
            Diagnostic Records // Completed Installs
          </h3>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs text-text-secondary">Loading installation records...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="group glass-card overflow-hidden hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-bg-card border border-border-custom relative rounded-2xl flex flex-col justify-between"
                >
                  <div className="relative w-full h-[180px] bg-bg-primary overflow-hidden border-b border-border-custom">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-xs">
                      <div className="p-2 py-1.5 rounded bg-accent text-white shadow-custom scale-90 group-hover:scale-100 transition-transform duration-300 flex items-center gap-1.5 font-heading text-[10px] font-semibold">
                        <Eye className="h-4 w-4" />
                        <span>VIEW DETAILS</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] font-bold font-mono text-accent">
                        <span>{item.location}</span>
                        <span className="text-text-secondary">{item.gridRef}</span>
                      </div>
                      <h4 className="text-sm font-bold text-text-primary tracking-wide leading-snug group-hover:text-accent transition-colors duration-300 font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Lightbox Modal overlay */}
      {activeItem && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 animate-fadeIn">
          <div onClick={() => setActiveItem(null)} className="absolute inset-0 cursor-zoom-out" />
          
          <div className="relative w-full max-w-4xl bg-bg-primary border border-border-custom rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none">
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/90 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Image section */}
            <div className="relative w-full md:w-3/5 h-[280px] sm:h-[350px] md:h-[450px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info section */}
            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-center space-y-4 font-sans bg-bg-secondary/40 backdrop-blur-md">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-accent">
                <span>{activeItem.location}</span>
                <span className="text-text-secondary">{activeItem.gridRef}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-text-primary leading-tight">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {activeItem.desc}
              </p>
              
              <div className="pt-4 border-t border-border-custom">
                <a
                  href="#contact"
                  onClick={() => setActiveItem(null)}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-accent text-white text-xs font-bold hover:bg-accent/90 transition-all duration-300 font-heading uppercase"
                >
                  Request Configuration
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
