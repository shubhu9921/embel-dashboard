import React, { useState } from "react";
import { AlertTriangle, CheckCircle, Info, XCircle, Filter, Search } from "lucide-react";

export default function AlertsPanel({ alerts = [] }) {
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAlerts = alerts.filter((a) => {
        const matchesType = filter === "All" || a.type.toLowerCase() === filter.toLowerCase();
        const matchesSearch =
            a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.message.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    const getIcon = (type) => {
        switch (type.toLowerCase()) {
            case "critical":
                return <XCircle size={18} className="text-red-400" />;
            case "warning":
                return <AlertTriangle size={18} className="text-amber-400" />;
            case "success":
                return <CheckCircle size={18} className="text-emerald-400" />;
            default:
                return <Info size={18} className="text-blue-400" />;
        }
    };

    const getBadgeStyle = (type) => {
        switch (type.toLowerCase()) {
            case "critical":
                return "bg-red-500/10 text-red-400 border border-red-500/20";
            case "warning":
                return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
            case "success":
                return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
            default:
                return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 shrink-0">
                        Alerts
                        <span className="px-2 py-0.5 rounded-full bg-slate-700 text-xs text-slate-300 font-medium border border-white/5">
                            {filteredAlerts.length}
                        </span>
                    </h3>

                    {/* Search Bar - Moved to Header Right */}
                    <div className="relative w-full max-w-[180px] sm:max-w-xs group">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#ff6e00] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-800/50 border border-white/10 text-xs text-slate-300 placeholder:text-slate-500 focus:text-white focus:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-[#ff6e00]/50 focus:border-[#ff6e00] transition-all hover:border-[#ff6e00]/30"
                        />
                    </div>
                </div>

                {/* Filters Row - Under Headline */}
                <div className="flex flex-wrap gap-2 w-full">
                    {["All", "Critical", "Warning", "Success", "Info"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex-1 sm:flex-none text-center ${filter === type
                                ? "bg-[#ff6e00] text-white shadow-lg shadow-orange-900/40"
                                : "bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white border border-white/5"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {filteredAlerts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-slate-500">
                        <Info size={40} className="mb-2 opacity-50" />
                        <p>No alerts found</p>
                    </div>
                ) : (
                    filteredAlerts.map((alert) => (
                        <div
                            key={alert.id}
                            className="group p-4 rounded-xl bg-slate-800/40 border border-white/5 hover:border-[#ff6e00] hover:shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <div className={`flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold ${getBadgeStyle(alert.type)}`}>
                                    {getIcon(alert.type)}
                                    <span className="uppercase tracking-wider">{alert.type}</span>
                                </div>
                                <span className="text-xs text-slate-500 font-mono">{alert.timestamp}</span>
                            </div>
                            <h4 className="text-sm font-semibold text-slate-200 mt-2 mb-1 group-hover:text-white transition-colors">
                                {alert.title}
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {alert.message}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
