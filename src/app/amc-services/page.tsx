import { Metadata } from "next";
import InnerPageTemplate from "@/components/ui/InnerPageTemplate";

export const metadata: Metadata = {
  title: "CCTV Annual Maintenance Contract (AMC) in Nalgonda & Suryapet | Nakshatra CCTV",
  description: "Comprehensive CCTV AMC contracts for offices, apartments, factories, and schools. Monthly preventive maintenance & 24/7 breakdown support.",
};

export default function AMCPage() {
  return (
    <InnerPageTemplate
      title="CCTV Annual Maintenance Contract (AMC)"
      subtitle="Proactive maintenance, quarterly lens cleaning, hard disk health checks, and priority 24/7 breakdown support."
      description="Ensure your security cameras never go dark when you need them most. Our CCTV Annual Maintenance Contracts (Comprehensive & Non-Comprehensive) cover regular physical audits, wiring checks, DVR recording verification, and standby replacement hardware."
      highlights={[
        "Periodic Monthly/Quarterly Inspections",
        "Camera Lens Cleaning & Angle Adjustment",
        "Hard Disk Health & Recording Audits",
        "Free Standby Equipment Support",
        "24-Hour Breakdown Response SLA"
      ]}
      features={[
        {
          title: "Preventive Maintenance Audits",
          desc: "Scheduled technician visits to clean lenses, check power supplies, and tighten cable joints."
        },
        {
          title: "Hard Drive & Recording Retention Verification",
          desc: "We verify your DVR/NVR is actively recording and maintaining required 30-day logs."
        },
        {
          title: "Priority Emergency Repairs",
          desc: "Dedicated hotline for AMC subscribers with guaranteed same-day technician dispatch."
        },
        {
          title: "Comprehensive Hardware Warranty",
          desc: "Covers free replacement of burnt power adapters, damaged BNC connectors, and cables."
        }
      ]}
      faqs={[
        {
          q: "What is included in a CCTV AMC contract?",
          a: "AMC includes regular quarterly servicing, camera cleaning, recording health checks, priority emergency support, and option for standby hardware replacement."
        }
      ]}
      slug="amc-services"
    />
  );
}
