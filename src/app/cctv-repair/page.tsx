import { Metadata } from "next";
import InnerPageTemplate from "@/components/ui/InnerPageTemplate";

export const metadata: Metadata = {
  title: "CCTV Repair & Maintenance Services in Hyderabad | Nakshatra CCTV",
  description: "Fast same-day CCTV camera repair, DVR power supply fix, BNC cable troubleshooting, and lens replacement in Hyderabad.",
};

export default function CCTVRepairPage() {
  return (
    <InnerPageTemplate
      title="CCTV Repair & Maintenance"
      subtitle="Rapid diagnostic and same-day repair for non-functional cameras, lost video signals, burnt SMPS units, and corrupted hard disks."
      description="Is your CCTV system showing 'No Signal', black screens, or failed night vision? Nakshatra CCTV Services provides fast, reliable CCTV repair across Hyderabad for all major brands including CP Plus, Hikvision, Dahua, UNV, and Honeywell."
      highlights={[
        "Same-Day Repair Visit",
        "SMPS Power Supply Replacement",
        "BNC & Cable Connector Repair",
        "DVR/NVR Password Reset",
        "Hard Disk Error & Recovery Fix"
      ]}
      features={[
        {
          title: "Video Loss & Signal Troubleshooting",
          desc: "Expert diagnosis of loose cables, burnt power adapters, and faulty BNC channels."
        },
        {
          title: "DVR / NVR Firmware & Password Reset",
          desc: "Forgot your DVR admin password? We unlock and reset security recorders safely."
        },
        {
          title: "Camera Lens & Infrared Repair",
          desc: "Repair or replace blurry lenses, broken glass domes, and IR LED night-vision boards."
        },
        {
          title: "Camera Relocation & Cable Re-wiring",
          desc: "Safe unmounting, re-positioning, and fresh cabling for renovated spaces."
        }
      ]}
      faqs={[
        {
          q: "Why is my CCTV showing 'No Video' or 'No Signal'?",
          a: "This is usually caused by a faulty SMPS power supply adapter, loose BNC connector, or damaged cable line. Our engineers diagnose the exact cause during site inspection."
        },
        {
          q: "Do you repair cameras of any brand?",
          a: "Yes, we repair and service CCTV systems of all brands including CP Plus, Hikvision, Dahua, Godrej, Panasonic, and unbranded setup."
        }
      ]}
      slug="cctv-repair"
    />
  );
}
