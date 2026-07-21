import { Metadata } from "next";
import InnerPageTemplate from "@/components/ui/InnerPageTemplate";

export const metadata: Metadata = {
  title: "IP Camera & NVR System Installation in Hyderabad | Nakshatra CCTV",
  description: "High-definition IP network camera installation with Power-over-Ethernet (PoE) & NVR storage in Hyderabad.",
};

export default function IPCameraPage() {
  return (
    <InnerPageTemplate
      title="IP Camera Installation"
      subtitle="Enterprise-grade 4K IP camera setups with Power-over-Ethernet (PoE) cabling and centralized NVR recording."
      description="IP surveillance systems offer superior image clarity, facial recognition precision, digital zoom capability, and long-range network transmission. Perfect for corporate buildings, warehouses, hospitals, and high-end residences."
      highlights={[
        "4K Ultra HD Resolution",
        "Power over Ethernet (PoE Switch Wiring)",
        "AI Human & Vehicle Classification",
        "Centralized NVR Storage Grids",
        "Remote Multi-Site Surveillance"
      ]}
      features={[
        {
          title: "High-Bandwidth PoE Switches",
          desc: "Single Ethernet cable transfers both power and high-definition video data."
        },
        {
          title: "Smart H.265+ Compression",
          desc: "Saves up to 70% storage space while preserving crystal-clear video detail."
        },
        {
          title: "Scalable Network Architecture",
          desc: "Add 16 to 128+ IP cameras seamlessly across multiple floors and campus locations."
        },
        {
          title: "AI Video Analytics",
          desc: "Intrusion line crossing, perimeter breach alarms, and license plate reading."
        }
      ]}
      faqs={[
        {
          q: "What is the difference between IP cameras and HD analog cameras?",
          a: "IP cameras digitize video at the camera head, offering much higher resolutions (4K), digital zoom clarity, AI analytics, and simplified single-cable PoE wiring."
        }
      ]}
      slug="ip-camera-installation"
    />
  );
}
