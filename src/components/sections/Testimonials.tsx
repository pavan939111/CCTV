"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
  id: string;
  name: string;
  locality: string;
  rating: number;
  text: string;
  date: string;
  isPlaceholder?: boolean;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const q = query(
          collection(db, "testimonials"),
          where("status", "==", "approved")
        );
        const querySnapshot = await getDocs(q);
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            name: data.name || "",
            locality: data.locality || "",
            rating: data.rating || 5,
            text: data.text || "",
            date: data.date || "Verified Customer",
            timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
          });
        });
        // Sort testimonials locally by timestamp desc
        items.sort((a, b) => b.timestamp - a.timestamp);
        setTestimonials(items);
      } catch (err) {
        console.warn("Firestore testimonials fetch failed or empty:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <div className="w-full py-16 flex justify-center items-center bg-bg-primary">
        <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <section className="w-full py-20 bg-bg-primary border-t border-border-custom/30 overflow-hidden relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-primary">
            Client <span className="text-accent">Testimonials</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            Read what our residential and commercial clients say about our surveillance setups.
          </p>
        </div>

        {/* Testimonial Card Slider */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full glass-card p-8 md:p-12 relative flex flex-col items-center text-center space-y-6 bg-bg-primary/50"
              >
                {/* Visual Placeholder Label */}
                {current.isPlaceholder && (
                  <span className="absolute top-4 right-6 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-[10px] uppercase font-bold tracking-wider text-accent">
                    Sample Review Layout
                  </span>
                )}

                <Quote className="h-10 w-10 text-accent/20 absolute top-6 left-6" />

                <div className="flex justify-center text-accent-glow">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < current.rating ? "fill-current text-accent" : "text-border-custom"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-base sm:text-lg italic text-text-primary leading-relaxed max-w-[50ch] font-medium">
                  &ldquo;{current.text}&rdquo;
                </p>

                <div className="space-y-1">
                  <h4 className="font-bold text-text-primary text-sm sm:text-base">{current.name}</h4>
                  <p className="text-xs text-text-secondary">{current.locality} • <span className="text-accent">{current.date}</span></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 sm:px-0">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-bg-card backdrop-blur-md border border-border-custom text-text-primary hover:bg-bg-secondary hover:text-accent transition-all duration-300 pointer-events-auto active:scale-90"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-bg-card backdrop-blur-md border border-border-custom text-text-primary hover:bg-bg-secondary hover:text-accent transition-all duration-300 pointer-events-auto active:scale-90"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-6 bg-accent" : "w-2 bg-border-custom"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
