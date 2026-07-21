import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Products from "@/components/sections/Products";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import FloatingActions from "@/components/layout/FloatingActions";

export const metadata: Metadata = {
  title: "CCTV Camera Products & Pricing in Nalgonda & Suryapet | Nakshatra CCTV",
  description: "Explore prices for IP cameras, WiFi dome cameras, PTZ cameras, NVRs, DVRs, and surveillance hard disks in Nalgonda & Suryapet.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-bg-primary pt-10">
        <Products />
      </main>
      <Footer />
      <MobileBottomBar />
      <FloatingActions />
    </>
  );
}
