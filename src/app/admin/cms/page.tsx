"use client";

import { useEffect, useState } from "react";
import { 
  collection, query, getDocs, addDoc, doc, setDoc,
  deleteDoc, updateDoc, serverTimestamp, orderBy 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Trash2, Check, X, Star, Camera, HardDrive, Pencil, Database } from "lucide-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useLanguage } from "@/context/LanguageContext";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

type Testimonial = {
  id: string;
  name: string;
  locality: string;
  text: string;
  rating: number;
  status: "pending" | "approved";
  date: string;
};

type GalleryItem = {
  id: string;
  title: string;
  location: string;
  image: string;
  desc: string;
  gridRef: string;
};

type ProductItem = {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  features: string[];
};

// Default seed structures (containing all products, testimonials, gallery, and primary details)
const defaultFaqs: FAQ[] = [
  {
    id: "default-faq-1",
    question: "How much does CCTV installation cost in Nalgonda?",
    answer: "The cost depends on camera types (analog/IP), quantities, and layout. A basic 4-camera High-Definition setup starts around ₹12,000–₹15,000, while digital IP setups start at ₹20,000.",
  },
  {
    id: "default-faq-2",
    question: "Which CCTV brand is the best for security?",
    answer: "We recommend CP Plus, Hikvision, and Dahua for residential and standard commercial properties. They offer high value, reliability, and excellent app support.",
  },
  {
    id: "default-faq-3",
    question: "Can I monitor my security cameras live on my mobile phone?",
    answer: "Yes, all modern configurations support remote cloud monitoring via official gCMOB, Hik-Connect, or DMSS apps on your smartphones and tablets.",
  },
];

const defaultGallery: GalleryItem[] = [
  {
    id: "default-gal-1",
    title: "Corporate Lobby Surveillance",
    location: "Nalgonda",
    image: "/images/cctv-lobby.png",
    desc: "Discrete ceiling dome camera installation offering 360-degree high-definition coverage of the main lobby entry.",
    gridRef: "SEC_LOBBY_01",
  },
  {
    id: "default-gal-2",
    title: "Residential Villa Camera Layout",
    location: "Suryapet",
    image: "/images/service-cctv-install.png",
    desc: "Premium outdoor weatherproof bullet cameras positioned to cover perimeter gates, driveways, and backyards.",
    gridRef: "PER_VILLA_04",
  },
];

const defaultProducts: ProductItem[] = [
  {
    id: "default-prod-1",
    name: "Premium 4K IP Bullet Camera",
    image: "/images/ip-camera.png",
    price: "3,499",
    description: "Enterprise-grade weatherproof bullet security camera featuring ultra-sharp 4K monitoring. Ideal for outdoor driveways, boundaries, and commercial sites.",
    features: [
      "4K Ultra HD Resolution",
      "AI Person & Vehicle Detection",
      "Power-over-Ethernet (PoE) Support",
    ],
  },
  {
    id: "default-prod-2",
    name: "Smart WiFi Pan-Tilt Camera",
    image: "/images/wifi-camera.png",
    price: "2,199",
    description: "Highly versatile smart wireless dome camera with full 360-degree pan-tilt control, real-time two-way audio, and direct smartphone notification alerts.",
    features: [
      "360° Rotatable Dome View",
      "Two-Way Real-time Audio",
      "Human Motion Tracking Alerts",
    ],
  },
  {
    id: "default-prod-3",
    name: "High-Def Vandal Dome Camera",
    image: "/images/dome-camera.png",
    price: "1,899",
    description: "Compact dome security camera designed for indoor rooms, offices, and retail lobbies. Outfitted with smart infrared lights for clear night vision.",
    features: [
      "5MP High-Resolution Sensor",
      "Weatherproof & Vandal-Resistant",
      "Smart Infrared Night Vision",
    ],
  },
  {
    id: "default-prod-4",
    name: "PTZ Speed Dome Camera",
    image: "/images/ptz-camera.png",
    price: "9,999",
    description: "Heavy-duty outdoor speed dome camera with 30x optical zoom capabilities, active tracking system locks, and long-range laser night illumination.",
    features: [
      "30x Optical Zoom Control",
      "Auto-Tracking Target Lock",
      "Long-Range Laser Night Vision",
    ],
  },
  {
    id: "default-prod-5",
    name: "Multi-Channel NVR Recorder",
    image: "/images/nvr.png",
    price: "6,499",
    description: "Centralized network video recorder for security video storage, managing up to 16 digital IP feeds with smart space-saving H.265+ compression.",
    features: [
      "H.265+ Smart Compression",
      "Supports Up to 16 Cameras",
      "Auto-Backup Cloud Logging",
    ],
  },
  {
    id: "default-prod-6",
    name: "CCTV Installation Accessories",
    image: "/images/accessories.png",
    price: "999",
    description: "High-grade components including solid copper Cat6 cabling, consolidated SMPS power distributors, and gold-plated BNC connectors.",
    features: [
      "Coaxial Cat6 Copper Cables",
      "Heavy-Duty SMPS Power Unit",
      "Shielded BNC/DC Connectors",
    ],
  },
];

