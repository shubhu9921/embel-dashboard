import React, { useState } from "react";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    Tooltip,
    CartesianGrid,
    XAxis,
    YAxis,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import {
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    AlertTriangle,
    Activity,
    CheckCircle,
    MoreHorizontal,
    Cpu,
    ZapOff,
    IndianRupee,
    Clock
} from "lucide-react";
import AlertsPanel from "../../components/cards/AlertsPanel";
import ViewAllModal from "../../components/modals/ViewAllModal";

export default function EnergyPage() {
    const [timeRange, setTimeRange] = useState("1W");
    const [showModal, setShowModal] = useState(false);

    /* -------------------- DATA -------------------- */
    const chartData = {
        "1D": [
            { name: "00:00", value: 120 }, { name: "04:00", value: 95 },
            { name: "08:00", value: 350 }, { name: "12:00", value: 420 },
            { name: "16:00", value: 380 }, { name: "20:00", value: 200 },
        ],
        "1W": [
            { name: "Mon", value: 4200 }, { name: "Tue", value: 3800 },
            { name: "Wed", value: 4500 }, { name: "Thu", value: 4800 },
            { name: "Fri", value: 4100 }, { name: "Sat", value: 3200 },
            { name: "Sun", value: 2900 },
        ],
        "1M": [
            { name: "Week 1", value: 28000 }, { name: "Week 2", value: 29500 },
            { name: "Week 3", value: 27800 }, { name: "Week 4", value: 30100 },
        ],
        "1Y": [
            { name: "Jan", value: 115000 }, { name: "Feb", value: 112000 },
            { name: "Mar", value: 125000 }, { name: "Apr", value: 118000 },
            { name: "May", value: 130000 }, { name: "Jun", value: 140000 },
            { name: "Jul", value: 145000 }, { name: "Aug", value: 142000 },
            { name: "Sep", value: 128000 }, { name: "Oct", value: 135000 },
            { name: "Nov", value: 120000 }, { name: "Dec", value: 125000 },
        ]
    };

    const breakdownData = [
        { name: "Light", value: 20, color: "#eab308" }, // Yellow 500
        { name: "HVAC", value: 40, color: "#3b82f6" },  // Blue 500
        { name: "Equip", value: 30, color: "#ef4444" }, // Red 500
        { name: "Other", value: 10, color: "#94a3b8" }, // Slate 400
    ];

    const alerts = [
        { id: 1, type: "critical", title: "Voltage Surge", message: "Voltage Surge Detected (L1).", timestamp: "10m ago" },
        { id: 2, type: "warning", title: "Power Factor", message: "Power Factor < 0.9.", timestamp: "1h ago" },
        { id: 3, type: "info", title: "Harmonic Distortion", message: "Harmonic Distortion > 5%.", timestamp: "3h ago" },
    ];

    const meters = [
        { id: "EM-001", name: "Main Incomer", location: "Substation", status: "active", current: "450.5 kW", daily: "1200 kWh" },
        { id: "EM-002", name: "Production Line A", location: "Shop Floor", status: "active", current: "125.0 kW", daily: "850 kWh" },
        { id: "EM-003", name: "HVAC System", location: "Roof", status: "warning", current: "85.2 kW", daily: "420 kWh" },
        { id: "EM-004", name: "Admin Block", location: "Office", status: "active", current: "25.4 kW", daily: "150 kWh" },
        { id: "EM-005", name: "Lighting DB", location: "Floor 1", status: "active", current: "12.1 kW", daily: "65 kWh" },
        { id: "EM-006", name: "Server Room", location: "Floor 2", status: "active", current: "15.0 kW", daily: "360 kWh" },
        { id: "EM-007", name: "Parking Lights", location: "Basement", status: "inactive", current: "0.0 kW", daily: "0 kWh" },
    ];

    const systemStatus = [
        { label: "Voltage L1", value: "230.5 V", icon: Zap, color: "text-yellow-400" },
        { label: "Voltage L2", value: "231.2 V", icon: Zap, color: "text-yellow-400" },
        { label: "Voltage L3", value: "229.8 V", icon: Zap, color: "text-yellow-400" },
        { label: "Current L1", value: "45.2 A", icon: Activity, color: "text-blue-400" },
        { label: "Current L2", value: "44.8 A", icon: Activity, color: "text-blue-400" },
        { label: "Current L3", value: "46.1 A", icon: Activity, color: "text-blue-400" },
        { label: "Power Factor", value: "0.98", icon: CheckCircle, color: "text-emerald-400" },
        { label: "Frequency", value: "50.0 Hz", icon: Activity, color: "text-purple-400" },
        { label: "Active Power", value: "32.5 kW", icon: Zap, color: "text-orange-400" },
        { label: "Apparent", value: "33.1 kVA", icon: Activity, color: "text-cyan-400" },
        { label: "Reactive", value: "6.2 kVAR", icon: Activity, color: "text-indigo-400" },
        { label: "THD", value: "2.5%", icon: ZapOff, color: "text-rose-400" },
    ];

    const meterColumns = [
        { header: "ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "Location", accessor: "location" },
        { header: "Current Load", accessor: "current" },
        { header: "Daily Usage", accessor: "daily" },
        {
            header: "Status",
            accessor: "status",
            render: (row) => (
                <span className={`px-2 py-0.5 rounded textxs font-bold uppercase ${row.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                    row.status === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-slate-700 text-slate-400'
                    }`}>
                    {row.status}
                </span>
            )
        }
    ];

    return (
        <main className="flex-1 flex flex-col gap-6 p-4 md:p-6 overflow-y-auto custom-scrollbar">
            {/* -------------------- HEADER -------------------- */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                            <Zap className="text-blue-400" size={24} fill="currentColor" fillOpacity={0.2} />
                        </div>
                        Energy Dashboard
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 ml-12">Real-time monitoring & analytics</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 rounded-lg text-sm border border-white/5 transition-colors">
                        Generate Report
                    </button>
                </div>
            </div>

            {/* -------------------- ROW 1: KPI CARDS -------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Total Usage - Zap Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Zap size={48} className="text-blue-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Total Usage</span>
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20 relative z-10">
                            <ArrowUpRight size={12} /> 12.5%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white neon-text-blue mb-1 relative z-10">4,520 kWh</div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden relative z-10">
                        <div className="h-full bg-blue-500 w-[75%]"></div>
                    </div>
                </div>

                {/* Est. Cost - IndianRupee Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <IndianRupee size={48} className="text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Est. Cost</span>
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20 relative z-10">
                            <ArrowUpRight size={12} /> 12.5%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">₹ 4,520</div>
                    <p className="text-[10px] text-slate-500 relative z-10">Projected: ₹ 5,200</p>
                </div>

                {/* Daily Avg - Activity Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={48} className="text-red-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Daily Avg</span>
                        <div className="flex items-center gap-1 text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded text-[10px] border border-red-500/20 relative z-10">
                            <ArrowUpRight size={12} /> 8.3%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">645 kWh</div>
                </div>

                {/* Peak Demand - Zap Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Zap size={48} className="text-orange-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Peak Dem</span>
                        <div className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-white/5 relative z-10">18:00</div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">12.5 kW</div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mt-auto relative z-10">
                        <div className="h-full bg-blue-400 w-[60%]"></div>
                    </div>
                </div>

                {/* Alerts KPI */}
                {/* Alerts KPI */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group border-t-2 border-t-red-500 hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertTriangle size={48} className="text-red-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Alerts</span>
                        <div className="p-1 rounded bg-red-500/20 text-red-400 relative z-10">
                            <AlertTriangle size={14} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white neon-text-red mb-1 relative z-10">3</div>
                    <p className="text-[10px] text-red-400 font-semibold uppercase relative z-10">Active</p>
                </div>
            </div>

            {/* -------------------- ROW 2: CHARTS & ALERTS -------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[350px]">
                {/* Consumption Overview (Bar Chart) */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Consumption Trends</h3>
                        </div>
                        <div className="flex bg-slate-800/80 p-1 rounded-lg border border-white/10">
                            {['1D', '1W', '1M', '1Y'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTimeRange(t)}
                                    className={`px-3 py-1 text-xs rounded-md transition-all ${timeRange === t
                                        ? 'bg-[#ff6e00] text-white shadow-md shadow-orange-900/20 font-bold'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,110,0,0.3)]'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData[timeRange]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Breakdown */}
                <div className="lg:col-span-1 glass-panel p-6 rounded-2xl flex flex-col items-center min-h-[350px]">
                    <h3 className="text-lg font-bold text-white mb-2 self-start">Breakdown</h3>
                    <div className="relative w-48 h-48 my-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={breakdownData} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                                    {breakdownData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip offset={20} contentStyle={{ backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '8px', border: 'none', fontWeight: 'bold' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-white">100</span>
                            <span className="text-xs text-slate-400">Total</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap justify-center gap-3 mt-4">
                        {breakdownData.map((item, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-xs text-slate-300">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alerts Panel Usage */}
                <div className="lg:col-span-1 glass-panel p-6 rounded-2xl">
                    <AlertsPanel alerts={alerts} />
                </div>
            </div>

            {/* -------------------- ROW 3: METERS -------------------- */}
            <div className="glass-panel p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Meters</h3>
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold uppercase tracking-wider transition-colors"
                    >
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {meters.slice(0, 5).map((meter) => (
                        <div key={meter.id} className="p-4 rounded-xl bg-slate-800/40 border border-white/5 hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] hover:!bg-slate-800/40 transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{meter.name}</span>
                                    <span className="text-[10px] text-slate-500">{meter.id}</span>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${meter.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                                    meter.status === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                                        'bg-slate-700 text-slate-400'
                                    }`}>
                                    {meter.status}
                                </span>
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="text-xs text-slate-400 block mb-0.5">Current</span>
                                    <span className="text-lg font-bold text-white">{meter.current}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-slate-500 block mb-0.5">Daily Usage</span>
                                    <span className="text-sm font-mono text-slate-300">{meter.daily}</span>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                    <MoreHorizontal size={12} /> {meter.location}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* -------------------- ROW 4: DATA GRID -------------------- */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-blue-400" />
                    System Status
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {systemStatus.map((item, idx) => (
                        <div key={idx} className="glass-card p-3 rounded-lg flex flex-col items-center justify-center text-center border border-white/5 hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] hover:!bg-slate-800/40 transition-all duration-300">
                            <item.icon size={20} className={`${item.color} mb-2 opacity-80`} />
                            <span className="text-xs text-slate-400 mb-1">{item.label}</span>
                            <span className="text-sm font-bold text-white tracking-wide">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* View All Modal */}
            {showModal && (
                <ViewAllModal
                    title="All Energy Meters"
                    data={meters}
                    columns={meterColumns}
                    onClose={() => setShowModal(false)}
                />
            )}

        </main>
    );
}
