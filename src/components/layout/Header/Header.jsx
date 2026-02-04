import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Bell,
  Settings,
  Sun,
  Droplet,
  Flame,
  Zap,
  X,
  RefreshCw,
  Menu
} from "lucide-react";

/* -------------------------------------------------
   Static Tailwind-safe color map (IMPORTANT)
-------------------------------------------------- */
/* -------------------------------------------------
   Static Tailwind-safe color map (IMPORTANT)
-------------------------------------------------- */
const RESOURCE_STYLES = {
  Solar: {
    active: "bg-amber-500/20 text-amber-300 border border-amber-500/30 neon-text-amber",
    inactive: "text-slate-400 hover:text-amber-200 hover:bg-amber-500/10",
  },
  Water: {
    active: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 neon-text-cyan",
    inactive: "text-slate-400 hover:text-cyan-200 hover:bg-cyan-500/10",
  },
  Gas: {
    active: "bg-orange-500/20 text-orange-300 border border-orange-500/30 neon-text-orange",
    inactive: "text-slate-400 hover:text-orange-200 hover:bg-orange-500/10",
  },
  Energy: {
    active: "bg-blue-500/20 text-blue-300 border border-blue-500/30 neon-text-blue",
    inactive: "text-slate-400 hover:text-blue-200 hover:bg-blue-500/10",
  },
};

export default function Header({ activePage, setActivePage, onMenuClick }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh for the active view
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resources = [
    { icon: Sun, label: "Solar" },
    { icon: Droplet, label: "Water" },
    { icon: Flame, label: "Gas" },
    { icon: Zap, label: "Energy" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 h-16 w-full flex items-center justify-between px-4 sm:px-6
        bg-slate-900/40 backdrop-blur-xl transition-shadow
        ${scrolled ? "shadow-md shadow-black/20" : ""}`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">


        {/* Desktop search */}
        <div className="relative hidden sm:block w-64 group">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors"
          />
          <input
            placeholder="Search dashboard..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl
              bg-slate-800/50 border border-white/5 text-sm text-white
              placeholder:text-slate-500
              focus:bg-slate-800/80 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50
              outline-none transition-all shadow-inner"
          />
        </div>

        {/* Mobile search toggle */}
        <button
          onClick={() => setMobileSearchOpen((p) => !p)}
          className="sm:hidden p-2 rounded-lg text-slate-400 hover:bg-white/5"
        >
          <Search size={20} />
        </button>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex items-center gap-2 bg-slate-800/30 p-1.5 rounded-2xl border border-white/5 shadow-inner">
        {resources.map((r) => (
          <ResourceButton
            key={r.label}
            {...r}
            active={activePage === r.label}
            onClick={() => setActivePage(r.label)}
          />
        ))}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="peer relative p-2 rounded-full text-slate-400 hover:bg-white/5 hover:text-white transition"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-900 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
          </button>

          {/* Notification Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-white/5 flex justify-between items-center">
                <span className="text-sm font-bold text-white">Notifications</span>
                <button className="text-xs text-blue-400 hover:text-blue-300">Mark all read</button>
              </div>
              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {[
                  { title: "Peak Usage Alert", time: "10m ago", type: "critical" },
                  { title: "System Update", time: "1h ago", type: "info" },
                  { title: "Leak Check Passed", time: "2h ago", type: "success" },
                ].map((n, i) => (
                  <div key={i} className="p-3 hover:bg-white/5 border-b border-white/5 last:border-0 cursor-pointer transition-colors">
                    <p className={`text-xs font-bold mb-0.5 ${n.type === 'critical' ? 'text-rose-400' :
                      n.type === 'success' ? 'text-emerald-400' : 'text-blue-400'
                      }`}>{n.title}</p>
                    <p className="text-[10px] text-slate-500">{n.time}</p>
                  </div>
                ))}
              </div>
              <button className="w-full py-2 text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors rounded-b-xl border-t border-white/5">
                View All Notifications
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleRefresh}
          className="p-2 rounded-full text-slate-400 hover:bg-white/5 hover:text-white transition"
          title="Refresh Data"
        >
          <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
        </button>

        <button className="p-2 rounded-full text-slate-400 hover:bg-white/5 hover:text-white transition">
          <Settings size={20} />
        </button>

        <div className="h-6 w-px bg-white/10" />

        {/* User Profile */}
        <div className="relative">
          <button className="peer flex items-center gap-3 px-2 py-1 rounded-full hover:bg-white/5 transition group">
            <div className="hidden lg:block text-right">
              <p className="text-sm font-semibold text-slate-200 leading-none group-hover:text-white transition">
                Admin User
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 group-hover:text-slate-400">Super Admin</p>
            </div>
            <div
              className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
                    flex items-center justify-center text-white text-xs font-bold
                    shadow-lg border border-white/10 group-hover:scale-105 transition"
            >
              AU
            </div>
          </button>
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-xl opacity-0 invisible peer-focus:opacity-100 peer-focus:visible hover:opacity-100 hover:visible transition-all z-50 transform origin-top-right">
            <div className="p-2 space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-white/5 rounded-lg transition-colors">
                Profile Settings
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {mobileSearchOpen && (
        <div className="absolute top-16 inset-x-0 sm:hidden bg-slate-900 p-4 shadow-xl border-b border-white/10 backdrop-blur-xl">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              placeholder="Search dashboard..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl
                bg-slate-800 border border-white/10 text-sm text-white
                focus:ring-1 focus:ring-blue-500/50 outline-none"
            />
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------
   Resource Button
-------------------------------------------------- */
function ResourceButton({ icon: Icon, label, active, onClick }) {
  const styles = RESOURCE_STYLES[label];

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold
        transition-all duration-300
        ${active ? styles.active + " shadow-[0_0_10px_rgba(0,0,0,0.2)]" : styles.inactive}`}
    >
      <Icon size={active ? 16 : 14} strokeWidth={active ? 2.5 : 2} />
      {label}
    </button>
  );
}
