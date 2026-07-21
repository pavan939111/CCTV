"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Timeline from "@/components/sections/Timeline";
import Brands from "@/components/sections/Brands";
import Industries from "@/components/sections/Industries";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

// Responsive Utilities
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import FloatingActions from "@/components/layout/FloatingActions";

export default function HomeRoot() {
  return (
    <>
      {/* 3.1 Sticky Glass Header */}
      <Navbar />

      <main className="flex-1 flex flex-col relative z-10">
        {/* 3.2 Hero Section */}
        <Hero />

        {/* 3.3 Trust Bar */}
        <TrustBar />

        {/* 3.4 Services Grid */}
        <Services />

        {/* 3.5 Products Grid */}
        <Products />

        {/* 3.6 Why Choose Nakshatra (10 Icon Cards) */}
        <WhyChooseUs />

        {/* 3.7 Installation Process Timeline (8 Steps) */}
        <Timeline />

        {/* 3.8 Brands Marquee */}
        <Brands />

        {/* 3.9 Industries Served */}
        <Industries />

        {/* 3.10 Testimonials Carousel */}
        <Testimonials />

        {/* 3.11 Installation Gallery & Lightbox */}
        <Gallery />

        {/* 3.12 FAQ Accordion */}
        <FAQ />

        {/* 3.13 Contact Form & Leaflet OSM Map */}
        <Contact />
      </main>

      {/* 3.14 Footer */}
      <Footer />

      {/* 3.15 Floating Actions & Sticky Mobile Bottom Bar */}
      <MobileBottomBar />
      <FloatingActions />
    </>
  );
}
