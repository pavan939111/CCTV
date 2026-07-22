import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nakshatracctv.com"),
  title: "Best CCTV Camera Installation in Nalgonda | Nakshatra CCTV",
  description: "Looking for the best CCTV installation, repair, and security camera dealer in Nalgonda & Suryapet? 📞 Call +91 79815 77411 for a free on-site physical survey and price quote today!",
  keywords: [
    "CCTV Installation Nalgonda",
    "Security Camera Setup Nalgonda",
    "CCTV Repair Service Nalgonda",
    "IP Camera Installation Nalgonda",
    "Wireless CCTV Nalgonda",
    "AMC CCTV Maintenance Nalgonda",
    "Best CCTV Dealer Nalgonda",
  ],
  authors: [{ name: "Nakshatra CCTV Services" }],
  openGraph: {
    title: "Best CCTV Camera Installation in Nalgonda | Nakshatra CCTV Services",
    description: "Looking for the best CCTV installation, repair, and security camera dealer in Nalgonda & Suryapet? Get a free on-site physical survey today!",
    url: "https://nakshatracctv.com",
    siteName: "Nakshatra CCTV Services",
    images: [
      {
        url: "/images/hero-poster-dark.png",
        width: 1600,
        height: 900,
        alt: "Nakshatra CCTV Services Camera System",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nakshatra CCTV Services",
  "image": "https://nakshatracctv.com/images/hero-poster-dark.png",
  "@id": "https://nakshatracctv.com/#localbusiness",
  "url": "https://nakshatracctv.com",
  "telephone": "+91 79815 77411",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "H.No: 5-4-12, Near Clock Tower",
    "addressLocality": "Nalgonda",
    "addressRegion": "Telangana",
    "postalCode": "508001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 17.0500,
    "longitude": 79.2700
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
                  if (storedTheme === 'light' || (!storedTheme && systemPrefersLight)) {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary transition-colors duration-300 space-starfield">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
