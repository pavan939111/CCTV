import { Metadata } from "next";
import InnerPageTemplate from "@/components/ui/InnerPageTemplate";

export const metadata: Metadata = {
  title: "Wireless CCTV Camera Installation in Hyderabad | Nakshatra CCTV",
  description: "Wire-free WiFi camera setup for homes, apartments, and shops. 360° pan-tilt motion tracking & cloud storage.",
};

export default function WirelessCCTVPage() {
  return (
    <InnerPageTemplate
      title="Wireless CCTV Installation"
      subtitle="Smart WiFi home security cameras with 360° pan-tilt rotation, two-way audio, and instant smartphone notifications."
      description="Upgrade your home security without drilling extensive wall conduits. Wireless WiFi cameras are ideal for apartments, rented homes, boutique shops, and baby monitoring."
      highlights={[
        "No Heavy Cabling Required",
        "360° Pan & Tilt Coverage",
        "Two-Way Live Audio Chat",
        "MicroSD & Cloud Recording",
        "Instant Motion Alert Notifications"
      ]}
      features={[
        {
          title: "Plug & Play Setup",
          desc: "Connect seamlessly to your home WiFi router in minutes with clean power adapters."
        },
        {
          title: "Smart Motion Tracking",
          desc: "Cameras automatically pan and follow human movement around the room."
        },
        {
          title: "Mobile App Access",
          desc: "Stream crisp HD video directly on your smartphone from anywhere in the world."
        },
        {
          title: "Night Vision IR",
          desc: "Clear monochrome or full-color night recording even in complete darkness."
        }
      ]}
      faqs={[
        {
          q: "Do wireless cameras need electricity?",
          a: "Yes, wireless WiFi cameras connect via WiFi for data but still require a standard power outlet adapter (or rechargeable battery in solar models)."
        }
      ]}
      slug="wireless-cctv-installation"
    />
  );
}
