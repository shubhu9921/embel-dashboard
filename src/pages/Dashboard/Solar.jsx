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
    Sun,
    ArrowUpRight,
    Zap,
    Battery,
    Leaf,
    AlertTriangle,
    Activity,
    Thermometer,
    ZapOff,
    MoreHorizontal
} from "lucide-react";
import AlertsPanel from "../../components/cards/AlertsPanel";
import ViewAllModal from "../../components/modals/ViewAllModal";

export default function SolarPage() {
    const [timeRange, setTimeRange] = useState("1W");
    const [showModal, setShowModal] = useState(false);

    /* -------------------- DATA -------------------- */
    const generationData = {
        "1D": [
            { name: "06:00", value: 5 }, { name: "09:00", value: 25 },
            { name: "12:00", value: 45 }, { name: "15:00", value: 35 },
            { name: "18:00", value: 15 },
        ],
        "1W": [
            { name: "Mon", value: 35 }, { name: "Tue", value: 42 },
            { name: "Wed", value: 38 }, { name: "Thu", value: 45 },
            { name: "Fri", value: 40 }, { name: "Sat", value: 48 },
            { name: "Sun", value: 46 },
        ],
        "1M": [
            { name: "W1", value: 240 }, { name: "W2", value: 260 },
            { name: "W3", value: 220 }, { name: "W4", value: 250 },
        ],
        "1Y": [
            { name: "Jan", value: 800 }, { name: "Feb", value: 950 },
            { name: "Mar", value: 1100 }, { name: "Apr", value: 1250 },
            { name: "May", value: 1400 }, { name: "Jun", value: 1500 },
            { name: "Jul", value: 1480 }, { name: "Aug", value: 1350 },
            { name: "Sep", value: 1200 }, { name: "Oct", value: 1050 },
            { name: "Nov", value: 900 }, { name: "Dec", value: 750 },
        ]
    };

    const breakdownData = [
        { name: "East", value: 30, color: "#f59e0b" },   // Amber 500
        { name: "West", value: 30, color: "#d97706" },   // Amber 600
        { name: "Carport", value: 25, color: "#b45309" }, // Amber 700
        { name: "Ground", value: 15, color: "#78350f" },  // Amber 900
    ];

    const alerts = [
        { id: 1, type: "critical", title: "Inverter Err", message: "Inv-04 comms lost.", timestamp: "10m ago" },
        { id: 2, type: "warning", title: "Grid Voltage", message: "High fluctuation L1.", timestamp: "1h ago" },
        { id: 3, type: "success", title: "Self-Consumption", message: "Achieved 95% today.", timestamp: "4h ago" },
    ];

    const inverters = [
        { id: "INV-01", name: "String Inv A", location: "Roof East", status: "active", current: "5.2 kW", daily: "45 kWh" },
        { id: "INV-02", name: "String Inv B", location: "Roof West", status: "active", current: "4.8 kW", daily: "42 kWh" },
        { id: "INV-03", name: "Hybrid Inv", location: "Garage", status: "active", current: "3.5 kW", daily: "38 kWh" },
        { id: "INV-04", name: "Central Inv", location: "Ground", status: "warning", current: "0.5 kW", daily: "12 kWh" },
        { id: "INV-05", name: "Carport A", location: "Parking", status: "active", current: "3.2 kW", daily: "28 kWh" },
        { id: "INV-06", name: "Carport B", location: "Parking", status: "active", current: "2.9 kW", daily: "25 kWh" },
        { id: "INV-07", name: "Carport C", location: "Parking", status: "active", current: "3.0 kW", daily: "26 kWh" },
        { id: "INV-08", name: "String Inv C", location: "Roof North", status: "active", current: "4.5 kW", daily: "40 kWh" },
    ];

    const systemStatus = [
        { label: "Irradiance", value: "850 W/m²", icon: Sun, color: "text-amber-400" },
        { label: "Pnl Temp", value: "45°C", icon: Thermometer, color: "text-red-400" },
        { label: "Efficiency", value: "18.5%", icon: Activity, color: "text-green-400" },
        { label: "Grid Feed", value: "12.4 kW", icon: Zap, color: "text-blue-400" },
        { label: "DC Voltage", value: "750 V", icon: Zap, color: "text-yellow-400" },
        { label: "AC Voltage", value: "230 V", icon: Zap, color: "text-orange-400" },
        { label: "DC Current", value: "18.2 A", icon: Activity, color: "text-cyan-400" },
        { label: "AC Current", value: "16.5 A", icon: Activity, color: "text-indigo-400" },
        { label: "Frequency", value: "50.0 Hz", icon: Activity, color: "text-purple-400" },
        { label: "Amb Temp", value: "32°C", icon: Thermometer, color: "text-orange-300" },
        { label: "Daily Yld", value: "145 kWh", icon: Zap, color: "text-emerald-400" },
        { label: "Performance", value: "94%", icon: Activity, color: "text-green-400" },
    ];

    const inverterColumns = [
        { header: "ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "Location", accessor: "location" },
        { header: "Output Power", accessor: "current" },
        { header: "Daily Yield", accessor: "daily" },
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
                        <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                            <Sun className="text-amber-400" size={24} fill="currentColor" fillOpacity={0.2} />
                        </div>
                        Solar Dashboard
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 ml-12">Real-time generation & analytics</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 rounded-lg text-sm border border-white/5 transition-colors">
                        Generate Report
                    </button>
                </div>
            </div>

            {/* -------------------- ROW 1: KPI CARDS -------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Output - Zap Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Zap size={48} className="text-amber-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Output</span>
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20 relative z-10">
                            <ArrowUpRight size={12} /> 12.5%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white neon-text-amber mb-1 relative z-10">45.2 kW</div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden relative z-10">
                        <div className="h-full bg-amber-500 w-[80%]"></div>
                    </div>
                </div>

                {/* Daily Yield - Sun Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sun size={48} className="text-amber-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Daily Yld</span>
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20 relative z-10">
                            <ArrowUpRight size={12} /> 5.2%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">285 kWh</div>
                </div>

                {/* Battery - Battery Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Battery size={48} className="text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Battery</span>
                        <div className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px] text-emerald-400 border border-emerald-500/20 relative z-10">Charging</div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">92%</div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mt-auto relative z-10">
                        <div className="h-full bg-green-500 w-[92%]"></div>
                    </div>
                </div>

                {/* CO2 Saved - Leaf Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Leaf size={48} className="text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">CO2 Saved</span>
                        <div className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-white/5 relative z-10">Today</div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">145 kg</div>
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
                {/* Generation Analytics (Bar Chart) */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Generation Analytics</h3>
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
                            <BarChart data={generationData[timeRange]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={32} />
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

            {/* -------------------- ROW 3: INVERTERS -------------------- */}
            <div className="glass-panel p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Inverters</h3>
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-xs text-amber-400 hover:text-amber-300 font-semibold uppercase tracking-wider transition-colors"
                    >
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    {inverters.slice(0, 6).map((meter) => (
                        <div key={meter.id} className="p-4 rounded-xl bg-slate-800/40 border border-white/5 hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] hover:!bg-slate-800/40 transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{meter.name}</span>
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
                    <Activity size={18} className="text-amber-400" />
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
                    title="All Inverters"
                    data={inverters}
                    columns={inverterColumns}
                    onClose={() => setShowModal(false)}
                />
            )}

        </main>
    );
}
