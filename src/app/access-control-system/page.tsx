import { Metadata } from "next";
import InnerPageTemplate from "@/components/ui/InnerPageTemplate";

export const metadata: Metadata = {
  title: "Access Control System Installation in Nalgonda & Suryapet | Nakshatra CCTV",
  description: "RFID card, PIN keypads, and electromagnetic lock access control installation for offices & server rooms in Nalgonda & Suryapet.",
};

export default function AccessControlPage() {
  return (
    <InnerPageTemplate
      title="Access Control System Installation"
      subtitle="Restrict unauthorized access to sensitive office areas, server rooms, and executive suites with magnetic locks & RFID scanners."
      description="Protect your confidential corporate assets and streamline entry permissions with digital Access Control Systems. Control glass doors, turnstiles, and metal gates."
      highlights={[
        "Electromagnetic (EM) Heavy-Duty Locks",
        "RFID Smart Card & FOB Readers",
        "PIN Code Keypads & Exit Push Buttons",
        "Time-based Access Schedules",
        "Emergency Break-Glass Overrides"
      ]}
      features={[
        {
          title: "Glass Door Magnetic Locks",
          desc: "Sleek 600lbs EM locks designed specifically for frameless office glass doors."
        },
        {
          title: "Multi-Factor Authentication",
          desc: "Combine card + PIN or fingerprint scanning for high-security rooms."
        },
        {
          title: "Centralized Audit Logs",
          desc: "Track exact employee entry and exit timestamps with detailed software reports."
        },
        {
          title: "Fire Alarm Integration",
          desc: "Automatically releases all magnetic locks upon fire alarm trigger for quick evacuation."
        }
      ]}
      faqs={[
        {
          q: "What happens to magnetic locks during a power outage?",
          a: "Access control power supply units include battery backup to maintain lock security during power outages, plus manual break-glass exit triggers."
        }
      ]}
      slug="access-control-system"
    />
  );
}
