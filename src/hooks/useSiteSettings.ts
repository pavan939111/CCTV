"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { siteConfig } from "@/config/site.config";

export type SiteSettings = {
  phone: string;
  whatsappNumber: string;
  email: string;
  fullAddress: string;
  city: string;
  installationsCount: string;
  responseTime: string;
  supportAvailability: string;
  gstNumber: string;
};

const defaultSettings: SiteSettings = {
  phone: siteConfig.phone,
  whatsappNumber: siteConfig.whatsappNumber,
  email: siteConfig.email,
  fullAddress: siteConfig.fullAddress,
  city: siteConfig.city,
  installationsCount: String(siteConfig.installationsCount),
  responseTime: siteConfig.responseTime,
  supportAvailability: siteConfig.supportAvailability,
  gstNumber: siteConfig.gstNumber || "",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to real-time configuration overrides in Firestore
    const docRef = doc(db, "settings", "general");
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSettings({
          phone: data.phone || defaultSettings.phone,
          whatsappNumber: data.whatsappNumber || defaultSettings.whatsappNumber,
          email: data.email || defaultSettings.email,
          fullAddress: data.fullAddress || defaultSettings.fullAddress,
          city: data.city || defaultSettings.city,
          installationsCount: data.installationsCount || defaultSettings.installationsCount,
          responseTime: data.responseTime || defaultSettings.responseTime,
          supportAvailability: data.supportAvailability || defaultSettings.supportAvailability,
          gstNumber: data.gstNumber || defaultSettings.gstNumber,
        });
      }
      setLoading(false);
    }, (error) => {
      console.warn("Firestore settings listen failed, using local placeholders:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { settings, loading };
}
