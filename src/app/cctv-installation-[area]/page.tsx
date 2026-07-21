import { Metadata } from "next";
import { notFound } from "next/navigation";
import InnerPageTemplate from "@/components/ui/InnerPageTemplate";
import { siteConfig } from "@/config/site.config";

type Props = {
  params: Promise<{ area: string }>;
};

// Map area slugs to formatted display names
const areaMap: Record<string, string> = {
  "madhapur": "Madhapur",
  "gachibowli": "Gachibowli",
  "kondapur": "Kondapur",
  "jubilee-hills": "Jubilee Hills",
  "banjara-hills": "Banjara Hills",
  "kukatpally": "Kukatpally",
  "miyapur": "Miyapur",
  "begumpet": "Begumpet",
  "secunderabad": "Secunderabad",
  "hitech-city": "Hitech City",
  "nalgonda": "Nalgonda",
};

export async function generateStaticParams() {
  return Object.keys(areaMap).map((area) => ({
    area: area,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const area = resolvedParams?.area;
  const areaName = area ? areaMap[area.toLowerCase()] : undefined;

  if (!areaName) {
    return { title: "CCTV Installation | Nakshatra CCTV" };
  }

  return {
    title: `CCTV Camera Installation in ${areaName}, ${siteConfig.city} | Nakshatra CCTV`,
    description: `Best CCTV installation, repair, and security camera dealer in ${areaName}, ${siteConfig.city}. Same-day site survey & 24/7 technical support.`,
  };
}

export default async function LocationCCTVPage({ params }: Props) {
  const resolvedParams = await params;
  const area = resolvedParams?.area;
  const areaName = area ? areaMap[area.toLowerCase()] : undefined;

  if (!areaName) {
    notFound();
  }

  return (
    <InnerPageTemplate
      title={`CCTV Installation in ${areaName}`}
      subtitle={`Local CCTV installation, repair, and surveillance services serving homes, offices, shops, and apartments in ${areaName}, ${siteConfig.city}.`}
      description={`Nakshatra CCTV Services is ${areaName}'s trusted CCTV installation specialist. Our certified engineers provide free site visits, transparent quotations, high-definition IP camera setups, and same-day maintenance across ${areaName} and surrounding localities.`}
      highlights={[
        `Local ${areaName} Security Technicians`,
        "Same-Day Site Inspection",
        "Official Dealer of Hikvision, CP Plus & Dahua",
        "Neat Conduit & Concealed Wiring",
        "24×7 Phone & On-Site Assistance"
      ]}
      features={[
        {
          title: `Apartment & Home CCTV in ${areaName}`,
          desc: "Discreet HD dome and outdoor night-vision cameras tailored for residential villas and apartment blocks."
        },
        {
          title: `Commercial & Retail Security in ${areaName}`,
          desc: "Multi-channel NVR/DVR surveillance grids for retail showrooms, corporate offices, and IT parks."
        },
        {
          title: "CCTV Repair & Maintenance",
          desc: "Fast troubleshooting for camera video loss, burnt power supply units, damaged wiring, and password resets."
        },
        {
          title: "Annual Maintenance Contracts (AMC)",
          desc: "Proactive monthly camera audits, quarterly lens cleaning, and standby equipment support."
        }
      ]}
      faqs={[
        {
          q: `How quickly can a technician visit my site in ${areaName}?`,
          a: `We have local technician teams stationed across ${areaName} and can schedule same-day free site visits upon inquiry.`
        },
        {
          q: "What CCTV camera brands do you install?",
          a: "We are authorized dealers and installers for top security brands including CP Plus, Hikvision, Dahua, UNV, and Godrej."
        }
      ]}
      slug={`cctv-installation-${area}`}
    />
  );
}
