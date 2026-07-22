"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSiteSettings, SiteSettings } from "@/hooks/useSiteSettings";
import { Save, RefreshCw, Settings, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const settingsTranslations = {
  en: {
    title: "Global Settings",
    subtitle: "Configure global business contact points, hours, and statistics.",
    loadingMsg: "Retrieving site configuration overrides...",
    sectionTitle: "Business Parameters",
    phoneLabel: "Contact Phone",
    whatsappLabel: "WhatsApp Direct Number (No spaces/symbols)",
    emailLabel: "Business Email",
    cityLabel: "Primary Service City",
    addressLabel: "Full Physical Address (NAP)",
    installsLabel: "Successful Installations Count",
    responseTimeLabel: "Average Response Guarantee",
    supportLabel: "Support Schedule",
    gstLabel: "Business GST Registration (Optional)",
    hoursLabel: "Working Hours",
    areasLabel: "Service Areas (Comma separated)",
    mapsLabel: "Google Maps Embed Link / Reference URL",
    saveSuccessMsg: "Global configuration overrides saved! Changes are live on the landing page instantly.",
    saveBtn: "Save Overrides",
  },
  te: {
    title: "గ్లోబల్ సెట్టింగులు",
    subtitle: "గ్లోబల్ వ్యాపార సంప్రదింపు పాయింట్లు, పని గంటలు మరియు గణాంకాలను కాన్ఫిగర్ చేయండి.",
    loadingMsg: "సైట్ కాన్ఫిగరేషన్ ఓవర్‌రైడ్‌లను పొందుతోంది...",
    sectionTitle: "వ్యాపార పారామితులు",
    phoneLabel: "సంప్రదింపు ఫోన్",
    whatsappLabel: "వాట్సాప్ డైరెక్ట్ నంబర్ (ఖాళీలు/చిహ్నాలు ఉండకూడదు)",
    emailLabel: "వ్యాపార ఈమెయిల్",
    cityLabel: "ప్రాథమిక సేవా నగరం",
    addressLabel: "పూర్తి భౌతిక చిరునామా (NAP)",
    installsLabel: "విజయవంతమైన ఇన్‌స్టాలేషన్‌ల సంఖ్య",
    responseTimeLabel: "సగటు ప్రతిస్పందన హామీ",
    supportLabel: "మద్దతు షెడ్యూల్",
    gstLabel: "వ్యాపార GST నమోదు (ఐచ్ఛికం)",
    hoursLabel: "పని వేళలు",
    areasLabel: "సేవా ప్రాంతాలు (కామాలతో వేరు చేయబడినవి)",
    mapsLabel: "గూగుల్ మ్యాప్స్ ఎంబెడ్ లింక్ / రిఫరెన్స్ URL",
    saveSuccessMsg: "గ్లోబల్ కాన్ఫిగరేషన్ ఓవర్‌రైడ్‌లు సేవ్ చేయబడ్డాయి! మార్పులు తక్షణమే లైవ్‌లోకి వచ్చాయి.",
    saveBtn: "ఓవర్‌రైడ్‌లను సేవ్ చేయి",
  }
};

export default function SettingsDashboard() {
  const { settings: currentSettings, loading: fetchLoading } = useSiteSettings();
  const { language } = useLanguage();
  const t = settingsTranslations[language] || settingsTranslations.en;

  const [phone, setPhone] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [installationsCount, setInstallationsCount] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [supportAvailability, setSupportAvailability] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [serviceAreasRaw, setServiceAreasRaw] = useState("");
  const [googleMapsLink, setGoogleMapsLink] = useState("");

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
      setWorkingHours(currentSettings.workingHours || "");
      setServiceAreasRaw((currentSettings.serviceAreas || []).join(", "));
      setGoogleMapsLink(currentSettings.googleMapsLink || "");
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
      workingHours,
      serviceAreas: serviceAreasRaw.split(",").map((s) => s.trim()).filter(Boolean),
      googleMapsLink,
    };

    try {
      await setDoc(doc(db, "settings", "primary"), payload);
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
        <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-text-primary">{t.title}</h1>
        <p className="text-xs text-text-secondary mt-1">{t.subtitle}</p>
      </div>

      {fetchLoading ? (
        <div className="py-20 flex flex-col items-center justify-center bg-bg-secondary/15 border border-border-custom rounded-2xl">
          <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs text-text-secondary">{t.loadingMsg}</p>
        </div>
      ) : (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="bg-bg-secondary/15 border border-border-custom rounded-xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center gap-2 text-accent border-b border-border-custom/50 pb-3">
              <Settings className="h-5 w-5" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">{t.sectionTitle}</h2>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.phoneLabel}</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 79815 77411"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.whatsappLabel}</label>
                <input
                  type="text"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="e.g. 917981577411"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.emailLabel}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. info@nakshatracctv.com"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* Local City Area */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.cityLabel}</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Nalgonda"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* Full Address */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.addressLabel}</label>
                <input
                  type="text"
                  required
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="Street address, building number, locality, zip code..."
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* Installations Count */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.installsLabel}</label>
                <input
                  type="text"
                  required
                  value={installationsCount}
                  onChange={(e) => setInstallationsCount(e.target.value)}
                  placeholder="e.g. 1,500+"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* Response Time */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.responseTimeLabel}</label>
                <input
                  type="text"
                  required
                  value={responseTime}
                  onChange={(e) => setResponseTime(e.target.value)}
                  placeholder="e.g. Within 2 Hours"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* Support Availability */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.supportLabel}</label>
                <input
                  type="text"
                  required
                  value={supportAvailability}
                  onChange={(e) => setSupportAvailability(e.target.value)}
                  placeholder="e.g. 24/7 Support"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* GST Number */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.gstLabel}</label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  placeholder="e.g. 36XXXXX1234F1Z5"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* Working Hours */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.hoursLabel}</label>
                <input
                  type="text"
                  required
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  placeholder="e.g. 9:00 AM - 8:00 PM"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* Service Areas */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.areasLabel}</label>
                <input
                  type="text"
                  required
                  value={serviceAreasRaw}
                  onChange={(e) => setServiceAreasRaw(e.target.value)}
                  placeholder="e.g. Nalgonda, Suryapet, Miryalaguda"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              {/* Google Maps Link */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">{t.mapsLabel}</label>
                <input
                  type="text"
                  required
                  value={googleMapsLink}
                  onChange={(e) => setGoogleMapsLink(e.target.value)}
                  placeholder="e.g. https://maps.google.com"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

            </div>

            {/* Success Overlay Alerts */}
            {saveSuccess && (
              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-lg animate-fadeIn">
                <AlertCircle className="h-4.5 w-4.5" />
                <span>{t.saveSuccessMsg}</span>
              </div>
            )}

            {/* Save Buttons */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saveLoading}
                className="px-6 py-2.5 rounded-lg bg-accent hover:bg-accent/90 text-white text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
              >
                {saveLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{t.saveBtn}</span>
              </button>
            </div>

          </div>
        </form>
      )}
    </div>
  );
}
