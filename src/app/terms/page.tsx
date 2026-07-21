import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteConfig.name}`,
  description: `Terms & Conditions for CCTV installation, hardware warranties, and service agreements at ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6 text-text-secondary leading-relaxed font-sans">
          <h1 className="text-3xl font-bold font-heading text-text-primary">Terms & Conditions</h1>
          <p>
            Welcome to {siteConfig.name}. By accessing our services or requesting site surveys, you agree to the following operational terms:
          </p>
          <h2 className="text-xl font-bold font-heading text-text-primary pt-4">Hardware Warranty</h2>
          <p>
            All cameras, DVRs, NVRs, and power supplies carry standard manufacturer warranties as specified in the official client estimate. Physical damage, lightning strikes, or power surge damage are excluded unless covered under an active AMC contract.
          </p>
          <h2 className="text-xl font-bold font-heading text-text-primary pt-4">Installation Estimates</h2>
          <p>
            Site survey quotations are valid for 15 business days. Additional cabling exceeding estimated quantities during installation will be billed at standard per-meter rates.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
