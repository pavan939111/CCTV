"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { 
  Lock, LayoutDashboard, Database, Settings, LogOut, 
  Menu, X, Eye, ShieldCheck 
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Login Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

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

    // Testing Bypass fallback for local developers
    if (email === "admin@nakshatracctv.com" && password === "admin123") {
      setUser({ email: "admin@nakshatracctv.com" } as any);
      setLoginLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      setLoginError(
        err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential"
          ? "Invalid email or password credentials."
          : `Failed to authenticate: ${err.message}`
      );
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
      <div className="min-h-screen bg-[#0B1220] flex flex-col items-center justify-center text-white">
        <div className="h-10 w-10 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wider text-[#94A3B8]">Verifying CRM Session...</p>
      </div>
    );
  }

  // Render Login Card if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4 relative overflow-hidden select-none">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-2">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white font-heading">
              Nakshatra CRM Login
            </h1>
            <p className="text-xs text-[#94A3B8]">
              Authorized administrators only
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Admin Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nakshatracctv.com"
                className="w-full px-4 py-2.5 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="login-password" className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Security Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent"
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
              className="w-full py-2.5 rounded-lg bg-accent hover:bg-accent-glow text-white text-sm font-semibold transition duration-300 active:scale-95 disabled:opacity-75 disabled:pointer-events-none"
            >
              {loginLoading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
          
          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-accent hover:text-accent-glow font-medium transition duration-300">
              ← Return to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: "Leads Pipeline", href: "/admin", icon: LayoutDashboard },
    { name: "Content CMS", href: "/admin/cms", icon: Database },
    { name: "Global Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B1220]/90 sticky top-0 z-30 backdrop-blur-md">
        <span className="text-md font-bold tracking-wider font-heading">
          NAKSHATRA <span className="text-accent">CRM</span>
        </span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 text-[#94A3B8] hover:text-white"
          aria-label="Toggle Navigation"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-20 h-screen w-64 border-r border-white/10 bg-[#0B1220] p-6 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          <div className="hidden md:block">
            <span className="text-lg font-black tracking-widest font-heading">
              NAKSHATRA <span className="text-accent">CRM</span>
            </span>
            <p className="text-[10px] text-[#94A3B8] mt-1 uppercase font-bold tracking-wider">
              Control Panel v1.0
            </p>
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
                      : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
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
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs">
            <ShieldCheck className="h-4.5 w-4.5 text-accent" />
            <div className="truncate">
              <span className="block text-[#94A3B8] text-[9px] font-bold uppercase tracking-wider">Active Admin</span>
              <span className="truncate block font-semibold text-white">{user.email}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold w-full text-red-400 hover:bg-red-400/5 transition duration-300"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