const defaultTestimonialsSeed = [
  {
    name: "Rahul Verma",
    locality: "Clock Tower, Nalgonda",
    rating: 5,
    text: "Excellent service. The technicians arrived on time, mounted 8 bullet cameras, configured the NVR, and hid all cables behind conduits. Very neat work.",
    date: "Google Review",
    status: "approved"
  },
  {
    name: "Swati Reddy",
    locality: "Suryapet Road, Nalgonda",
    rating: 5,
    text: "My legacy DVR lost video feed on all channels. Nakshatra's engineer diagnosed the SMPS power supply issue and repaired it within an hour. Highly recommended.",
    date: "WhatsApp Feedback",
    status: "approved"
  },
  {
    name: "Kiran Kumar",
    locality: "Miryalaguda, Nalgonda",
    rating: 5,
    text: "Signed up for their commercial AMC for our retail showroom. Their monthly cleaning and camera health checkups have kept our systems 100% online.",
    date: "Google Review",
    status: "approved"
  }
];

const cmsTranslations = {
  en: {
    title: "Content CMS",
    subtitle: "Manage, add, and edit database records for landing page FAQs, reviews, gallery photos, and products.",
    initDb: "Initialize Database Now",
    populating: "Populating Firestore...",
    faqsTab: "Frequently Asked Questions (FAQs)",
    reviewsTab: "Customer Reviews",
    galleryTab: "Gallery Photos",
    productsTab: "Hardware Products",
  },
  te: {
    title: "కంటెంట్ CMS",
    subtitle: "ల్యాండింగ్ పేజీ తరచుగా అడిగే ప్రశ్నలు, సమీక్షలు, గ్యాలరీ ఫోటోలు మరియు ఉత్పత్తుల కోసం డేటాబేస్ రికార్డులను నిర్వహించండి, జోడించండి మరియు సవరించండి.",
    initDb: "డేటాబేస్ ప్రారంభించండి",
    populating: "ఫైర్‌స్టోర్ నింపుతోంది...",
    faqsTab: "తరచుగా అడిగే ప్రశ్నలు (FAQs)",
    reviewsTab: "కస్టమర్ సమీక్షలు",
    galleryTab: "గ్యాలరీ ఫోటోలు",
    productsTab: "హార్డ్‌వేర్ ఉత్పత్తులు",
  }
};

