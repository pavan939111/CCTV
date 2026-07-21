import { Metadata } from "next";
import InnerPageTemplate from "@/components/ui/InnerPageTemplate";

export const metadata: Metadata = {
  title: "Professional CCTV Camera Installation in Nalgonda & Suryapet | Nakshatra CCTV",
  description: "Get certified CCTV camera installation services for homes, offices, apartments, and factories in Nalgonda & Suryapet. Same-day site survey & 24/7 support.",
};

export default function CCTVInstallationPage() {
  return (
    <InnerPageTemplate
      title="CCTV Installation Services"
      subtitle="Complete end-to-end security camera installation for homes, apartments, offices, factories, shops, and commercial facilities."
      description="Nakshatra CCTV Services provides professional, certified CCTV installation across Nalgonda & Suryapet. Our expert technicians handle perimeter wiring, conduit layout, camera mounting, DVR/NVR network configuration, mobile remote access setup, and post-installation testing."
      highlights={[
        "Certified CCTV Technicians",
        "Genuine CP Plus, Hikvision & Dahua Hardware",
        "Concealed Conduit & Weatherproof Wiring",
        "Mobile App Streaming Setup",
        "Free On-Site Physical Inspection"
      ]}
      features={[
        {
          title: "Residential CCTV Installation",
          desc: "Protect your home, family, and entry points with discreet dome and night-vision outdoor cameras."
        },
        {
          title: "Commercial & Office Security",
          desc: "Multi-channel surveillance grids designed for office floors, server rooms, reception bays, and parking."
        },
        {
          title: "Industrial & Factory Setups",
          desc: "Heavy-duty high-temperature cameras built for factory floors, loading docks, and large warehouses."
        },
        {
          title: "Apartment Gated Community Grids",
          desc: "Comprehensive CCTV coverage for apartment entrances, elevators, clubhouses, and boundary walls."
        }
      ]}
      faqs={[
        {
          q: "How much does CCTV installation cost in Nalgonda & Suryapet?",
          a: "CCTV installation costs depend on the number of cameras, DVR/NVR channels, and cable length. Contact us for a free site visit and customized quotation."
        },
        {
          q: "How long does a typical 4-camera installation take?",
          a: "Most 4 to 8 camera residential or small office installations are completed within 4 to 6 hours on the same day."
        },
        {
          q: "Can I monitor live feeds on my mobile phone?",
          a: "Yes! We configure live video streaming on your smartphone (Android & iOS) as part of our standard installation."
        }
      ]}
      slug="cctv-installation"
    />
  );
}
