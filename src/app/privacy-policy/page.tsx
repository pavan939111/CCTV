import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name} - How we handle customer inquiry data and site visit requests.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6 text-text-secondary leading-relaxed font-sans">
          <h1 className="text-3xl font-bold font-heading text-text-primary">Privacy Policy</h1>
          <p>
            At {siteConfig.name}, we prioritize the confidentiality and protection of our clients&apos; personal details and site location data.
          </p>
          <h2 className="text-xl font-bold font-heading text-text-primary pt-4">Data We Collect</h2>
          <p>
            When you submit a site visit request or WhatsApp inquiry form, we collect your name, phone number, city locality, and service requirements. This information is strictly used to schedule technician visits and issue hardware quotations.
          </p>
          <h2 className="text-xl font-bold font-heading text-text-primary pt-4">Data Sharing & Security</h2>
          <p>
            We do not sell, rent, or lease customer lead information to third parties. All lead submissions are secured via encrypted Firebase database protocols.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
