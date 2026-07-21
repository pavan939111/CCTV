"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSiteSettings, SiteSettings } from "@/hooks/useSiteSettings";
import { Save, RefreshCw, Settings, AlertCircle } from "lucide-react";

export default function SettingsDashboard() {
  const { settings: currentSettings, loading: fetchLoading } = useSiteSettings();

  const [phone, setPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [installationsCount, setInstallationsCount] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [supportAvailability, setSupportAvailability] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state once Firestore settings are loaded
  useEffect(() => {
    if (!fetchLoading && currentSettings) {
      setPhone(currentSettings.phone);
      setWhatsappNumber(currentSettings.whatsappNumber);
      setEmail(currentSettings.email);
      setFullAddress(currentSettings.fullAddress);
      setCity(currentSettings.city);
      setInstallationsCount(currentSettings.installationsCount);
      setResponseTime(currentSettings.responseTime);
      setSupportAvailability(currentSettings.supportAvailability);
      setGstNumber(currentSettings.gstNumber);
    }
  }, [fetchLoading, currentSettings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setSaveSuccess(false);

    const payload: SiteSettings = {
      phone,
      whatsappNumber,
      email,
      fullAddress,
      city,
      installationsCount,
      responseTime,
      supportAvailability,
      gstNumber,
    };

    try {
      await setDoc(doc(db, "settings", "general"), payload);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Save settings failed:", err);
      alert("Failed to save site overrides configuration.");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-white">Global Settings</h1>
        <p className="text-xs text-[#94A3B8] mt-1">Configure global business contact points, hours, and statistics.</p>
      </div>

      {fetchLoading ? (
        <div className="py-20 flex flex-col items-center justify-center bg-white/3 border border-white/10 rounded-2xl">
          <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs text-[#94A3B8]">Retrieving site configuration overrides...</p>
        </div>
      ) : (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="bg-white/3 border border-white/10 rounded-xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center gap-2 text-accent border-b border-white/5 pb-3">
              <Settings className="h-5 w-5" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">Business Parameters</h2>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">WhatsApp Direct Number (No spaces/symbols)</label>
                <input
                  type="text"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="e.g. 919876543210"
                  className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Business Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. support@nakshatracctv.com"
                  className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* Local City Area */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Primary Service City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Hyderabad"
                  className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* Full Address */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Full Physical Address (NAP)</label>
                <input
                  type="text"
                  required
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="Street address, building number, locality, zip code..."
                  className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* Installations Count */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Successful Installations Count</label>
                <input
                  type="number"
                  required
                  value={installationsCount}
                  onChange={(e) => setInstallationsCount(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* Response Time */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Average Response Guarantee</label>
                <input
                  type="text"
                  required
                  value={responseTime}
                  onChange={(e) => setResponseTime(e.target.value)}
                  placeholder="e.g. 1-Hour Callback"
                  className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* Support Availability */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Support Schedule</label>
                <input
                  type="text"
                  required
                  value={supportAvailability}
                  onChange={(e) => setSupportAvailability(e.target.value)}
                  placeholder="e.g. 24x7 Helpdesk Support"
                  className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              {/* GST Number */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Business GST Registration (Optional)</label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="e.g. 36AAAAA1111A1Z1"
                  className="w-full px-4 py-2.5 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

            </div>

            {/* Success Overlay Alerts */}
            {saveSuccess && (
              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-lg animate-fadeIn">
                <AlertCircle className="h-4.5 w-4.5" />
                <span>Global configuration overrides saved! Changes are live on the landing page instantly.</span>
              </div>
            )}

            {/* Save Buttons */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent-glow text-white text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 disabled:opacity-75 disabled:pointer-events-none"
              >
                {saveLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>Save Overrides</span>
              </button>
            </div>

          </div>
        </form>
      )}
    </div>
  );
}
