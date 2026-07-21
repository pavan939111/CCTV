import { Metadata } from "next";
import InnerPageTemplate from "@/components/ui/InnerPageTemplate";

export const metadata: Metadata = {
  title: "Video Door Phone Installation in Nalgonda & Suryapet | Nakshatra CCTV",
  description: "Smart video door phones with HD outdoor camera, indoor display, smartphone remote unlock & night vision in Nalgonda & Suryapet.",
};

export default function VideoDoorPhonePage() {
  return (
    <InnerPageTemplate
      title="Video Door Phone Installation"
      subtitle="Screen visitors before opening your door with HD indoor monitors, outdoor camera chimes, and smartphone remote unlocking."
      description="Enhance home and villa security with modern Video Door Phones (VDP). Speak to visitors, capture snapshot logs of callers, and unlock electric door strikes remotely."
      highlights={[
        "7-inch High Contrast Color Displays",
        "HD Wide-Angle Door Bell Camera",
        "Infrared Night Vision",
        "Electronic Door Lock Integration",
        "Smartphone Mobile Intercom App"
      ]}
      features={[
        {
          title: "Two-Way Audio Intercom",
          desc: "Speak clearly to delivery executives and visitors without stepping outside."
        },
        {
          title: "Visitor Photo Snapshot Log",
          desc: "Automatically saves photos of whoever rings your doorbell while you are away."
        },
        {
          title: "Smart Lock Integration",
          desc: "Unlock main door magnetic locks directly from the indoor monitor or mobile phone."
        },
        {
          title: "Vandal-Resistant Metal Outdoor Unit",
          desc: "Weatherproof IP65 outdoor camera unit with illuminated ring chime."
        }
      ]}
      faqs={[
        {
          q: "Can I connect a Video Door Phone to my mobile phone?",
          a: "Yes, our smart WiFi VDP systems push live video calls to your mobile app so you can speak to visitors and unlock doors from anywhere."
        }
      ]}
      slug="video-door-phone"
    />
  );
}
