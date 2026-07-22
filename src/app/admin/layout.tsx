"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { 
  Lock, LayoutDashboard, Database, Settings, LogOut, 
  Menu, X, Eye, ShieldCheck 
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";

const adminTranslations = {
  en: {
    leadsPipeline: "Leads Pipeline",
    contentCms: "Content CMS",
    globalSettings: "Global Settings",
    activeAdmin: "Active Admin",
    signOut: "Sign Out",
    authLoadingMsg: "Verifying CRM Session...",
    loginTitle: "Nakshatra CRM Login",
    loginSub: "Authorized administrators only",
    emailLabel: "Admin Email",
    passwordLabel: "Security Password",
    accessBtn: "Access Dashboard",
    returnBtn: "← Return to website",
    activeAdminLabel: "Active Admin",
    controlPanelLabel: "Control Panel v1.0",
    signUpTitle: "Register Admin Account",
    signUpSub: "Create new authorized database credentials",
    signUpLink: "Register Admin Credentials (First Time Sign Up)",
    signInLink: "Already have an account? Sign In",
  },
  te: {
    leadsPipeline: "లీడ్స్ పైప్‌లైన్",
    contentCms: "కంటెంట్ CMS",
    globalSettings: "గ్లోబల్ సెట్టింగులు",
    activeAdmin: "క్రియాశీల అడ్మిన్",
    signOut: "లాగ్ అవుట్",
    authLoadingMsg: "CRM సెషన్‌ను ధృవీకరిస్తోంది...",
    loginTitle: "నక్షత్ర CRM లాగిన్",
    loginSub: "అధికారిక నిర్వాహకులు మాత్రమే",
    emailLabel: "అడ్మిన్ ఈమెయిల్",
    passwordLabel: "భద్రతా పాస్‌వర్డ్",
    accessBtn: "డాష్‌బోర్డ్ యాక్సెస్",
    returnBtn: "← వెబ్‌సైట్‌కి తిరిగి వెళ్ళు",
    activeAdminLabel: "క్రియాశీల అడ్మిన్",
    controlPanelLabel: "కంట్రోల్ ప్యానెల్ v1.0",
    signUpTitle: "నిర్వాహక ఖాతా నమోదు",
    signUpSub: "కొత్త అధికారిక డేటాబేస్ ఆధారాలను సృష్టించండి",
    signUpLink: "నిర్వాహక ఆధారాలను నమోదు చేయండి (మొదటి సారి సైన్ అప్)",
    signInLink: "ఇప్పటికే ఖాతా ఉందా? సైన్ ఇన్ చేయండి",
  }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Login Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { language } = useLanguage();
  const t = adminTranslations[language] || adminTranslations.en;

  useEffect(() => {
    // Listen for Auth changes
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error(err);
      if (isSignUp) {
        setLoginError(`Failed to create admin account: ${err.message}`);
      } else {
        setLoginError(
          err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential"
            ? "Invalid email or password credentials."
            : `Failed to authenticate: ${err.message}`
        );
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center text-text-primary transition-colors duration-300">
        <div className="h-10 w-10 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wider text-text-secondary">{t.authLoadingMsg}</p>
      </div>
    );
  }

  // Render Login Card if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 relative overflow-hidden select-none transition-colors duration-300">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Floating Toggle Controls inside Login View */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md bg-bg-card border border-border-custom rounded-2xl p-8 backdrop-blur-md shadow-custom relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-2">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-text-primary font-heading">
              {isSignUp ? t.signUpTitle : t.loginTitle}
            </h1>
            <p className="text-xs text-text-secondary">
              {isSignUp ? t.signUpSub : t.loginSub}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                {t.emailLabel}
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nakshatracctv.com"
                className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-custom text-text-primary placeholder-text-secondary/40 text-sm focus:outline-none focus:border-accent font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="login-password" className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                {t.passwordLabel}
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-bg-primary border border-border-custom text-text-primary placeholder-text-secondary/40 text-sm focus:outline-none focus:border-accent"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-lg leading-relaxed">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 rounded-lg bg-accent hover:bg-accent/90 text-white text-sm font-semibold transition duration-300 active:scale-95 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
            >
              {loginLoading ? "..." : isSignUp ? t.signUpTitle : t.accessBtn}
            </button>
          </form>
          
          <div className="text-center pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setLoginError("");
              }}
              className="text-xs text-text-secondary hover:text-text-primary transition duration-300 font-semibold cursor-pointer underline"
            >
              {isSignUp ? t.signInLink : t.signUpLink}
            </button>
            <Link href="/" className="text-xs text-accent hover:text-accent/80 font-medium transition duration-300">
              {t.returnBtn}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: t.leadsPipeline, href: "/admin", icon: LayoutDashboard },
    { name: t.contentCms, href: "/admin/cms", icon: Database },
    { name: t.globalSettings, href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col md:flex-row transition-colors duration-300">
      {/* Mobile Sidebar Toggle Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-border-custom bg-bg-primary/95 sticky top-0 z-30 backdrop-blur-md">
        <span className="text-md font-bold tracking-wider font-heading text-text-primary">
          NAKSHATRA <span className="text-accent">CRM</span>
        </span>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-text-secondary hover:text-text-primary"
            aria-label="Toggle Navigation"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar Backdrop Overlay on Mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-15 md:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-20 h-screen w-64 border-r border-border-custom bg-bg-primary/60 backdrop-blur-md p-6 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="hidden md:block space-y-1">
            <span className="text-lg font-black tracking-widest font-heading text-text-primary">
              NAKSHATRA <span className="text-accent">CRM</span>
            </span>
            <p className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">
              {t.controlPanelLabel}
            </p>
            {/* Desktop Theme & Language switch panel */}
            <div className="flex items-center gap-3 pt-4 border-b border-border-custom/50 pb-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition duration-300 ${
                    isActive
                      ? "bg-accent text-white shadow-custom"
                      : "text-text-secondary hover:bg-bg-secondary/40 hover:text-text-primary"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary/20 rounded-lg border border-border-custom text-xs">
            <ShieldCheck className="h-4.5 w-4.5 text-accent" />
            <div className="truncate">
              <span className="block text-text-secondary text-[9px] font-bold uppercase tracking-wider">{t.activeAdminLabel}</span>
              <span className="truncate block font-semibold text-text-primary">{user.email}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold w-full text-red-500 hover:bg-red-500/5 transition duration-300 cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>{t.signOut}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-x-hidden bg-bg-primary text-text-primary">
        {children}
      </main>
    </div>
  );
}
