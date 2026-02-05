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
    Droplet,
    ArrowUpRight,
    ArrowDownRight,
    AlertTriangle,
    Activity,
    Thermometer,
    Gauge,
    CheckCircle,
    MoreHorizontal,
    Waves,
    IndianRupee,
    Clock
} from "lucide-react";
import AlertsPanel from "../../components/cards/AlertsPanel";
import ViewAllModal from "../../components/modals/ViewAllModal";


export default function WaterPage() {
    const [timeRange, setTimeRange] = useState("1W");
    const [showModal, setShowModal] = useState(false);

    /* -------------------- DATA -------------------- */
    const chartData = {
        "1D": [
            { name: "00:00", value: 800 }, { name: "04:00", value: 650 },
            { name: "08:00", value: 1200 }, { name: "12:00", value: 1450 },
            { name: "16:00", value: 1300 }, { name: "20:00", value: 950 },
        ],
        "1W": [
            { name: "Mon", value: 1200 }, { name: "Tue", value: 1450 },
            { name: "Wed", value: 1350 }, { name: "Thu", value: 1600 },
            { name: "Fri", value: 1500 }, { name: "Sat", value: 1750 },
            { name: "Sun", value: 1650 },
        ],
        "1M": [
            { name: "Week 1", value: 8500 }, { name: "Week 2", value: 9200 },
            { name: "Week 3", value: 8900 }, { name: "Week 4", value: 9500 },
        ],
        "1Y": [
            { name: "Jan", value: 35000 }, { name: "Feb", value: 32000 },
            { name: "Mar", value: 38000 }, { name: "Apr", value: 36000 },
            { name: "May", value: 40000 }, { name: "Jun", value: 42000 },
            { name: "Jul", value: 41000 }, { name: "Aug", value: 45000 },
            { name: "Sep", value: 39000 }, { name: "Oct", value: 41000 },
            { name: "Nov", value: 38000 }, { name: "Dec", value: 36000 },
        ]
    };

    const breakdownData = [
        { name: "Dom", value: 45, color: "#06b6d4" },  // Cyan 500
        { name: "HVAC", value: 30, color: "#3b82f6" }, // Blue 500
        { name: "Irrig", value: 15, color: "#10b981" }, // Emerald 500
        { name: "Proc", value: 10, color: "#6366f1" },  // Indigo 500
    ];

    const alerts = [
        { id: 1, type: "critical", title: "Pump Failure", message: "Main supply pump detected failure.", timestamp: "2h ago" },
        { id: 2, type: "warning", title: "High Pressure", message: "Sector 4 pressure > 5 bar.", timestamp: "4h ago" },
    ];

    const meters = [
        { id: "WM-001", name: "Main Supply", location: "Pump Room", status: "active", current: "120.5 L/min", daily: "450 L" },
        { id: "WM-002", name: "Cooling Tower", location: "Roof", status: "active", current: "85.0 L/min", daily: "320 L" },
        { id: "WM-003", name: "Irrigation", location: "Garden", status: "inactive", current: "0.0 L/min", daily: "0 L" },
        { id: "WM-004", name: "Cafeteria", location: "Floor 1", status: "active", current: "25.4 L/min", daily: "150 L" },
        { id: "WM-005", name: "Fire Hydrant", location: "Gate A", status: "active", current: "0.0 L/min", daily: "0 L" },
        { id: "WM-006", name: "Rooftop Tank", location: "Roof", status: "active", current: "40.2 L/min", daily: "550 L" },
    ];

    const systemStatus = [
        { label: "Pressure", value: "3.2 bar", icon: Gauge, color: "text-cyan-400" },
        { label: "Temperature", value: "18°C", icon: Thermometer, color: "text-blue-400" },
        { label: "Flow Rate", value: "12.5 L/m", icon: Waves, color: "text-cyan-300" },
        { label: "pH Level", value: "7.2", icon: Activity, color: "text-green-400" },
        { label: "Turbidity", value: "0.5 NTU", icon: Droplet, color: "text-slate-300" },
        { label: "Chlorine", value: "0.8 mg/L", icon: Droplet, color: "text-teal-400" },
        { label: "Hardness", value: "120 mg/L", icon: Activity, color: "text-indigo-400" },
        { label: "Conductivity", value: "450 µS", icon: Activity, color: "text-yellow-400" },
        { label: "Pump Status", value: "Active", icon: Activity, color: "text-emerald-400" },
        { label: "Leak Check", value: "Pass", icon: CheckCircle, color: "text-emerald-400" },
        { label: "Battery", value: "100%", icon: Activity, color: "text-green-400" },
        { label: "Signal", value: "-60 dBm", icon: Activity, color: "text-blue-400" },
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
                        <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                            <Droplet className="text-cyan-400" size={24} fill="currentColor" fillOpacity={0.2} />
                        </div>
                        Water Dashboard
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
                {/* Total Usage - Droplet Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Droplet size={48} className="text-cyan-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Total Usage</span>
                        <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20 relative z-10">
                            <ArrowUpRight size={12} /> 12.5%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white neon-text-cyan mb-1 relative z-10">2,027 L</div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden relative z-10">
                        <div className="h-full bg-cyan-500 w-[65%]"></div>
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
                            <ArrowDownRight size={12} /> 8.2%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">₹ 2,450</div>
                    <p className="text-[10px] text-slate-500 relative z-10">Projected: ₹ 2,800</p>
                </div>

                {/* Daily Avg - Activity Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={48} className="text-cyan-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Daily Avg</span>
                        <div className="flex items-center gap-1 text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded text-[10px] border border-red-500/20 relative z-10">
                            <ArrowUpRight size={12} /> 5.2%
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">289 L</div>
                </div>

                {/* Peak Flow - Waves/Clock Icon */}
                <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Waves size={48} className="text-cyan-500" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-slate-400 text-xs uppercase tracking-wider relative z-10">Peak Flow</span>
                        <div className="flex items-center gap-1 text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded text-[10px] border border-white/5 relative z-10">
                            <Clock size={12} className="mr-1" /> 07:30
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 relative z-10">18 L/m</div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mt-auto relative z-10">
                        <div className="h-full bg-cyan-400 w-[50%]"></div>
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
                    <div className="text-3xl font-bold text-white neon-text-red mb-1 relative z-10">2</div>
                    <p className="text-[10px] text-red-400 font-semibold uppercase relative z-10">Active</p>
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
                                <Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={32} />
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
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold uppercase tracking-wider transition-colors"
                    >
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {meters.slice(0, 4).map((meter) => (
                        <div key={meter.id} className="p-4 rounded-xl bg-slate-800/40 border border-white/5 hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] hover:!bg-slate-800/40 transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{meter.name}</span>
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
                    <Activity size={18} className="text-cyan-400" />
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
                    title="All Water Meters"
                    data={meters}
                    columns={meterColumns}
                    onClose={() => setShowModal(false)}
                />
            )}

        </main>
    );
}
