import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nakshatracctv.com";

  // Core static pages
  const staticPages = [
    "",
    "/products",
    "/cctv-installation",
    "/cctv-repair",
    "/wireless-cctv-installation",
    "/ip-camera-installation",
    "/amc-services",
    "/biometric-attendance-system",
    "/video-door-phone",
    "/access-control-system",
  ];

  // Dynamic regional location pages
  const dynamicAreas = [
    "nalgonda",
    "suryapet",
    "miryalaguda",
    "nakrekal",
    "narketpally",
    "devarakonda",
    "bhongir",
  ];

  const staticEntries = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const dynamicEntries = dynamicAreas.map((area) => ({
    url: `${baseUrl}/cctv-installation-${area}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...dynamicEntries];
}