export default function CmsDashboard() {
  const { language } = useLanguage();
  const t = cmsTranslations[language] || cmsTranslations.en;
  const [activeSubTab, setActiveSubTab] = useState<"faqs" | "testimonials" | "gallery" | "products">("faqs");
  
  // FAQs States
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");
  const [faqsLoading, setFaqsLoading] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

  // Testimonials States
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testName, setTestName] = useState("");
  const [testLocality, setTestLocality] = useState("");
  const [testText, setTestText] = useState("");
  const [testRating, setTestRating] = useState(5);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);

  // Gallery States
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [galTitle, setGalTitle] = useState("");
  const [galLocation, setGalLocation] = useState("");
  const [galImage, setGalImage] = useState("");
  const [galDesc, setGalDesc] = useState("");
  const [galGridRef, setGalGridRef] = useState("");
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);

  // Products States
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodFeaturesRaw, setProdFeaturesRaw] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Pre-populate Loader State
  const [populating, setPopulating] = useState(false);

  // Fetch FAQs
  const fetchFaqs = async () => {
    setFaqsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "faqs"));
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          question: data.question || "",
          answer: data.answer || "",
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(0),
        });
      });
      items.sort((a, b) => b.timestamp - a.timestamp);
      setFaqs(items);
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    } finally {
      setFaqsLoading(false);
    }
  };

  // Fetch Testimonials
  const fetchTestimonials = async () => {
    setTestimonialsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          name: data.name || "",
          locality: data.locality || "",
          text: data.text || "",
          rating: data.rating || 5,
          status: data.status || "pending",
          date: data.date || "Verified Reviews",
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(0),
        });
      });
      items.sort((a, b) => b.timestamp - a.timestamp);
      setTestimonials(items);
    } catch (err) {
      console.error("Error fetching Testimonials:", err);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  // Fetch Gallery Items
  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          title: data.title || "",
          location: data.location || "",
          image: data.image || "",
          desc: data.desc || "",
          gridRef: data.gridRef || "",
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(0),
        });
      });
      items.sort((a, b) => b.timestamp - a.timestamp);
      setGallery(items);
    } catch (err) {
      console.error("Error fetching Gallery:", err);
    } finally {
      setGalleryLoading(false);
    }
  };

  // Fetch Products catalog
  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          name: data.name || "",
          image: data.image || "",
          price: data.price || "0",
          description: data.description || "",
          features: Array.isArray(data.features) ? data.features : [],
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(0),
        });
      });
      items.sort((a, b) => b.timestamp - a.timestamp);
      setProducts(items);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (activeSubTab === "faqs") fetchFaqs();
    if (activeSubTab === "testimonials") fetchTestimonials();
    if (activeSubTab === "gallery") fetchGallery();
    if (activeSubTab === "products") fetchProducts();
  }, [activeSubTab]);

  // Pre-populate default templates into Firestore (Seeds FAQs, Products, Gallery, Testimonials, Settings, and Sample Leads)
  const handlePrepopulate = async () => {
    if (!confirm("This will initialize all Firestore collections (Products, Gallery, Testimonials, FAQs, Site Settings, and Sample Leads). Proceed?")) return;
    setPopulating(true);
    try {
      // 1. Seed FAQs
      for (const faq of defaultFaqs) {
        await addDoc(collection(db, "faqs"), {
          question: faq.question,
          answer: faq.answer,
          timestamp: serverTimestamp(),
        });
      }

      // 2. Seed Gallery
      for (const item of defaultGallery) {
        await addDoc(collection(db, "gallery"), {
          title: item.title,
          location: item.location,
          image: item.image,
          desc: item.desc,
          gridRef: item.gridRef,
          timestamp: serverTimestamp(),
        });
      }

      // 3. Seed Products (Full 6 Catalog items)
      for (const prod of defaultProducts) {
        await addDoc(collection(db, "products"), {
          name: prod.name,
          price: prod.price,
          image: prod.image,
          description: prod.description,
          features: prod.features,
          timestamp: serverTimestamp(),
        });
      }

      // 4. Seed Testimonials (Reviews)
      for (const t of defaultTestimonialsSeed) {
        await addDoc(collection(db, "testimonials"), {
          name: t.name,
          locality: t.locality,
          rating: t.rating,
          text: t.text,
          date: t.date,
          status: t.status,
          timestamp: serverTimestamp(),
        });
      }

      // 5. Seed Primary Settings Document
      await setDoc(doc(db, "settings", "primary"), {
        phone: "+91 79815 77411",
        whatsappNumber: "917981577411",
        email: "info@nakshatracctv.com",
        fullAddress: "H.No: 5-4-12, Near Clock Tower, Nalgonda, Telangana - 508001",
        city: "Nalgonda",
        installationsCount: "1,500+",
        responseTime: "Within 2 Hours",
        supportAvailability: "24/7 Support",
        gstNumber: "36XXXXX1234F1Z5",
        workingHours: "9:00 AM - 8:00 PM",
        serviceAreas: ["Nalgonda", "Suryapet", "Miryalaguda", "Kodad", "Bhongir", "Nakrekal", "Devarakonda"],
        googleMapsLink: "https://maps.google.com"
      });

      // 6. Seed Sample Leads
      await addDoc(collection(db, "leads"), {
        name: "Pavan Kalyan",
        phone: "+91 99999 88888",
        email: "pavan@example.com",
        address: "Miryalaguda",
        service: "CCTV Installation",
        cameras: "4-8",
        message: "Requesting itemized quotation for 6 outdoor security cameras with active night vision.",
        status: "New",
        timestamp: serverTimestamp(),
      });
      await addDoc(collection(db, "leads"), {
        name: "Mahesh Babu",
        phone: "+91 88888 77777",
        email: "mahesh@example.com",
        address: "Suryapet",
        service: "CCTV Repair",
        cameras: "1-4",
        message: "Lobby camera shows black screen with video loss alert. Need technician repair inspection.",
        status: "Contacted",
        timestamp: serverTimestamp(),
      });

      alert("Firestore initialized successfully! All products, testimonials, FAQs, default site settings, and sample leads are now stored in your Firestore Database.");
      fetchFaqs();
      fetchGallery();
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      alert(`Seed failed. Verify login credentials and network connection: ${err.message}`);
    } finally {
      setPopulating(false);
    }
  };

  // Add or Edit FAQ
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;

    try {
      if (editingFaqId && !editingFaqId.startsWith("default-")) {
        // Edit Mode for live DB document
        await updateDoc(doc(db, "faqs", editingFaqId), {
          question: faqQuestion,
          answer: faqAnswer,
        });
      } else {
        // Add Mode (or Edit Mode for a static placeholder defaults)
        await addDoc(collection(db, "faqs"), {
          question: faqQuestion,
          answer: faqAnswer,
          timestamp: serverTimestamp(),
        });
      }
      setEditingFaqId(null);
      setFaqQuestion("");
      setFaqAnswer("");
      fetchFaqs();
    } catch (err) {
      console.error("Save FAQ failed:", err);
      alert("Failed to save FAQ item.");
    }
  };

  // Trigger Edit FAQ Mode
  const startEditFaq = (faq: FAQ) => {
    setEditingFaqId(faq.id);
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
  };

  // Cancel Edit FAQ Mode
  const cancelEditFaq = () => {
    setEditingFaqId(null);
    setFaqQuestion("");
    setFaqAnswer("");
  };

  // Delete FAQ
  const handleDeleteFaq = async (id: string) => {
    if (id.startsWith("default-")) {
      alert("Static default templates cannot be deleted from the database.");
      return;
    }
    if (!confirm("Delete this FAQ item?")) return;
    try {
      await deleteDoc(doc(db, "faqs", id));
      if (editingFaqId === id) cancelEditFaq();
      setFaqs(faqs.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete FAQ failed:", err);
    }
  };

  // Add Custom Testimonial
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !testText) return;

    try {
      await addDoc(collection(db, "testimonials"), {
        name: testName,
        locality: testLocality || "Nalgonda",
        text: testText,
        rating: Number(testRating),
        status: "approved",
        date: "Admin Uploaded",
        timestamp: serverTimestamp(),
      });
      setTestName("");
      setTestLocality("");
      setTestText("");
      setTestRating(5);
      fetchTestimonials();
    } catch (err) {
      console.error("Add Testimonial failed:", err);
    }
  };

  // Toggle Testimonial Approval
  const handleApproveTestimonial = async (id: string, currentStatus: "pending" | "approved") => {
    try {
      await updateDoc(doc(db, "testimonials", id), { status: currentStatus === "pending" ? "approved" : "pending" });
      fetchTestimonials();
    } catch (err) {
      console.error("Testimonial update status failed:", err);
    }
  };

  // Delete Testimonial
  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Permanently delete this testimonial?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete Testimonial failed:", err);
    }
  };

  // Add or Edit Gallery item
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle || !galImage) return;

    try {
      if (editingGalleryId && !editingGalleryId.startsWith("default-")) {
        // Edit Mode for live DB document
        await updateDoc(doc(db, "gallery", editingGalleryId), {
          title: galTitle,
          location: galLocation,
          image: galImage,
          desc: galDesc,
          gridRef: galGridRef,
        });
      } else {
        // Add Mode (or Edit Mode for a static placeholder defaults)
        await addDoc(collection(db, "gallery"), {
          title: galTitle,
          location: galLocation || "Nalgonda",
          image: galImage,
          desc: galDesc,
          gridRef: galGridRef || `PROJ_${Math.floor(10 + Math.random() * 90)}`,
          timestamp: serverTimestamp(),
        });
      }
      setEditingGalleryId(null);
      setGalTitle("");
      setGalLocation("");
      setGalImage("");
      setGalDesc("");
      setGalGridRef("");
      fetchGallery();
    } catch (err) {
      console.error("Save Gallery item failed:", err);
      alert("Failed to save gallery photo.");
    }
  };

  // Trigger Edit Gallery Mode
  const startEditGallery = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setGalTitle(item.title);
    setGalLocation(item.location);
    setGalImage(item.image);
    setGalDesc(item.desc);
    setGalGridRef(item.gridRef);
  };

  // Cancel Edit Gallery Mode
  const cancelEditGallery = () => {
    setEditingGalleryId(null);
    setGalTitle("");
    setGalLocation("");
    setGalImage("");
    setGalDesc("");
    setGalGridRef("");
  };

  // Delete Gallery item
  const handleDeleteGallery = async (id: string) => {
    if (id.startsWith("default-")) {
      alert("Static default templates cannot be deleted from the database.");
      return;
    }
    if (!confirm("Delete this gallery photo record?")) return;
    try {
      await deleteDoc(doc(db, "gallery", id));
      if (editingGalleryId === id) cancelEditGallery();
      setGallery(gallery.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete Gallery failed:", err);
    }
  };

  // Add or Edit Hardware Product item
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodImage) return;

    const features = prodFeaturesRaw.split(",").map((f) => f.trim()).filter(Boolean);

    try {
      if (editingProductId && !editingProductId.startsWith("default-")) {
        // Edit Mode for live DB document
        await updateDoc(doc(db, "products", editingProductId), {
          name: prodName,
          price: prodPrice,
          image: prodImage,
          description: prodDesc,
          features: features,
        });
      } else {
        // Add Mode (or Edit Mode for a static placeholder defaults)
        await addDoc(collection(db, "products"), {
          name: prodName,
          price: prodPrice,
          image: prodImage,
          description: prodDesc,
          features: features,
          timestamp: serverTimestamp(),
        });
      }
      setEditingProductId(null);
      setProdName("");
      setProdPrice("");
      setProdImage("");
      setProdDesc("");
      setProdFeaturesRaw("");
      fetchProducts();
    } catch (err) {
      console.error("Save Product failed:", err);
      alert("Failed to save hardware product.");
    }
  };

  // Trigger Edit Product Mode
  const startEditProduct = (item: ProductItem) => {
    setEditingProductId(item.id);
    setProdName(item.name);
    setProdPrice(item.price);
    setProdImage(item.image);
    setProdDesc(item.description);
    setProdFeaturesRaw(item.features.join(", "));
  };

  // Cancel Edit Product Mode
  const cancelEditProduct = () => {
    setEditingProductId(null);
    setProdName("");
    setProdPrice("");
    setProdImage("");
    setProdDesc("");
    setProdFeaturesRaw("");
  };

  // Delete Hardware Product item
  const handleDeleteProduct = async (id: string) => {
    if (id.startsWith("default-")) {
      alert("Static default templates cannot be deleted from the database.");
      return;
    }
    if (!confirm("Delete this hardware product record from inventory?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      if (editingProductId === id) cancelEditProduct();
      setProducts(products.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete Product failed:", err);
    }
  };

  // Compute displayed elements (inject defaults if DB collections are empty)
  const displayedFaqs = faqs.length > 0 ? faqs : defaultFaqs;
  const displayedGallery = gallery.length > 0 ? gallery : defaultGallery;
  const displayedProducts = products.length > 0 ? products : defaultProducts;

  const showInitializeBanner = faqs.length === 0 || gallery.length === 0 || products.length === 0;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-text-primary">{t.title}</h1>
          <p className="text-xs text-text-secondary mt-1">{t.subtitle}</p>
        </div>
      </div>

      {/* Selector Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-border-custom pb-4">
        <button
          onClick={() => setActiveSubTab("faqs")}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === "faqs"
              ? "bg-accent text-white"
              : "bg-bg-secondary/40 hover:bg-bg-secondary/60 text-text-secondary hover:text-text-primary"
          }`}
        >
          {t.faqsTab}
        </button>
        <button
          onClick={() => setActiveSubTab("testimonials")}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === "testimonials"
              ? "bg-accent text-white"
              : "bg-bg-secondary/40 hover:bg-bg-secondary/60 text-text-secondary hover:text-text-primary"
          }`}
        >
          {t.reviewsTab}
        </button>
        <button
          onClick={() => setActiveSubTab("gallery")}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === "gallery"
              ? "bg-accent text-white"
              : "bg-bg-secondary/40 hover:bg-bg-secondary/60 text-text-secondary hover:text-text-primary"
          }`}
        >
          {t.galleryTab}
        </button>
        <button
          onClick={() => setActiveSubTab("products")}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === "products"
              ? "bg-accent text-white"
              : "bg-bg-secondary/40 hover:bg-bg-secondary/60 text-text-secondary hover:text-text-primary"
          }`}
        >
          {t.productsTab}
        </button>
      </div>

      {/* FAQs Panel */}
      {activeSubTab === "faqs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Form */}
          <div className="lg:col-span-4 bg-bg-secondary/20 border border-border-custom rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary border-b border-border-custom/50 pb-2">
              {editingFaqId 
                ? editingFaqId.startsWith("default-") 
                  ? "Edit Template FAQ (Saves as Live DB Post)" 
                  : "Edit FAQ Item" 
                : "Add New FAQ"
              }
            </h2>
            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Question</label>
                <input
                  type="text"
                  required
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="e.g. Do you support wireless camera connections?"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Answer Description</label>
                <textarea
                  required
                  rows={4}
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Provide a detailed solution or policy answer..."
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent hover:bg-accent-glow text-text-primary font-semibold rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {editingFaqId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  <span>{editingFaqId ? editingFaqId.startsWith("default-") ? "Save as Live FAQ" : "Update FAQ" : "Save FAQ Item"}</span>
                </button>
                {editingFaqId && (
                  <button
                    type="button"
                    onClick={cancelEditFaq}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-text-primary font-semibold rounded transition cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* FAQ Listing */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Active FAQ Overrides</h2>
              {faqs.length === 0 && (
                <span className="text-[9px] uppercase tracking-wider font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded animate-pulse">
                  Showing Default Templates
                </span>
              )}
            </div>
            {faqsLoading ? (
              <div className="p-10 flex flex-col items-center justify-center bg-bg-secondary/20 border border-border-custom rounded-xl">
                <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-3">
                {displayedFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`p-4 border rounded-lg flex items-start justify-between gap-4 transition duration-300 ${
                      editingFaqId === faq.id 
                        ? "border-accent bg-accent/5" 
                        : "bg-bg-secondary/20 border-border-custom"
                    }`}
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-text-primary leading-tight">{faq.question}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => startEditFaq(faq)}
                        className="p-2 border border-border-custom bg-bg-secondary/40 hover:bg-bg-secondary/60 text-text-primary rounded transition cursor-pointer"
                        title="Edit FAQ"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        disabled={faq.id.startsWith("default-")}
                        className="p-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded transition cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                        title="Delete FAQ"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Testimonials Panel */}
      {activeSubTab === "testimonials" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Testimonial Add Form */}
          <div className="lg:col-span-4 bg-bg-secondary/20 border border-border-custom rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary border-b border-border-custom/50 pb-2">Add Review</h2>
            <form onSubmit={handleAddTestimonial} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Client Name</label>
                <input
                  type="text"
                  required
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Locality / Suburb</label>
                <input
                  type="text"
                  value={testLocality}
                  onChange={(e) => setTestLocality(e.target.value)}
                  placeholder="e.g. Nalgonda"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Rating Stars</label>
                <select
                  value={testRating}
                  onChange={(e) => setTestRating(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent appearance-none cursor-pointer"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Good)</option>
                  <option value={3}>3 Stars (Average)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Feedback Description</label>
                <textarea
                  required
                  rows={4}
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  placeholder="Quote the client's actual feedback details..."
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-accent hover:bg-accent-glow text-text-primary font-semibold rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Save Review</span>
              </button>
            </form>
          </div>

          {/* Testimonial Listing */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Customer Reviews Overrides</h2>
            {testimonialsLoading ? (
              <div className="p-10 flex flex-col items-center justify-center bg-bg-secondary/20 border border-border-custom rounded-xl">
                <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : testimonials.length === 0 ? (
              <p className="text-xs text-text-secondary italic p-6 bg-bg-secondary/20 border border-border-custom rounded-xl">
                No custom testimonials found. The landing page will automatically render pre-filled Google sample reviews.
              </p>
            ) : (
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 bg-bg-secondary/20 border border-border-custom rounded-lg flex items-start justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          t.status === "approved"
                            ? "bg-green-500/10 border border-green-500/20 text-green-400"
                            : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                        }`}>
                          {t.status}
                        </span>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-xs text-text-primary leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                      
                      <div className="text-[10px] text-text-secondary">
                        <span className="font-bold text-text-primary/70">{t.name}</span> • {t.locality} • {t.date}
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {/* Approve / Reject Toggle Button */}
                      <button
                        onClick={() => handleApproveTestimonial(t.id, t.status)}
                        className={`p-2 border rounded transition cursor-pointer ${
                          t.status === "approved"
                            ? "border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-400"
                            : "border-green-500/20 bg-green-500/5 hover:bg-green-500/10 text-green-400"
                        }`}
                        title={t.status === "approved" ? "Move to Pending" : "Approve review"}
                      >
                        {t.status === "approved" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="p-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded transition cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gallery Panel */}
      {activeSubTab === "gallery" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gallery Form */}
          <div className="lg:col-span-4 bg-bg-secondary/20 border border-border-custom rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary border-b border-border-custom/50 pb-2">
              {editingGalleryId 
                ? editingGalleryId.startsWith("default-") 
                  ? "Edit Template Image (Saves as Live DB Post)"
                  : "Edit Installation Photo" 
                : "Add Installation Photo"
              }
            </h2>
            <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Project Title</label>
                <input
                  type="text"
                  required
                  value={galTitle}
                  onChange={(e) => setGalTitle(e.target.value)}
                  placeholder="e.g. Retail Counter Security Setup"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Locality / Suburb</label>
                <input
                  type="text"
                  required
                  value={galLocation}
                  onChange={(e) => setGalLocation(e.target.value)}
                  placeholder="e.g. Miryalaguda"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Image URL / Path</label>
                <input
                  type="text"
                  required
                  value={galImage}
                  onChange={(e) => setGalImage(e.target.value)}
                  placeholder="e.g. /images/cctv-lobby.png"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent font-sans"
                />
                <span className="block text-[9px] text-text-secondary font-bold uppercase tracking-wider">Or upload file directly:</span>
                <ImageUploader onUploadComplete={(url) => setGalImage(url)} folder="gallery" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Grid Reference / Telemetry Code</label>
                <input
                  type="text"
                  value={galGridRef}
                  onChange={(e) => setGalGridRef(e.target.value)}
                  placeholder="e.g. SEC_LOBBY_01 (optional)"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Project Description</label>
                <textarea
                  rows={3}
                  value={galDesc}
                  onChange={(e) => setGalDesc(e.target.value)}
                  placeholder="Description of camera type, resolution, NVR configurations used..."
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-grow py-2 bg-accent hover:bg-accent-glow text-text-primary font-semibold rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {editingGalleryId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  <span>{editingGalleryId ? editingGalleryId.startsWith("default-") ? "Save as Live Photo" : "Update Photo" : "Save Gallery Photo"}</span>
                </button>
                {editingGalleryId && (
                  <button
                    type="button"
                    onClick={cancelEditGallery}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-text-primary font-semibold rounded transition cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Gallery Listing */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Active Gallery Photos</h2>
              {gallery.length === 0 && (
                <span className="text-[9px] uppercase tracking-wider font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded animate-pulse">
                  Showing Default Templates
                </span>
              )}
            </div>
            {galleryLoading ? (
              <div className="p-10 flex flex-col items-center justify-center bg-bg-secondary/20 border border-border-custom rounded-xl">
                <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayedGallery.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-bg-secondary/20 border rounded-xl overflow-hidden flex flex-col justify-between transition duration-300 ${
                      editingGalleryId === item.id 
                        ? "border-accent ring-1 ring-accent" 
                        : "border-border-custom"
                    }`}
                  >
                    <div className="relative w-full h-[150px] bg-bg-primary">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[9px] font-bold font-mono text-accent">
                          <span>{item.location}</span>
                          <span className="text-text-secondary">{item.gridRef}</span>
                        </div>
                        <h4 className="text-xs font-bold text-text-primary tracking-wide leading-snug font-heading">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-border-custom/50 flex justify-end gap-2">
                        <button
                          onClick={() => startEditGallery(item)}
                          className="p-2 border border-border-custom bg-bg-secondary/40 hover:bg-bg-secondary/60 text-text-primary rounded transition flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                        >
                          <Pencil className="h-3.5 w-3.5 text-accent" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(item.id)}
                          disabled={item.id.startsWith("default-")}
                          className="p-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded transition flex items-center gap-1 text-[10px] font-bold cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Products Panel */}
      {activeSubTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Product Form */}
          <div className="lg:col-span-4 bg-bg-secondary/20 border border-border-custom rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary border-b border-border-custom/50 pb-2">
              {editingProductId 
                ? editingProductId.startsWith("default-") 
                  ? "Edit Template Product (Saves as Live DB Post)"
                  : "Edit Hardware Product" 
                : "Add Hardware Product"
              }
            </h2>
            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Product Name</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. 5MP Full-Color Dome Camera"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Starting Price (INR, no symbols)</label>
                <input
                  type="text"
                  required
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  placeholder="e.g. 2,499"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Image URL / Path</label>
                <input
                  type="text"
                  required
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="e.g. /images/dome-camera.png"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent font-sans"
                />
                <span className="block text-[9px] text-text-secondary font-bold uppercase tracking-wider">Or upload file directly:</span>
                <ImageUploader onUploadComplete={(url) => setProdImage(url)} folder="products" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Key Features (Comma separated)</label>
                <input
                  type="text"
                  value={prodFeaturesRaw}
                  onChange={(e) => setProdFeaturesRaw(e.target.value)}
                  placeholder="e.g. Smart Night Vision, AI Face Tracking, Weatherproof"
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Product Description</label>
                <textarea
                  required
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Provide detailed description of sensor specs, optics, night range, and compatibility..."
                  className="w-full px-3 py-2 bg-bg-primary border border-border-custom rounded text-text-primary focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-grow py-2 bg-accent hover:bg-accent-glow text-text-primary font-semibold rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {editingProductId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  <span>{editingProductId ? editingProductId.startsWith("default-") ? "Save as Live Product" : "Update Product" : "Save Hardware Product"}</span>
                </button>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={cancelEditProduct}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-text-primary font-semibold rounded transition cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Product Listing */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">Active Product Catalog</h2>
              {products.length === 0 && (
                <span className="text-[9px] uppercase tracking-wider font-bold bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded animate-pulse">
                  Showing Default Templates
                </span>
              )}
            </div>
            {productsLoading ? (
              <div className="p-10 flex flex-col items-center justify-center bg-bg-secondary/20 border border-border-custom rounded-xl">
                <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayedProducts.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-bg-secondary/20 border rounded-xl overflow-hidden flex flex-col justify-between transition duration-300 ${
                      editingProductId === item.id 
                        ? "border-accent ring-1 ring-accent" 
                        : "border-border-custom"
                    }`}
                  >
                    <div className="relative w-full h-[140px] bg-bg-primary">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-bold text-accent">
                          <span>Starting at ₹{item.price}</span>
                        </div>
                        <h4 className="text-xs font-bold text-text-primary tracking-wide font-heading">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-border-custom/50 flex justify-end gap-2">
                        <button
                          onClick={() => startEditProduct(item)}
                          className="p-2 border border-border-custom bg-bg-secondary/40 hover:bg-bg-secondary/60 text-text-primary rounded transition flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          disabled={item.id.startsWith("default-")}
                          className="p-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded transition flex items-center gap-1 text-[10px] font-bold cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* Image File Uploader Component using Firebase Storage */
function ImageUploader({ 
  onUploadComplete, 
  folder = "uploads" 
}: { 
  onUploadComplete: (url: string) => void;
  folder?: string;
}) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setProgress(10);

    // 1. Render thumbnail preview locally immediately
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // 2. Prepare Form payload
      const formData = new FormData();
      formData.append("file", file);

      // Simulate loading increments
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 85 ? prev + 15 : prev));
      }, 100);

      // 3. Post to api upload route handler
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "CDN Upload failed.");
      }

      const result = await res.json();
      setProgress(100);
      onUploadComplete(result.url); // secure_url returned by Cloudinary
      setUploading(false);
    } catch (err: any) {
      console.error("Cloudinary upload failed:", err);
      setError(err.message || "Failed to upload image. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2 border border-border-custom p-3 rounded bg-bg-primary text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
          className="text-[10px] text-text-secondary file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-white/10 file:text-text-primary hover:file:bg-white/20 cursor-pointer max-w-full"
        />
        {preview && (
          <div className="h-8 w-8 rounded overflow-hidden border border-border-custom shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          </div>
        )}
      </div>
      {uploading && (
        <div className="space-y-1">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-accent h-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[9px] text-text-secondary block">Processing: {progress}%</span>
        </div>
      )}
      {error && <span className="text-[10px] text-red-400 block">{error}</span>}
    </div>
  );
}
