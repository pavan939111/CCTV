"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { siteConfig } from "@/config/site.config";

export default function OsmMap() {
  useEffect(() => {
    // Fix default Leaflet icon assets missing in dynamic server builds
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  const position: [number, number] = [siteConfig.latitude, siteConfig.longitude];

  return (
    <div className="w-full h-[250px] sm:h-[300px] rounded-2xl overflow-hidden border border-border-custom shadow-sm relative z-10">
      <MapContainer 
        center={position} 
        zoom={14} 
        scrollWheelZoom={false} 
        className="w-full h-full"
        style={{ background: "var(--bg-secondary)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-black font-sans text-xs">
              <strong className="block text-accent font-bold mb-0.5">{siteConfig.name}</strong>
              <span>{siteConfig.fullAddress}</span>
              <span className="block mt-1 text-gray-500">{siteConfig.workingHours}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
