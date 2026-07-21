import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/sections/Gallery";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import FloatingActions from "@/components/layout/FloatingActions";

export const metadata: Metadata = {
  title: "CCTV Installation Gallery & Portfolio | Nakshatra CCTV",
  description: "Browse completed CCTV installation photos, before-after cable conduit comparisons, and apartment surveillance projects.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-bg-primary pt-10">
        <Gallery />
      </main>
      <Footer />
      <MobileBottomBar />
      <FloatingActions />
    </>
  );
}
