import { Metadata } from "next";
import InnerPageTemplate from "@/components/ui/InnerPageTemplate";

export const metadata: Metadata = {
  title: "Biometric Attendance System Installation in Hyderabad | Nakshatra CCTV",
  description: "Fingerprint & AI Face Recognition attendance machines with automated payroll software integration in Hyderabad.",
};

export default function BiometricAttendancePage() {
  return (
    <InnerPageTemplate
      title="Biometric Attendance Systems"
      subtitle="Eliminate proxy attendance with high-speed fingerprint scanners, AI touchless face recognition, and automated payroll reports."
      description="Streamline workforce management for offices, factories, schools, and retail chains with real-time biometric time & attendance systems. Compatible with Realtime, ESSL, ZKTeco, and Matrix devices."
      highlights={[
        "AI Touchless Face Recognition",
        "Optical Fingerprint Sensor",
        "Automated Monthly Payroll Reports",
        "Cloud Sync & Mobile Attendance App",
        "Battery Backup Power Support"
      ]}
      features={[
        {
          title: "Touchless AI Face Scanner",
          desc: "Sub-second facial matching even when wearing masks or optical glasses."
        },
        {
          title: "Payroll Software Export",
          desc: "Generate monthly OT, late mark, leave, and shift reports in CSV or Excel."
        },
        {
          title: "Multi-Location Centralization",
          desc: "Sync employee punch records from multiple branch offices to one master dashboard."
        },
        {
          title: "Heavy-Duty Hardware Enclosure",
          desc: "Industrial-grade keypads built for dust, humidity, and continuous factory usage."
        }
      ]}
      faqs={[
        {
          q: "Can biometric attendance data sync automatically with payroll software?",
          a: "Yes, our biometric devices export logs directly into major HRMS & Payroll software formats like Excel, Tally, and custom ERP APIs."
        }
      ]}
      slug="biometric-attendance-system"
    />
  );
}
