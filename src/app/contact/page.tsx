import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/sections/Contact";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import FloatingActions from "@/components/layout/FloatingActions";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Contact Nakshatra CCTV Services | CCTV Dealer in ${siteConfig.city}`,
  description: `Get in touch with Nakshatra CCTV Services for free site visits, CCTV quotations, and emergency camera repairs in ${siteConfig.city}.`,
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-bg-primary pt-10">
        <Contact />
      </main>
      <Footer />
      <MobileBottomBar />
      <FloatingActions />
    </>
  );
}
