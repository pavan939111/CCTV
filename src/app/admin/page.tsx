"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Phone, MessageCircle, Trash2, Search, Filter, Download, UserMinus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  cameras: string;
  message: string;
  status: "New" | "Contacted" | "Completed";
  timestamp: any;
};

const dashboardTranslations = {
  en: {
    title: "Leads Pipeline",
    subtitle: "Review, filter, and respond to incoming visual requests.",
    exportCsv: "Export to CSV",
    searchPlaceholder: "Search leads by name, phone, service, or locality...",
    filterAll: "All Inquiries",
    filterNew: "New Leads",
    filterContacted: "Contacted",
    filterCompleted: "Completed",
    loadingMsg: "Syncing live leads database...",
    noLeadsTitle: "No Leads Found",
    noLeadsSub: "There are no records matching your current filter settings.",
    cctvConfigDetails: "CCTV Config Details",
    callBtn: "Call",
    deleteTooltip: "Delete lead archive",
    waBtn: "WhatsApp",
    statusNew: "Status: New",
    statusContacted: "Status: Contacted",
    statusCompleted: "Status: Completed",
    confirmDelete: "Are you sure you want to permanently delete this lead?",
  },
  te: {
    title: "లీడ్స్ పైప్‌లైన్",
    subtitle: "వచ్చే అభ్యర్థనలను సమీక్షించండి, ఫిల్టర్ చేయండి మరియు స్పందించండి.",
    exportCsv: "CSVకి ఎగుమతి చేయి",
    searchPlaceholder: "పేరు, ఫోన్, సర్వీస్ లేదా ప్రాంతం ద్వారా వెతకండి...",
    filterAll: "అన్ని విచారణలు",
    filterNew: "కొత్త లీడ్స్",
    filterContacted: "సంప్రదించినవి",
    filterCompleted: "పూర్తయినవి",
    loadingMsg: "లైవ్ లీడ్స్ డేటాబేస్‌ను సమకాలీకరిస్తోంది...",
    noLeadsTitle: "లీడ్‌లు కనుగొనబడలేదు",
    noLeadsSub: "మీ ఫిల్టర్ సెట్టింగ్‌లకు సరిపోయే రికార్డులు ఏవీ లేవు.",
    cctvConfigDetails: "CCTV కాన్ఫిగ్ వివరాలు",
    callBtn: "కాల్",
    deleteTooltip: "లీడ్ రికార్డ్‌ను తొలగించండి",
    waBtn: "వాట్సాప్",
    statusNew: "స్థితి: కొత్తది",
    statusContacted: "స్థితి: సంప్రదించబడింది",
    statusCompleted: "స్థితి: పూర్తయింది",
    confirmDelete: "మీరు ఈ లీడ్‌ను శాశ్వతంగా తొలగించాలనుకుంటున్నారా?",
  }
};

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  
  const { language } = useLanguage();
  const t = dashboardTranslations[language] || dashboardTranslations.en;

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const items: Lead[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          name: data.name || "N/A",
          phone: data.phone || "N/A",
          email: data.email || "N/A",
          address: data.address || "N/A",
          service: data.service || "CCTV Installation",
          cameras: data.cameras || "1-4",
          message: data.message || "",
          status: data.status || "New",
          timestamp: data.timestamp ? data.timestamp.toDate() : new Date(),
        });
      });
      setLeads(items);
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (leadId: string, nextStatus: "New" | "Contacted" | "Completed") => {
    try {
      await updateDoc(doc(db, "leads", leadId), { status: nextStatus });
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === leadId ? { ...lead, status: nextStatus } : lead))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update pipeline status.");
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      await deleteDoc(doc(db, "leads", leadId));
      setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
    } catch (err) {
      console.error("Failed to delete lead:", err);
      alert("Failed to delete lead from record.");
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return alert("No leads available to export.");

    const headers = ["Inquiry Date", "Customer Name", "Phone", "Email", "Address", "Service Required", "Cameras", "Requirements", "Status"];
    
    const rows = leads.map(l => [
      l.timestamp.toLocaleDateString(),
      l.name,
      `="${l.phone}"`,
      l.email,
      l.address.replace(/,/g, " "),
      l.service,
      l.cameras,
      l.message.replace(/,/g, " ").replace(/\n/g, " "),
      l.status
    ]);

    const csvContent = 
      "data:text/csv;charset=utf-8," + 
      [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Nakshatra_CCTV_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getWaUrl = (lead: Lead) => {
    const text = `Hello ${lead.name}. Thank you for contacting Nakshatra CCTV Services. We received your inquiry regarding ${lead.service} for ${lead.cameras} cameras. When is a good time to schedule our free site survey?`;
    return `https://wa.me/${lead.phone.startsWith("+91") || lead.phone.startsWith("91") ? lead.phone : "91" + lead.phone}?text=${encodeURIComponent(text)}`;
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Dashboard Title & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold font-heading text-text-primary">{t.title}</h1>
          <p className="text-xs text-text-secondary mt-1">{t.subtitle}</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-accent/90 text-white text-xs font-semibold shadow-custom transition duration-300 self-start sm:self-auto active:scale-95 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          <span>{t.exportCsv}</span>
        </button>
      </div>

      {/* Filter & Search Bar Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        {/* Search */}
        <div className="sm:col-span-8 relative">
          <Search className="h-4 w-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-secondary/20 border border-border-custom text-text-primary placeholder-text-secondary/40 text-xs focus:outline-none focus:border-accent"
          />
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-4 relative">
          <Filter className="h-4 w-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-primary border border-border-custom text-text-primary text-xs focus:outline-none focus:border-accent appearance-none cursor-pointer"
          >
            <option value="All">{t.filterAll}</option>
            <option value="New">{t.filterNew}</option>
            <option value="Contacted">{t.filterContacted}</option>
            <option value="Completed">{t.filterCompleted}</option>
          </select>
        </div>
      </div>

      {/* Leads Listing */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center bg-bg-secondary/20 border border-border-custom rounded-2xl">
          <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs text-text-secondary">{t.loadingMsg}</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center bg-bg-secondary/20 border border-border-custom rounded-2xl text-center space-y-4">
          <div className="p-4 rounded-full bg-bg-secondary/30 border border-border-custom text-text-secondary">
            <UserMinus className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary">{t.noLeadsTitle}</h3>
            <p className="text-xs text-text-secondary max-w-[30ch] mx-auto mt-1">{t.noLeadsSub}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-bg-secondary/15 border border-border-custom rounded-xl p-5 hover:border-accent/40 transition duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Left Column: Lead General Info */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    lead.status === "New"
                      ? "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                      : lead.status === "Contacted"
                      ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                      : "bg-green-500/10 border border-green-500/20 text-green-400"
                  }`}>
                    {lead.status}
                  </span>
                  <span className="text-[10px] text-text-secondary font-bold font-mono">
                    {lead.timestamp.toLocaleString()}
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-text-primary leading-tight">
                  {lead.name}
                </h3>
                
                <div className="text-xs text-text-secondary space-y-1">
                  <p><span className="font-semibold text-text-primary/75">Phone:</span> {lead.phone}</p>
                  <p><span className="font-semibold text-text-primary/75">Email:</span> {lead.email}</p>
                  <p><span className="font-semibold text-text-primary/75">Address:</span> {lead.address}</p>
                </div>
              </div>

              {/* Middle Column: Requirements Description */}
              <div className="lg:col-span-5 space-y-2">
                <div className="space-y-1">
                  <span className="block text-[9px] uppercase tracking-wider font-bold text-text-secondary">{t.cctvConfigDetails}</span>
                  <p className="text-sm font-bold text-accent">
                    {lead.service} • {lead.cameras} Cameras
                  </p>
                </div>
                
                {lead.message && (
                  <div className="bg-bg-primary p-3 rounded-lg border border-border-custom/50 text-xs text-text-secondary leading-relaxed max-h-[100px] overflow-y-auto">
                    {lead.message}
                  </div>
                )}
              </div>

              {/* Right Column: Actions Pipeline Control */}
              <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-stretch h-full self-center">
                {/* Status Dropdown */}
                <div className="relative">
                  <select
                    value={lead.status}
                    onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent appearance-none cursor-pointer"
                  >
                    <option value="New">{t.statusNew}</option>
                    <option value="Contacted">{t.statusContacted}</option>
                    <option value="Completed">{t.statusCompleted}</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  {/* Call Direct */}
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-border-custom bg-bg-secondary/20 hover:bg-bg-secondary/40 text-text-primary text-xs font-semibold transition duration-300"
                    title="Dial customer number"
                  >
                    <Phone className="h-3.5 w-3.5 text-accent" />
                    <span>{t.callBtn}</span>
                  </a>

                  {/* WhatsApp Pre-filled chat */}
                  <a
                    href={getWaUrl(lead)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-success-whatsapp hover:bg-success-whatsapp/90 text-white text-xs font-semibold transition duration-300"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{t.waBtn}</span>
                  </a>

                  {/* Delete Lead */}
                  <button
                    onClick={() => handleDeleteLead(lead.id)}
                    className="p-2.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 transition duration-300 cursor-pointer"
                    title={t.deleteTooltip}
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
