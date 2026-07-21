"use client";

import { useState, FormEvent } from "react";
import dynamic from "next/dynamic";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site.config";

// Dynamically load Map client-side to prevent Leaflet SSR errors
const OsmMap = dynamic(() => import("../ui/OsmMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[250px] sm:h-[300px] bg-bg-secondary animate-pulse rounded-2xl flex items-center justify-center border border-border-custom">
      <span className="text-text-secondary text-xs">Loading Interactive Map...</span>
    </div>
  ),
});

export default function Contact() {
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
      status: "New", // Pipeline status: New -> Contacted -> Closed
    };

    try {
      // 1. Save to Firestore
      await addDoc(collection(db, "leads"), leadData);
      
      // 2. Prepare data for WhatsApp redirection
      setFormDataForWa({
        name,
        phone,
        address,
        service,
        cameras,
        message,
      });

      setSuccess(true);
      
      // Clear form
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setService("CCTV Installation");
      setCameras("1-4");
      setMessage("");
    } catch (err) {
      console.error("Failed to submit lead to Firestore:", err);
      alert("Inquiry submission failed. You can still message us directly on WhatsApp using the button.");
    } finally {
      setLoading(false);
    }
  };

  // Compile pre-filled WhatsApp link
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

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="w-full py-20 bg-bg-primary overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-primary">
            Request a <span className="text-accent">Free Survey</span>
          </h2>
          <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] mx-auto leading-relaxed">
            Fill out the form below to book a site visit. We will call you back within 1 hour to schedule a survey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 bg-bg-secondary/15 relative">
              
              {!success ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border-custom text-text-primary focus:outline-none focus:border-accent text-sm"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="form-phone" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="form-phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border-custom text-text-primary focus:outline-none focus:border-accent text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border-custom text-text-primary focus:outline-none focus:border-accent text-sm"
                      />
                    </div>

                    {/* Address / City */}
                    <div className="space-y-2">
                      <label htmlFor="form-address" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                        Address / City Area *
                      </label>
                      <input
                        type="text"
                        id="form-address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Madhapur, Hyderabad"
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border-custom text-text-primary focus:outline-none focus:border-accent text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service Required */}
                    <div className="space-y-2">
                      <label htmlFor="form-service" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                        Service Required *
                      </label>
                      <select
                        id="form-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border-custom text-text-primary focus:outline-none focus:border-accent text-sm appearance-none cursor-pointer"
                      >
                        <option value="CCTV Installation">CCTV Camera Installation</option>
                        <option value="CCTV Repair/Service">CCTV Repair & Service</option>
                        <option value="Wireless Camera Setup">Wireless Camera Setup</option>
                        <option value="AMC Maintenance Contract">Annual Maintenance Contract (AMC)</option>
                        <option value="System Upgrade/Relocation">Upgrades & Camera Relocation</option>
                      </select>
                    </div>

                    {/* Number of Cameras */}
                    <div className="space-y-2">
                      <label htmlFor="form-cameras" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                        No. of Cameras Needed
                      </label>
                      <select
                        id="form-cameras"
                        value={cameras}
                        onChange={(e) => setCameras(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border-custom text-text-primary focus:outline-none focus:border-accent text-sm appearance-none cursor-pointer"
                      >
                        <option value="1-4">1 to 4 Cameras</option>
                        <option value="5-8">5 to 8 Cameras</option>
                        <option value="9-16">9 to 16 Cameras</option>
                        <option value="17+ / Commercial">17+ (Commercial Setup)</option>
                      </select>
                    </div>
                  </div>

                  {/* Requirements Message */}
                  <div className="space-y-2">
                    <label htmlFor="form-message" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                      Additional Requirements (Optional)
                    </label>
                    <textarea
                      id="form-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details about the property, recording backup days needed, or specific requests..."
                      className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border-custom text-text-primary focus:outline-none focus:border-accent text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-accent hover:bg-accent-glow text-white font-semibold flex items-center justify-center gap-2 shadow-custom transition-all duration-300 active:scale-95 disabled:opacity-75 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <span>Submitting Form...</span>
                    ) : (
                      <>
                        <Send className="h-4.5 w-4.5" />
                        <span>Book Free Site Visit</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 px-4 space-y-6 flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-accent/10 border-2 border-accent text-accent flex items-center justify-center animate-bounce mb-2">
                    ✓
                  </div>
                  <h3 className="text-2xl font-extrabold text-text-primary font-heading">
                    Inquiry Submitted Successfully!
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-[40ch]">
                    Your request is securely stored in our CRM. To bypass phone queues and schedule your survey immediately, click the button below to send details via WhatsApp.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <a
                      href={getWaRedirectUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-success-whatsapp text-white font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                      style={{ backgroundColor: "var(--success)" }}
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Continue on WhatsApp</span>
                    </a>
                    
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-8 py-3.5 rounded-full border border-border-custom hover:bg-bg-secondary text-text-secondary font-semibold transition-all duration-300"
                    >
                      Fill Another Form
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Contact Info Card & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card p-6 bg-bg-secondary/15 space-y-6">
              <h3 className="text-lg font-bold text-text-primary font-heading border-b border-border-custom/40 pb-3">
                Business Information
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-text-primary font-bold">Office Address</span>
                    <span className="text-text-secondary leading-relaxed">{siteConfig.fullAddress}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-text-primary font-bold">Phone Connection</span>
                    <a href={`tel:${siteConfig.phone}`} className="text-text-secondary hover:text-accent transition-colors duration-300">
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-text-primary font-bold">Email Inbox</span>
                    <a href={`mailto:${siteConfig.email}`} className="text-text-secondary hover:text-accent transition-colors duration-300">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-text-primary font-bold">Operating Hours</span>
                    <span className="text-text-secondary leading-relaxed">{siteConfig.workingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map wrapper */}
            <div className="space-y-4">
              <OsmMap />
              <div className="flex gap-4">
                <a
                  href={siteConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-border-custom bg-bg-card hover:bg-bg-secondary text-text-primary text-xs font-bold transition-all duration-300"
                >
                  <MapPin className="h-4 w-4 text-accent" />
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
