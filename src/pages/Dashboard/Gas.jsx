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
    Flame,
    ArrowUpRight,
    ArrowDownRight,
    AlertTriangle,
    Activity,
    Thermometer,
    Wind,
    Gauge,
    Droplet,
    CheckCircle,
    Battery,
    Filter,
    MoreHorizontal,
    Clock,
    IndianRupee
} from "lucide-react";
import AlertsPanel from "../../components/cards/AlertsPanel";
import ViewAllModal from "../../components/modals/ViewAllModal";

export default function GasPage() {
    const [timeRange, setTimeRange] = useState("1W");
    const [showModal, setShowModal] = useState(false);

    /* -------------------- DATA -------------------- */
    const chartData = {
        "1D": [
            { name: "00:00", value: 12 }, { name: "04:00", value: 15 },
            { name: "08:00", value: 45 }, { name: "12:00", value: 38 },
            { name: "16:00", value: 42 }, { name: "20:00", value: 55 },
        ],
        "1W": [
            { name: "Mon", value: 30 }, { name: "Tue", value: 45 },
            { name: "Wed", value: 35 }, { name: "Thu", value: 60 },
            { name: "Fri", value: 50 }, { name: "Sat", value: 75 },
            { name: "Sun", value: 65 },
        ],
        "1M": [
            { name: "Week 1", value: 250 }, { name: "Week 2", value: 280 },
            { name: "Week 3", value: 240 }, { name: "Week 4", value: 310 },
        ],
        "1Y": [
            { name: "Jan", value: 1200 }, { name: "Feb", value: 1100 },
            { name: "Mar", value: 1300 }, { name: "Apr", value: 1150 },
            { name: "May", value: 1400 }, { name: "Jun", value: 1250 },
            { name: "Jul", value: 1350 }, { name: "Aug", value: 1450 },
            { name: "Sep", value: 1300 }, { name: "Oct", value: 1500 },
            { name: "Nov", value: 1600 }, { name: "Dec", value: 1800 },
        ]
    };

    const breakdownData = [
        { name: "Kitchen", value: 45, color: "#f97316" }, // Orange 500
        { name: "Heating", value: 30, color: "#f59e0b" }, // Amber 500
        { name: "Boiler", value: 15, color: "#ea580c" },  // Orange 600
        { name: "Other", value: 10, color: "#94a3b8" },   // Slate 400
    ];

    const alerts = [
        { id: 1, type: "success", title: "System Normal", message: "All gas meters are functioning optimally.", timestamp: "1h ago" },
        { id: 2, type: "info", title: "Winter Pattern", message: "Usage +20% due to heating.", timestamp: "3h ago" },
        { id: 3, type: "warning", title: "Minor Leak Check", message: "Scheduled for Zone B tomorrow.", timestamp: "5h ago" },
    ];

    const meters = [
        { id: "GAS-001", name: "Main Meter", location: "Basement", status: "active", current: "2.1 m³/h", daily: "45 m³" },
        { id: "GAS-002", name: "Kitchen Meter", location: "Kitchen", status: "active", current: "0.5 m³/h", daily: "12 m³" },
        { id: "GAS-003", name: "Boiler Room", location: "Boiler", status: "active", current: "1.2 m³/h", daily: "22 m³" },
        { id: "GAS-004", name: "Backup Line", location: "Exterior", status: "warning", current: "0.0 m³/h", daily: "0 m³" },
        { id: "GAS-005", name: "Annex A", location: "Wing A", status: "active", current: "0.8 m³/h", daily: "15 m³" },
        { id: "GAS-006", name: "Annex B", location: "Wing B", status: "inactive", current: "0.0 m³/h", daily: "0 m³" },
        { id: "GAS-007", name: "Lab 1", location: "Wing C", status: "active", current: "0.4 m³/h", daily: "8 m³" },
        { id: "GAS-008", name: "Lab 2", location: "Wing C", status: "active", current: "0.4 m³/h", daily: "9 m³" },
    ];

    const systemStatus = [
        { label: "Gas Pressure", value: "2.8 bar", icon: Gauge, color: "text-orange-400" },
        { label: "System Temp", value: "22°C", icon: Thermometer, color: "text-amber-400" },
        { label: "Flow Velocity", value: "15 m/s", icon: Wind, color: "text-orange-300" },
        { label: "Calorific Val", value: "38.5 MJ", icon: Flame, color: "text-red-400" },
        { label: "Supply Line", value: "Active", icon: Activity, color: "text-emerald-400" },
        { label: "Valve Pos", value: "100%", icon: CheckCircle, color: "text-blue-400" },
        { label: "Methane %", value: "92%", icon: Droplet, color: "text-teal-400" },
        { label: "Odorant Lvl", value: "Good", icon: Wind, color: "text-green-400" },
        { label: "Filter Sts", value: "Clean", icon: Filter, color: "text-cyan-400" },
        { label: "Regulator", value: "Stable", icon: Activity, color: "text-indigo-400" },
        { label: "Leak Sensor", value: "Safe", icon: CheckCircle, color: "text-emerald-400" },
        { label: "Battery", value: "98%", icon: Battery, color: "text-green-400" },
    ];

    const meterColumns = [
        { header: "ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "Location", accessor: "location" },
        { header: "Current Flow", accessor: "current" },
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
                        <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/30">
                            <Flame className="text-orange-500" size={24} fill="currentColor" fillOpacity={0.2} />
                        </div>
                        Gas Dashboard
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
            {/* -------------------- ROW 1: KPI CARDS -------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Total Usage - Flame Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Flame size={48} className="text-orange-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Total Usage</span>
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20 relative z-10">
                            <ArrowUpRight size={12} /> 8.2%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white neon-text-orange mb-1 relative z-10">387 m³</div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden relative z-10">
                        <div className="h-full bg-orange-500 w-[70%]"></div>
                    </div>
                </div>

                {/* Est. Cost - IndianRupee Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <IndianRupee size={48} className="text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Est. Cost</span>
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20 relative z-10">
                            <ArrowDownRight size={12} /> 2.4%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">₹ 15,240</div>
                    <p className="text-[10px] text-slate-500 relative z-10">Projected: ₹ 18,500</p>
                </div>

                {/* Daily Avg - Activity Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={48} className="text-blue-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Daily Avg</span>
                        <div className="flex items-center gap-1 text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded text-[10px] border border-red-500/20 relative z-10">
                            <ArrowUpRight size={12} /> 6.1%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">55.3 m³</div>
                    <p className="text-[10px] text-slate-500 relative z-10">Volatile usage detected</p>
                </div>

                {/* Peak Flow - Gauge/Clock Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Gauge size={48} className="text-orange-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Peak Flow</span>
                        <div className="flex items-center gap-1 text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded text-[10px] border border-orange-500/20 relative z-10">
                            <Clock size={12} /> 18:15
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">8.2 m³/h</div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mt-auto relative z-10">
                        <div className="h-full bg-orange-400 w-[85%]"></div>
                    </div>
                </div>

                {/* Alerts KPI */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group border-t-2 border-t-red-500">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertTriangle size={48} className="text-red-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Alerts</span>

                        <div className="p-1 rounded bg-red-500/20 text-red-400">
                            <AlertTriangle size={14} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white neon-text-red mb-1">3</div>
                    <p className="text-[10px] text-red-400 font-semibold uppercase">Active Attention Req.</p>
                </div>
            </div>

            {/* -------------------- ROW 2: CHARTS & ALERTS -------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[350px]">
                {/* Consumption Overview (Bar Chart) */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Consumption Overview</h3>
                        </div>
                        <div className="flex bg-slate-800/80 p-1 rounded-lg border border-white/10">
                            {['1D', '1W', '1M', '1Y'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTimeRange(t)}
                                    className={`px-3 py-1 text-xs rounded-md transition-all ${timeRange === t ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
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
                                <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} barSize={32} />
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
                        className="text-xs text-orange-400 hover:text-orange-300 font-semibold uppercase tracking-wider transition-colors"
                    >
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {meters.slice(0, 4).map((meter) => (
                        <div key={meter.id} className="p-4 rounded-xl bg-slate-800/40 border border-white/5 hover:border-orange-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{meter.name}</span>
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
                    <Activity size={18} className="text-orange-400" />
                    System Status
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {systemStatus.map((item, idx) => (
                        <div key={idx} className="glass-card p-3 rounded-lg flex flex-col items-center justify-center text-center">
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
                    title="All Gas Meters"
                    data={meters}
                    columns={meterColumns}
                    onClose={() => setShowModal(false)}
                />
            )}

        </main>
    );
}
