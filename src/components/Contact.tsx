"use client";

import { useState, FormEvent } from "react";
import dynamic from "next/dynamic";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

// Dynamically load Map client-side to prevent Leaflet SSR errors
const OsmMap = dynamic(() => import("./ui/OsmMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[250px] sm:h-[300px] bg-bg-secondary animate-pulse rounded-2xl flex items-center justify-center border border-white/5">
      <span className="text-text-secondary text-xs">Loading Interactive Map...</span>
    </div>
  ),
});

export default function Contact() {
  const { settings } = useSiteSettings();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [service, setService] = useState("CCTV Installation");
  const [cameras, setCameras] = useState("1-4");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formDataForWa, setFormDataForWa] = useState<any>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      name,
      phone,
      email: email || "N/A",
      address,
      service,
      cameras,
      message: message || "N/A",
      timestamp: serverTimestamp(),
      status: "New",
    };

    try {
      await addDoc(collection(db, "leads"), leadData);
      setFormDataForWa({ name, phone, address, service, cameras, message });
      setSuccess(true);
      
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setService("CCTV Installation");
      setCameras("1-4");
      setMessage("");
    } catch (err) {
      console.error("Failed to submit lead to Firestore:", err);
      alert("Inquiry submission failed. Please click the WhatsApp button to message us directly.");
    } finally {
      setLoading(false);
    }
  };

  const getWaRedirectUrl = () => {
    if (!formDataForWa) return "#";
    const text = `Hello Nakshatra CCTV Services.
Name: ${formDataForWa.name}
Phone: ${formDataForWa.phone}
Address: ${formDataForWa.address}
Service: ${formDataForWa.service}
Cameras: ${formDataForWa.cameras}
Requirements: ${formDataForWa.message || "N/A"}
Please contact me.`;

    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="w-full py-20 bg-bg-primary overflow-hidden relative z-10 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            ✦ DISPATCH SURVEYOR ✦
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-text-primary tracking-tight uppercase leading-tight">
            Request a <span className="text-accent">Free Survey</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary max-w-[60ch] mx-auto leading-relaxed font-medium">
            Fill out the form below to book a site visit. We will call you back within 1 hour to schedule a survey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Panel */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 bg-[#0B1220]/25 relative">
              
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary/60 border border-border-custom text-text-primary focus:outline-none focus:border-accent text-xs font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="form-phone" className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="form-phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary/60 border border-border-custom text-text-primary focus:outline-none focus:border-accent text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary/60 border border-border-custom text-text-primary focus:outline-none focus:border-accent text-xs font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="form-address" className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                        Address / City Area *
                      </label>
                      <input
                        type="text"
                        id="form-address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Clock Tower, Nalgonda"
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary/60 border border-border-custom text-text-primary focus:outline-none focus:border-accent text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="form-service" className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                        Service Required *
                      </label>
                      <select
                        id="form-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary/60 border border-border-custom text-text-primary focus:outline-none focus:border-accent text-xs font-medium cursor-pointer"
                      >
                        <option value="CCTV Installation">CCTV Camera Installation</option>
                        <option value="CCTV Repair/Service">CCTV Repair & Service</option>
                        <option value="Wireless Camera Setup">Wireless Camera Setup</option>
                        <option value="AMC Maintenance Contract">Annual Maintenance Contract (AMC)</option>
                        <option value="System Upgrade/Relocation">Upgrades & Camera Relocation</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="form-cameras" className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                        No. of Cameras Needed
                      </label>
                      <select
                        id="form-cameras"
                        value={cameras}
                        onChange={(e) => setCameras(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary/60 border border-border-custom text-text-primary focus:outline-none focus:border-accent text-xs font-medium cursor-pointer"
                      >
                        <option value="1-4">1 to 4 Cameras</option>
                        <option value="5-8">5 to 8 Cameras</option>
                        <option value="9-16">9 to 16 Cameras</option>
                        <option value="17+ / Commercial">17+ (Commercial Setup)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="form-message" className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Additional Requirements (Optional)
                    </label>
                    <textarea
                      id="form-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details about the property, recording backup days needed, or specific requests..."
                      className="w-full px-4 py-3 rounded-xl bg-bg-primary/60 border border-border-custom text-text-primary focus:outline-none focus:border-accent text-xs font-medium resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-lg bg-accent hover:bg-accent-glow text-white font-bold flex items-center justify-center gap-2 shadow-custom transition-all duration-300 active:scale-95 disabled:opacity-75 disabled:pointer-events-none uppercase text-xs font-heading tracking-wider"
                  >
                    {loading ? (
                      <span>Submitting Form...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Book Free Site Visit</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 px-4 space-y-6 flex flex-col items-center select-none">
                  <div className="h-14 w-14 rounded-full bg-accent/10 border-2 border-accent text-accent flex items-center justify-center mb-2 font-black">
                    ✓
                  </div>
                  <h3 className="text-xl font-black text-text-primary font-heading uppercase">
                    Inquiry Logged Successfully!
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed max-w-[40ch] font-medium">
                    Your request is securely stored. Click below to continue on WhatsApp to schedule your survey immediately.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <a
                      href={getWaRedirectUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-white font-bold transition-all duration-300 hover:scale-102 active:scale-95 shadow-lg uppercase text-xs font-heading tracking-wider"
                      style={{ backgroundColor: "var(--success)" }}
                    >
                      <MessageCircle className="h-4.5 w-4.5" />
                      <span>Continue on WhatsApp</span>
                    </a>
                    
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-8 py-3.5 rounded-lg border border-border-custom hover:bg-bg-secondary text-text-secondary font-bold transition-all duration-300 uppercase text-xs font-heading tracking-wider"
                    >
                      Fill Another Form
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Contact Details & Map Grid */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-6 bg-[#0B1220]/25 space-y-6">
              <h3 className="text-sm font-black text-text-primary font-heading border-b border-white/5 pb-3 uppercase tracking-wider">
                Support Operations
              </h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-text-primary font-bold">Office Address</span>
                    <span className="text-text-secondary leading-relaxed font-medium">{settings.fullAddress}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-text-primary font-bold">Phone Hotline</span>
                    <a href={`tel:${settings.phone}`} className="text-text-secondary hover:text-accent font-medium transition-colors duration-300">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-text-primary font-bold">Email Inbox</span>
                    <a href={`mailto:${settings.email}`} className="text-text-secondary hover:text-accent font-medium transition-colors duration-300">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-text-primary font-bold">Operating Hours</span>
                    <span className="text-text-secondary leading-relaxed font-medium">{settings.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="space-y-4">
              <OsmMap />
              <div className="flex gap-4">
                <a
                  href={settings.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg border border-border-custom bg-bg-card hover:bg-bg-secondary text-text-primary text-xs font-bold font-heading uppercase tracking-wider transition-all duration-300"
                >
                  <MapPin className="h-4.5 w-4.5 text-accent" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
