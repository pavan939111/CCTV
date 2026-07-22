"use client";

import { useEffect, useState } from "react";
import { 
  collection, query, getDocs, addDoc, doc, 
  deleteDoc, updateDoc, serverTimestamp, orderBy 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Trash2, Check, X, Star, Camera, HardDrive, Pencil } from "lucide-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

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

export default function CmsDashboard() {
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

  // Fetch FAQs
  const fetchFaqs = async () => {
    setFaqsLoading(true);
    try {
      const querySnapshot = await getDocs(query(collection(db, "faqs"), orderBy("timestamp", "desc")));
      const items: FAQ[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          question: data.question || "",
          answer: data.answer || "",
        });
      });
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
      const querySnapshot = await getDocs(query(collection(db, "testimonials"), orderBy("timestamp", "desc")));
      const items: Testimonial[] = [];
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
        });
      });
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
      const querySnapshot = await getDocs(query(collection(db, "gallery"), orderBy("timestamp", "desc")));
      const items: GalleryItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          title: data.title || "",
          location: data.location || "",
          image: data.image || "",
          desc: data.desc || "",
          gridRef: data.gridRef || "",
        });
      });
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
      const querySnapshot = await getDocs(query(collection(db, "products"), orderBy("timestamp", "desc")));
      const items: ProductItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          name: data.name || "",
          image: data.image || "",
          price: data.price || "0",
          description: data.description || "",
          features: Array.isArray(data.features) ? data.features : [],
        });
      });
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

  // Add or Edit FAQ
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;

    try {
      if (editingFaqId) {
        // Edit Mode
        await updateDoc(doc(db, "faqs", editingFaqId), {
          question: faqQuestion,
          answer: faqAnswer,
        });
        setEditingFaqId(null);
      } else {
        // Add Mode
        await addDoc(collection(db, "faqs"), {
          question: faqQuestion,
          answer: faqAnswer,
          timestamp: serverTimestamp(),
        });
      }
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
    const nextStatus = currentStatus === "pending" ? "approved" : "pending";
    try {
      await updateDoc(doc(db, "testimonials", id), { status: nextStatus });
      setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)));
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
      if (editingGalleryId) {
        // Edit Mode
        await updateDoc(doc(db, "gallery", editingGalleryId), {
          title: galTitle,
          location: galLocation,
          image: galImage,
          desc: galDesc,
          gridRef: galGridRef,
        });
        setEditingGalleryId(null);
      } else {
        // Add Mode
        await addDoc(collection(db, "gallery"), {
          title: galTitle,
          location: galLocation || "Nalgonda",
          image: galImage,
          desc: galDesc,
          gridRef: galGridRef || `PROJ_${Math.floor(10 + Math.random() * 90)}`,
          timestamp: serverTimestamp(),
        });
      }
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
      if (editingProductId) {
        // Edit Mode
        await updateDoc(doc(db, "products", editingProductId), {
          name: prodName,
          price: prodPrice,
          image: prodImage,
          description: prodDesc,
          features: features,
        });
        setEditingProductId(null);
      } else {
        // Add Mode
        await addDoc(collection(db, "products"), {
          name: prodName,
          price: prodPrice,
          image: prodImage,
          description: prodDesc,
          features: features,
          timestamp: serverTimestamp(),
        });
      }
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
    if (!confirm("Delete this hardware product record from inventory?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      if (editingProductId === id) cancelEditProduct();
      setProducts(products.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete Product failed:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-white">Content CMS</h1>
        <p className="text-xs text-[#94A3B8] mt-1">Manage, add, and edit database records for landing page FAQs, reviews, gallery photos, and products.</p>
      </div>

      {/* Selector Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveSubTab("faqs")}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === "faqs"
              ? "bg-accent text-white"
              : "bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white"
          }`}
        >
          Frequently Asked Questions (FAQs)
        </button>
        <button
          onClick={() => setActiveSubTab("testimonials")}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === "testimonials"
              ? "bg-accent text-white"
              : "bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white"
          }`}
        >
          Customer Reviews
        </button>
        <button
          onClick={() => setActiveSubTab("gallery")}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === "gallery"
              ? "bg-accent text-white"
              : "bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white"
          }`}
        >
          Gallery Photos
        </button>
        <button
          onClick={() => setActiveSubTab("products")}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === "products"
              ? "bg-accent text-white"
              : "bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white"
          }`}
        >
          Hardware Products
        </button>
      </div>

      {/* FAQs Panel */}
      {activeSubTab === "faqs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Form */}
          <div className="lg:col-span-4 bg-white/3 border border-white/10 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">
              {editingFaqId ? "Edit FAQ Item" : "Add New FAQ"}
            </h2>
            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Question</label>
                <input
                  type="text"
                  required
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="e.g. Do you support wireless camera connections?"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Answer Description</label>
                <textarea
                  required
                  rows={4}
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Provide a detailed solution or policy answer..."
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent hover:bg-accent-glow text-white font-semibold rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {editingFaqId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  <span>{editingFaqId ? "Update FAQ" : "Save FAQ Item"}</span>
                </button>
                {editingFaqId && (
                  <button
                    type="button"
                    onClick={cancelEditFaq}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded transition cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* FAQ Listing */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Active FAQ Overrides</h2>
            {faqsLoading ? (
              <div className="p-10 flex flex-col items-center justify-center bg-white/3 border border-white/10 rounded-xl">
                <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : faqs.length === 0 ? (
              <p className="text-xs text-[#94A3B8] italic p-6 bg-white/3 border border-white/10 rounded-xl">
                No custom FAQs found in Firestore. Default fallback queries will render on the landing page.
              </p>
            ) : (
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`p-4 border rounded-lg flex items-start justify-between gap-4 transition duration-300 ${
                      editingFaqId === faq.id 
                        ? "border-accent bg-accent/5" 
                        : "bg-white/3 border-white/10"
                    }`}
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white leading-tight">{faq.question}</h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => startEditFaq(faq)}
                        className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded transition cursor-pointer"
                        title="Edit FAQ"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded transition cursor-pointer"
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
          <div className="lg:col-span-4 bg-white/3 border border-white/10 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">Add Review</h2>
            <form onSubmit={handleAddTestimonial} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Client Name</label>
                <input
                  type="text"
                  required
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Locality / Suburb</label>
                <input
                  type="text"
                  value={testLocality}
                  onChange={(e) => setTestLocality(e.target.value)}
                  placeholder="e.g. Nalgonda"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Rating Stars</label>
                <select
                  value={testRating}
                  onChange={(e) => setTestRating(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent appearance-none cursor-pointer"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Good)</option>
                  <option value={3}>3 Stars (Average)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Feedback Description</label>
                <textarea
                  required
                  rows={4}
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  placeholder="Quote the client's actual feedback details..."
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-accent hover:bg-accent-glow text-white font-semibold rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Save Review</span>
              </button>
            </form>
          </div>

          {/* Testimonial Listing */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Customer Reviews Overrides</h2>
            {testimonialsLoading ? (
              <div className="p-10 flex flex-col items-center justify-center bg-white/3 border border-white/10 rounded-xl">
                <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : testimonials.length === 0 ? (
              <p className="text-xs text-[#94A3B8] italic p-6 bg-white/3 border border-white/10 rounded-xl">
                No custom testimonials found. The landing page will automatically render pre-filled Google sample reviews.
              </p>
            ) : (
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 bg-white/3 border border-white/10 rounded-lg flex items-start justify-between gap-4"
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
                      
                      <p className="text-xs text-white leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                      
                      <div className="text-[10px] text-[#94A3B8]">
                        <span className="font-bold text-white/70">{t.name}</span> • {t.locality} • {t.date}
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
          <div className="lg:col-span-4 bg-white/3 border border-white/10 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">
              {editingGalleryId ? "Edit Installation Photo" : "Add Installation Photo"}
            </h2>
            <form onSubmit={handleSaveGallery} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Project Title</label>
                <input
                  type="text"
                  required
                  value={galTitle}
                  onChange={(e) => setGalTitle(e.target.value)}
                  placeholder="e.g. Retail Counter Security Setup"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Locality / Suburb</label>
                <input
                  type="text"
                  required
                  value={galLocation}
                  onChange={(e) => setGalLocation(e.target.value)}
                  placeholder="e.g. Miryalaguda"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Image URL / Path</label>
                <input
                  type="text"
                  required
                  value={galImage}
                  onChange={(e) => setGalImage(e.target.value)}
                  placeholder="e.g. /images/cctv-lobby.png"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent font-sans"
                />
                <span className="block text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Or upload file directly:</span>
                <ImageUploader onUploadComplete={(url) => setGalImage(url)} folder="gallery" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Grid Reference / Telemetry Code</label>
                <input
                  type="text"
                  value={galGridRef}
                  onChange={(e) => setGalGridRef(e.target.value)}
                  placeholder="e.g. SEC_LOBBY_01 (optional)"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Project Description</label>
                <textarea
                  rows={3}
                  value={galDesc}
                  onChange={(e) => setGalDesc(e.target.value)}
                  placeholder="Description of camera type, resolution, NVR configurations used..."
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-grow py-2 bg-accent hover:bg-accent-glow text-white font-semibold rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {editingGalleryId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  <span>{editingGalleryId ? "Update Photo" : "Save Gallery Photo"}</span>
                </button>
                {editingGalleryId && (
                  <button
                    type="button"
                    onClick={cancelEditGallery}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded transition cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Gallery Listing */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Active Gallery Photos</h2>
            {galleryLoading ? (
              <div className="p-10 flex flex-col items-center justify-center bg-white/3 border border-white/10 rounded-xl">
                <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : gallery.length === 0 ? (
              <p className="text-xs text-[#94A3B8] italic p-6 bg-white/3 border border-white/10 rounded-xl">
                No custom gallery photos found in database. Pre-filled installation mocks will display on page.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white/3 border rounded-xl overflow-hidden flex flex-col justify-between transition duration-300 ${
                      editingGalleryId === item.id 
                        ? "border-accent ring-1 ring-accent" 
                        : "border-white/10"
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
                          <span className="text-[#94A3B8]">{item.gridRef}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white tracking-wide leading-snug font-heading">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-[#94A3B8] leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex justify-end gap-2">
                        <button
                          onClick={() => startEditGallery(item)}
                          className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded transition flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                        >
                          <Pencil className="h-3.5 w-3.5 text-accent" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(item.id)}
                          className="p-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded transition flex items-center gap-1 text-[10px] font-bold cursor-pointer"
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
          <div className="lg:col-span-4 bg-white/3 border border-white/10 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2">
              {editingProductId ? "Edit Hardware Product" : "Add Hardware Product"}
            </h2>
            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Product Name</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. 5MP Full-Color Dome Camera"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Starting Price (INR, no symbols)</label>
                <input
                  type="text"
                  required
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  placeholder="e.g. 2,499"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Image URL / Path</label>
                <input
                  type="text"
                  required
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="e.g. /images/dome-camera.png"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent font-sans"
                />
                <span className="block text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Or upload file directly:</span>
                <ImageUploader onUploadComplete={(url) => setProdImage(url)} folder="products" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Key Features (Comma separated)</label>
                <input
                  type="text"
                  value={prodFeaturesRaw}
                  onChange={(e) => setProdFeaturesRaw(e.target.value)}
                  placeholder="e.g. Smart Night Vision, AI Face Tracking, Weatherproof"
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Product Description</label>
                <textarea
                  required
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Provide detailed description of sensor specs, optics, night range, and compatibility..."
                  className="w-full px-3 py-2 bg-[#0B1220] border border-white/10 rounded text-white focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-grow py-2 bg-accent hover:bg-accent-glow text-white font-semibold rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {editingProductId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  <span>{editingProductId ? "Update Product" : "Save Hardware Product"}</span>
                </button>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={cancelEditProduct}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded transition cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Product Listing */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Active Product Catalog</h2>
            {productsLoading ? (
              <div className="p-10 flex flex-col items-center justify-center bg-white/3 border border-white/10 rounded-xl">
                <div className="h-6 w-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : products.length === 0 ? (
              <p className="text-xs text-[#94A3B8] italic p-6 bg-white/3 border border-white/10 rounded-xl">
                No custom products found in database. Pre-filled catalog list will display on landing page.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white/3 border rounded-xl overflow-hidden flex flex-col justify-between transition duration-300 ${
                      editingProductId === item.id 
                        ? "border-accent ring-1 ring-accent" 
                        : "border-white/10"
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
                        <h4 className="text-xs font-bold text-white tracking-wide font-heading">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-[#94A3B8] leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex justify-end gap-2">
                        <button
                          onClick={() => startEditProduct(item)}
                          className="p-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded transition flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                        >
                          <Pencil className="h-3.5 w-3.5 text-accent" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          className="p-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded transition flex items-center gap-1 text-[10px] font-bold cursor-pointer"
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
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setError("");
    setProgress(0);

    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percent);
      },
      (err) => {
        console.error("Upload error:", err);
        setError("Upload failed. Verify storage bucket permissions in Firebase console.");
        setUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadComplete(downloadURL);
          setUploading(false);
          setFile(null);
          setProgress(0);
        } catch (e) {
          setError("Failed to retrieve image URL.");
          setUploading(false);
        }
      }
    );
  };

  return (
    <div className="space-y-2 border border-white/10 p-3 rounded bg-[#0B1220] text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-[10px] text-[#94A3B8] file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer max-w-full"
        />
        {file && !uploading && (
          <button 
            type="button" 
            onClick={handleUpload}
            className="px-3 py-1 bg-accent hover:bg-accent-glow text-white text-[10px] rounded font-bold cursor-pointer transition shrink-0"
          >
            Upload
          </button>
        )}
      </div>
      {uploading && (
        <div className="space-y-1">
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-accent h-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[9px] text-[#94A3B8] block">Uploading: {progress}%</span>
        </div>
      )}
      {error && <span className="text-[10px] text-red-400 block">{error}</span>}
    </div>
  );
}
