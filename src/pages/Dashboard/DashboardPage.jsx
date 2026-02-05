import React, { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";
import {
    Zap,
    Droplet,
    Flame,
    Sun,
    Globe,
    Activity,
    AlertOctagon,
    WifiOff
} from "lucide-react";
import AlertsPanel from "../../components/cards/AlertsPanel";


export default function DashboardPage() {
    const [consumptionTimeRange, setConsumptionTimeRange] = useState("1M");
    const [activeSource, setActiveSource] = useState("Energy");

    const sourceConfig = {
        Energy: { color: "#10b981", label: "Energy" },
        Water: { color: "#0ea5e9", label: "Water" },
        Gas: { color: "#f59e0b", label: "Gas" },
        Solar: { color: "#8b5cf6", label: "Solar" }
    };

    /* -------------------- METRICS -------------------- */
    const totalMeters = 120;
    const activeMeters = 70;
    const inactiveMeters = 35;
    const deactiveMeters = 15;

    const pieData = [
        { name: "Active", value: activeMeters, color: "#10b981" },
        { name: "Inactive", value: inactiveMeters, color: "#f59e0b" },
        { name: "Deactive", value: deactiveMeters, color: "#ef4444" },
    ];

    /* -------------------- CONSUMPTION DATA -------------------- */
    /* -------------------- CONSUMPTION DATA -------------------- */
    const dashboardChartData = {
        "1D": [
            { name: "00:00", Energy: 120, Water: 80, Gas: 40, Solar: 0 },
            { name: "06:00", Energy: 350, Water: 200, Gas: 150, Solar: 50 },
            { name: "12:00", Energy: 450, Water: 300, Gas: 200, Solar: 400 },
            { name: "18:00", Energy: 380, Water: 250, Gas: 180, Solar: 100 },
        ],
        "1W": [
            { name: "Mon", Energy: 4000, Water: 2400, Gas: 2400, Solar: 2000 },
            { name: "Tue", Energy: 3000, Water: 1398, Gas: 2210, Solar: 3000 },
            { name: "Wed", Energy: 2000, Water: 9800, Gas: 2290, Solar: 2800 },
            { name: "Thu", Energy: 2780, Water: 3908, Gas: 2000, Solar: 3200 },
            { name: "Fri", Energy: 1890, Water: 4800, Gas: 2181, Solar: 2600 },
            { name: "Sat", Energy: 2390, Water: 3800, Gas: 2500, Solar: 3800 },
            { name: "Sun", Energy: 3490, Water: 4300, Gas: 2100, Solar: 4100 },
        ],
        "1M": [
            { name: "Week 1", Energy: 15000, Water: 12000, Gas: 9000, Solar: 10000 },
            { name: "Week 2", Energy: 18000, Water: 11000, Gas: 9500, Solar: 12000 },
            { name: "Week 3", Energy: 16000, Water: 13000, Gas: 8800, Solar: 9000 },
            { name: "Week 4", Energy: 19000, Water: 12500, Gas: 9200, Solar: 11000 },
        ],
        "1Y": [
            { name: "Q1", Energy: 45000, Water: 40000, Gas: 30000, Solar: 35000 },
            { name: "Q2", Energy: 48000, Water: 42000, Gas: 28000, Solar: 45000 },
            { name: "Q3", Energy: 52000, Water: 45000, Gas: 25000, Solar: 50000 },
            { name: "Q4", Energy: 49000, Water: 41000, Gas: 32000, Solar: 30000 },
        ]
    };

    /* -------------------- ALERTS -------------------- */
    const alerts = [
        { id: 1, type: "critical", title: "Meters Offline", message: "South Hub: 5 meters offline", timestamp: "10m" },
        { id: 2, type: "warning", title: "High Usage", message: "West Plant: Usage spike detected", timestamp: "25m" },
        { id: 3, type: "info", title: "Maintenance", message: "North Branch: Scheduled maintenance", timestamp: "1h" },
        { id: 4, type: "success", title: "System Restored", message: "East Grid back online", timestamp: "2h" },
        { id: 5, type: "warning", title: "Pressure Drop", message: "Sector 4 water pressure low", timestamp: "3h" },
    ];

    /* -------------------- LIVE PARAMETERS -------------------- */
    const liveParams = [
        { label: "Grid Freq", value: "50.02 Hz", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { label: "Water Pres", value: "3.4 bar", icon: Droplet, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
        { label: "Gas PSI", value: "2.1 psi", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
        { label: "Solar Out", value: "4.2 kW", icon: Sun, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
        { label: "Avg Temp", value: "24°C", icon: Globe, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { label: "Humidity", value: "45%", icon: Droplet, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
    ];

    return (
        <main className="flex-1 flex flex-col gap-6 p-4 md:p-6 overflow-y-auto custom-scrollbar">

            {/* -------------------- ROW 1: OVERVIEW CARDS -------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Total Meter Status */}
                <div className="glass-panel rounded-2xl p-5 flex flex-col relative overflow-hidden group border border-white/5 hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] hover:!bg-slate-800/40 transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Zap size={80} className="text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-4 z-10">Total Meter Status</h3>
                    <div className="flex items-center justify-between z-10">
                        <div className="relative w-24 h-24">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData} innerRadius={35} outerRadius={45} paddingAngle={4} dataKey="value" stroke="none">
                                        {pieData.map((entry, idx) => (
                                            <Cell key={idx} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-xl font-bold text-white">{totalMeters}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-xs">
                            {pieData.map((p, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-300">
                                    <div className="w-2 h-2 rounded-full shadow-[0_0_8px]" style={{ backgroundColor: p.color, boxShadow: `0 0 5px ${p.color}` }} />
                                    <span>{p.name}: <span className="text-white font-mono">{p.value}</span></span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Active System Issues */}
                <div className="glass-panel rounded-2xl p-5 flex flex-col relative overflow-hidden group border border-white/5 hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] hover:!bg-slate-800/40 transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertOctagon size={80} className="text-red-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-4 z-10">Active System Issues</h3>
                    <div className="flex flex-col gap-3 z-10">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20 group/item hover:bg-red-500/20 transition-colors">
                            <div className="flex items-center gap-3">
                                <WifiOff size={18} className="text-red-400" />
                                <span className="text-sm text-red-200">Offline Meters</span>
                            </div>
                            <span className="text-lg font-bold text-white neon-text-red">5</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 group/item hover:bg-amber-500/20 transition-colors">
                            <div className="flex items-center gap-3">
                                <Activity size={18} className="text-amber-400" />
                                <span className="text-sm text-amber-200">High Usage</span>
                            </div>
                            <span className="text-lg font-bold text-white neon-text-amber">2</span>
                        </div>
                    </div>
                </div>

                {/* Live Sites Placeholder */}
                <div className="glass-panel rounded-2xl p-5 flex flex-col relative overflow-hidden group border border-white/5 hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] hover:!bg-slate-800/40 transition-all duration-300">
                    <div className="absolute bottom-2 right-2 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Globe size={80} className="text-blue-500" />
                    </div>
                    <div className="flex justify-between items-center mb-4 z-10">
                        <h3 className="text-sm font-semibold text-slate-300">Live Sites</h3>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                    </div>

                    <div className="flex-1 bg-slate-800/50 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                        {/* Simplified Map UI Element */}
                        <div className="absolute inset-0 opacity-30 flex items-center justify-center">
                            <Globe size={60} className="text-slate-600" />
                        </div>
                        <div className="z-10 text-center">
                            <span className="text-2xl font-bold text-white block">Global View</span>
                            <span className="text-xs text-blue-400">Map Interface Loading...</span>
                        </div>
                    </div>
                </div>

                {/* System Health */}
                <div className="glass-panel rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden group border border-white/5 hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] hover:!bg-slate-800/40 transition-all duration-300">
                    <h3 className="text-sm font-semibold text-slate-300 absolute top-5 left-5">System Health</h3>
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                            <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="351.86" strokeDashoffset="35.186" className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-bold text-white tracking-tighter neon-text-green">98.5%</span>
                            <span className="text-[10px] text-emerald-400 uppercase tracking-widest mt-1">Operational</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* -------------------- ROW 2: CONSUMPTION + ALERTS -------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
                {/* Consumption Graph */}
                <div className="lg:col-span-2 glass-panel rounded-2xl p-6 flex flex-col min-h-[400px]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-white">Consumption Overview</h3>
                            <p className="text-xs text-slate-400">Usage trends for {activeSource}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                            {/* Source Selector */}
                            <div className="flex bg-slate-800/80 p-1 rounded-lg border border-white/10">
                                {['All', ...Object.keys(sourceConfig)].map((source) => (
                                    <button
                                        key={source}
                                        onClick={() => setActiveSource(source)}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeSource === source
                                            ? 'bg-slate-600 text-white shadow-lg'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                            }`}
                                        style={source !== 'All' && activeSource === source ? { backgroundColor: sourceConfig[source].color } : {}}
                                    >
                                        {source}
                                    </button>
                                ))}
                            </div>

                            {/* Time Filter */}
                            <div className="flex bg-slate-800/80 p-1 rounded-lg border border-white/10">
                                {['1D', '1W', '1M', '1Y'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setConsumptionTimeRange(t)}
                                        className={`px-3 py-1 text-xs rounded-md transition-all ${consumptionTimeRange === t
                                            ? 'bg-[#ff6e00] text-white shadow-md shadow-orange-900/20 font-bold'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,110,0,0.3)]'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dashboardChartData[consumptionTimeRange]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', color: '#f1f5f9' }}
                                    itemStyle={{ color: '#f1f5f9' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                {activeSource === 'All' ? (
                                    <>
                                        {Object.keys(sourceConfig).map((source) => (
                                            <Bar
                                                key={source}
                                                dataKey={source}
                                                fill={sourceConfig[source].color}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <Bar
                                        dataKey={activeSource}
                                        fill={sourceConfig[activeSource].color}
                                        radius={[4, 4, 0, 0]}
                                        name={activeSource}
                                    />
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Alerts Panel */}
                <div className="glass-panel rounded-2xl p-6 lg:col-span-1 border-t-4 border-t-rose-500/50">
                    <AlertsPanel alerts={alerts} />
                </div>
            </div>

            {/* -------------------- ROW 3: LIVE PARAMETERS -------------------- */}
            <div className="pb-4">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-blue-400" />
                    Live System Parameters
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {liveParams.map((param, index) => (
                        <div key={index} className={`glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center group border border-white/5 hover:!border-[#ff6e00] hover:!shadow-[0_0_15px_rgba(255,110,0,0.3)] hover:!bg-slate-800/40 transition-all duration-300`}>
                            <div className={`p-2.5 rounded-full mb-3 ${param.bg} group-hover:scale-110 transition-transform duration-300`}>
                                <param.icon size={20} className={param.color} />
                            </div>
                            <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">{param.label}</span>
                            <span className={`text-lg font-bold text-white ${param.color.replace('text-', 'neon-text-')}`}>{param.value}</span>
                        </div>
                    ))}
                </div>
            </div>

        </main>
    );
}
