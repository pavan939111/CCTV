"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";

type Review = {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
};

const defaultTestimonials: Review[] = [
  {
    id: "review-1",
    name: "Rahul Sharma",
    role: "Home Owner",
    rating: 5,
    content: "The team at Nakshatra was incredibly professional. The wiring is completely invisible, and the 4K clarity is better than I expected. Highly recommend their site visit!",
  },
  {
    id: "review-2",
    name: "Priya Verma",
    role: "Operations Manager",
    rating: 5,
    content: "We secured our entire warehouse with Nakshatra. Their remote monitoring setup has been a game changer for our security operations. Professional crew and prompt service.",
  },
  {
    id: "review-3",
    name: "Amit Patel",
    role: "Retail Store Owner",
    rating: 5,
    content: "Same-day troubleshooting! My coaxial camera went down, and they replaced the SMPS power supply in under two hours. Excellent after-sales support.",
  },
];

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>(defaultTestimonials);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "testimonials"), limit(3));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Review[];
          setReviews(list);
        }
      } catch (err) {
        console.warn("Failed to fetch testimonials from database, using defaults:", err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section id="testimonials" className="w-full py-20 bg-bg-primary overflow-hidden border-b border-white/5 select-none relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ CUSTOMER APPRECIATION ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-text-primary tracking-tight uppercase">
            What Our <span className="text-accent">Clients Say</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-[55ch] mx-auto leading-relaxed font-medium">
            Read verified feedback from property managers and families who trust Nakshatra.
          </p>
        </div>

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="glass-card p-6 flex flex-col justify-between hover:border-accent/40 bg-[#0B1220]/20 backdrop-blur-md relative overflow-hidden select-none hover:-translate-y-1 transition-all duration-300"
            >
              {/* Star Rating */}
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-text-secondary italic leading-relaxed font-medium">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center font-black text-xs text-accent-glow uppercase font-heading shrink-0 shadow-md">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <span className="block text-xs font-black text-text-primary uppercase tracking-wide leading-none font-heading">
                    {review.name}
                  </span>
                  <span className="text-[9px] text-[#94A3B8] font-bold mt-1 block leading-none font-mono uppercase tracking-wider">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
