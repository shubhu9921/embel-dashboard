import React, { useState } from "react";
import {
    Search,
    CheckCircle,
    AlertTriangle,
    Info,
    XCircle,
    Bell,
    Check,
    Filter,
    ChevronLeft,
    ChevronRight,
    MoreVertical
} from "lucide-react";

export default function AlertsPage() {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const allAlerts = [
        { id: 1, type: "critical", title: "Peak Hour Usage Alert", message: "High energy consumption detected during peak hours (6-8 PM). Consider shifting load.", source: "Energy", time: "3 hours ago" },
        { id: 2, type: "success", title: "Energy Savings Achieved", message: "You saved 12.5% energy this week compared to last week. Great job!", source: "Gas", time: "5 hours ago" },
        { id: 3, type: "info", title: "Smart Meter Update", message: "Firmware update completed successfully for all energy meters.", source: "Water", time: "1 day ago" },
        { id: 4, type: "warning", title: "Pressure Drop", message: "Water pressure in Sector 4 is below optimal levels.", source: "Water", time: "2 days ago" },
        { id: 5, type: "critical", title: "Inverter Offline", message: "Solar Inverter INV-03 has lost connection. Check connectivity.", source: "Solar", time: "2 days ago" },
        { id: 6, type: "warning", title: "Voltage Fluctuation", message: "Detected unstable voltage frequencies in Main Line B.", source: "Energy", time: "3 days ago" },
        { id: 7, type: "info", title: "Scheduled Maintenance", message: "Maintenance for Water Pump A1 is scheduled for tomorrow.", source: "Water", time: "4 days ago" },
        { id: 8, type: "success", title: "System Online", message: "All systems operational after nightly reboot.", source: "System", time: "5 days ago" },
    ];

    const filteredAlerts = allAlerts.filter((alert) => {
        const matchesFilter = filter === "all" || alert.type === filter;
        const matchesSearch = alert.title.toLowerCase().includes(search.toLowerCase()) ||
            alert.message.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getIcon = (type) => {
        switch (type) {
            case "critical": return <XCircle size={20} className="text-red-400" />;
            case "warning": return <AlertTriangle size={20} className="text-amber-400" />;
            case "success": return <CheckCircle size={20} className="text-emerald-400" />;
            case "info": return <Info size={20} className="text-blue-400" />;
            default: return <Bell size={20} className="text-slate-400" />;
        }
    };

    const getStatusStyles = (type) => {
        switch (type) {
            case "critical": return "bg-red-500/10 text-red-400 border-red-500/20";
            case "warning": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            case "success": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "info": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    }

    return (
        <main className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto custom-scrollbar">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Alerts & Notifications</h1>
                    <p className="text-slate-400 text-sm mt-1">Real-time system updates and historical logs.</p>
                </div>
                <div className="flex gap-3">

                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors shadow-lg shadow-blue-900/40">
                        <Check size={16} /> Mark All Read
                    </button>
                </div>
            </div>

            {/* Main Content Panel */}
            <div className="glass-panel rounded-xl flex flex-col overflow-hidden min-h-[600px]">

                {/* Toolbar */}
                <div className="p-4 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/20">
                    <div className="flex p-1 bg-slate-800/50 rounded-lg border border-white/5">
                        {['all', 'critical', 'warning', 'info'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${filter === f
                                    ? "bg-slate-700 text-white shadow-sm"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72 group">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search logs..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-white/5 text-sm text-white focus:bg-slate-800 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                        />
                    </div>
                </div>

                {/* List View */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {filteredAlerts.length > 0 ? (
                        <div className="flex flex-col">
                            {filteredAlerts.map((alert, index) => (
                                <div
                                    key={alert.id}
                                    className={`
                                        group flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors
                                        ${index === filteredAlerts.length - 1 ? 'border-b-0' : ''}
                                    `}
                                >
                                    {/* Icon */}
                                    <div className="mt-1 md:mt-0 p-2 rounded-full bg-slate-800/80 border border-white/5 shrink-0 group-hover:bg-slate-800 transition-colors">
                                        {getIcon(alert.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-sm font-semibold text-slate-200 group-hover:text-blue-200 transition-colors truncate">
                                                {alert.title}
                                            </h3>
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${getStatusStyles(alert.type)}`}>
                                                {alert.type}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400 line-clamp-1 group-hover:line-clamp-none transition-all">
                                            {alert.message}
                                        </p>
                                    </div>

                                    {/* Meta & Actions */}
                                    <div className="flex items-center gap-4 md:gap-8 ml-auto md:ml-0 w-full md:w-auto mt-2 md:mt-0 pl-11 md:pl-0">
                                        <div className="flex flex-col items-start md:items-end min-w-[100px]">
                                            <span className="text-xs font-medium text-slate-300">{alert.source}</span>
                                            <span className="text-[11px] text-slate-500">{alert.time}</span>
                                        </div>
                                        <button className="hidden group-hover:flex p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96 text-slate-500">
                            <div className="p-4 rounded-full bg-slate-800/50 mb-4 border border-white/5 shadow-inner">
                                <Bell size={32} className="opacity-40" />
                            </div>
                            <p className="text-sm font-medium text-slate-400">No alerts found</p>
                            <p className="text-xs text-slate-600 mt-1">Try adjusting your filters or search</p>
                        </div>
                    )}
                </div>

                {/* Pagination (Visual Only) */}
                <div className="p-4 border-t border-white/5 bg-slate-900/20 flex justify-between items-center text-xs text-slate-500">
                    <span>Showing {filteredAlerts.length} of {allAlerts.length} alerts</span>
                    <div className="flex gap-2">
                        <button className="p-1 px-2 rounded hover:bg-white/5 hover:text-slate-300 disabled:opacity-50" disabled>
                            <ChevronLeft size={14} />
                        </button>
                        <button className="p-1 px-2 rounded hover:bg-white/5 hover:text-slate-300">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}
