"use client";

import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQ() {
  const { t } = useLanguage();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const q = query(collection(db, "faqs"));
        const querySnapshot = await getDocs(q);
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            question: data.question || "",
            answer: data.answer || "",
            timestamp: data.timestamp ? data.timestamp.toDate() : new Date(0),
          });
        });
        items.sort((a, b) => b.timestamp - a.timestamp);
        setFaqs(items);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center items-center bg-bg-primary">
        <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If database is empty, do not show any hardcoded fallback data
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="w-full py-20 bg-bg-primary overflow-hidden border-b border-border-custom">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ FREQUENTLY ASKED QUESTIONS ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-text-primary">
            {t.faqHeading}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            {t.faqSub}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id}
                className="glass-card overflow-hidden transition-all duration-300 bg-bg-card border border-border-custom rounded-xl"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 flex items-center justify-between text-left gap-4 transition-colors hover:bg-bg-secondary/40"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-text-primary tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-text-secondary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-border-custom" : "max-h-0"
                  } overflow-hidden`}
                >
                  <div className="p-5 text-xs sm:text-sm text-text-secondary leading-relaxed bg-bg-primary/40">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
