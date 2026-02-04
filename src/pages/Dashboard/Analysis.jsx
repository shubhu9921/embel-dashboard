import React, { useState, useMemo } from "react";
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
    Cell
} from "recharts";
import {
    LineChart,
    MoreHorizontal
} from "lucide-react";
import ViewAllModal from "../../components/modals/ViewAllModal";

export default function AnalysisPage() {
    const [timeRange, setTimeRange] = useState("1M");
    const [showModal, setShowModal] = useState(false);

    /* -------------------- DATA -------------------- */
    const trendData = {
        "1D": [
            { name: "00:00", Energy: 120, Gas: 80, Water: 200, Solar: 0 },
            { name: "06:00", Energy: 300, Gas: 150, Water: 400, Solar: 50 },
            { name: "12:00", Energy: 450, Gas: 100, Water: 500, Solar: 400 },
            { name: "18:00", Energy: 380, Gas: 200, Water: 600, Solar: 100 },
        ],
        "1W": [
            { name: "Mon", Energy: 4000, Gas: 2400, Water: 2400, Solar: 2000 },
            { name: "Tue", Energy: 3000, Gas: 1398, Water: 2210, Solar: 2210 },
            { name: "Wed", Energy: 2000, Gas: 3800, Water: 2290, Solar: 2290 },
            { name: "Thu", Energy: 2780, Gas: 3908, Water: 2000, Solar: 2400 },
            { name: "Fri", Energy: 1890, Gas: 4800, Water: 2181, Solar: 2181 },
            { name: "Sat", Energy: 2390, Gas: 3800, Water: 2500, Solar: 2800 },
            { name: "Sun", Energy: 3490, Gas: 4300, Water: 2100, Solar: 3100 },
        ],
        "1M": [
            { name: "W1", Energy: 15000, Gas: 12000, Water: 14000, Solar: 10000 },
            { name: "W2", Energy: 14500, Gas: 11500, Water: 13800, Solar: 11000 },
            { name: "W3", Energy: 16000, Gas: 13000, Water: 14500, Solar: 9500 },
            { name: "W4", Energy: 15500, Gas: 12500, Water: 14200, Solar: 10500 },
        ],
        "1Y": [
            { name: "Q1", Energy: 45000, Gas: 35000, Water: 42000, Solar: 30000 },
            { name: "Q2", Energy: 48000, Gas: 32000, Water: 44000, Solar: 45000 },
            { name: "Q3", Energy: 52000, Gas: 30000, Water: 46000, Solar: 50000 },
            { name: "Q4", Energy: 50000, Gas: 38000, Water: 43000, Solar: 35000 },
        ]
    };

    // Calculate Breakdown Data dynamically
    const breakdownData = useMemo(() => {
        const currentData = trendData[timeRange];
        const totals = currentData.reduce((acc, item) => ({
            Energy: acc.Energy + item.Energy,
            Gas: acc.Gas + item.Gas,
            Water: acc.Water + item.Water,
            Solar: acc.Solar + item.Solar,
        }), { Energy: 0, Gas: 0, Water: 0, Solar: 0 });

        const totalSum = Object.values(totals).reduce((a, b) => a + b, 0);

        return [
            { name: "Energy", value: totals.Energy, color: "#3b82f6", percent: ((totals.Energy / totalSum) * 100).toFixed(1) },
            { name: "Gas", value: totals.Gas, color: "#f97316", percent: ((totals.Gas / totalSum) * 100).toFixed(1) },
            { name: "Water", value: totals.Water, color: "#06b6d4", percent: ((totals.Water / totalSum) * 100).toFixed(1) },
            { name: "Solar", value: totals.Solar, color: "#f59e0b", percent: ((totals.Solar / totalSum) * 100).toFixed(1) },
        ];
    }, [timeRange]);


    const analyzedDevices = [
        { id: "D-001", name: "Main Pump", location: "Basement", status: "active", current: "12.5 units", daily: "120 kWh" },
        { id: "D-002", name: "Solar Inverter", location: "Roof", status: "warning", current: "8.2 units", daily: "85 kWh" },
        { id: "D-003", name: "Meter A1", location: "Floor 1", status: "active", current: "4.2 units", daily: "45 kWh" },
        { id: "D-004", name: "Gas Sensor", location: "Kitchen", status: "inactive", current: "0.0 m³", daily: "0 m³" },
        { id: "D-005", name: "Boiler B1", location: "Boiler Room", status: "active", current: "15.0 m³", daily: "120 m³" },
        { id: "D-006", name: "Chiller 2", location: "Plant Room", status: "active", current: "45.0 kWh", daily: "400 kWh" },
    ];

    const liveParams = [
        { label: "Grid Frequency", value: "50.02 Hz", status: "Optimal", color: "text-blue-400" },
        { label: "Avg Power Factor", value: "0.96", status: "Optimal", color: "text-purple-400" },
        { label: "Water Pressure", value: "3.4 bar", status: "Optimal", color: "text-cyan-400" },
        { label: "Gas Line PSI", value: "2.1 psi", status: "Optimal", color: "text-orange-400" },
    ];

    const deviceColumns = [
        { header: "ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "Location", accessor: "location" },
        { header: "Current", accessor: "current" },
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

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-xl border-0">
                    <p className="text-slate-900 font-bold text-sm mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-slate-700">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.fill }}></span>
                            <span className="font-semibold">{entry.name}:</span>
                            <span>{entry.value}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <main className="flex-1 flex flex-col gap-6 p-4 md:p-6 overflow-y-auto custom-scrollbar">
            {/* -------------------- HEADER -------------------- */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                            <LineChart className="text-indigo-400" size={24} fill="currentColor" fillOpacity={0.2} />
                        </div>
                        Resource Analysis
                    </h1>
                    <p className="text-slate-400 text-sm mt-1 ml-12">Comparative insights & parameters</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 rounded-lg text-sm border border-white/5 transition-colors">
                        Export Data
                    </button>
                </div>
            </div>

            {/* -------------------- ROW 1: TRENDS & DISTRIBUTION -------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cross-Resource Trends (Span 2) */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Cross-Resource Trends</h3>
                        </div>
                        <div className="flex bg-slate-800/80 p-1 rounded-lg border border-white/10">
                            {['1D', '1W', '1M', '1Y'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTimeRange(t)}
                                    className={`px-3 py-1 text-xs rounded-md transition-all ${timeRange === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-[400px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData[timeRange]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                <Bar dataKey="Energy" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Gas" fill="#f97316" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Solar" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Water" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Resource Distribution (Span 1) */}
                <div className="lg:col-span-1 glass-panel p-6 rounded-2xl flex flex-col min-h-[350px]">
                    <h3 className="text-lg font-bold text-white mb-4">Total Distribution</h3>
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="h-48 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={breakdownData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {breakdownData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip offset={20} contentStyle={{ backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '8px', border: 'none', fontWeight: 'bold' }} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-bold text-white">100%</span>
                                <span className="text-xs text-slate-400">Total</span>
                            </div>
                        </div>

                        {/* Legend with Values and Percentages */}
                        <div className="w-full space-y-3 mt-6">
                            {breakdownData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-sm text-slate-300">{item.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-white block">{item.value.toLocaleString()}</span>
                                        <span className="text-xs text-slate-500">{item.percent}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* -------------------- ROW 2: DEVICES & PARAMS -------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Analyzed Devices List */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">Analyzed Devices</h3>
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold uppercase tracking-wider transition-colors"
                        >
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {analyzedDevices.slice(0, 4).map((device) => (
                            <div key={device.id} className="p-4 rounded-xl bg-slate-800/40 border border-white/5 hover:border-indigo-500/30 transition-all group">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{device.name}</span>
                                        <span className="text-[10px] text-slate-500">{device.id}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${device.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                                        device.status === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                                            'bg-slate-700 text-slate-400'
                                        }`}>
                                        {device.status}
                                    </span>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-xs text-slate-400 block mb-0.5">Current</span>
                                        <span className="text-lg font-bold text-white">{device.current}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-slate-500 block mb-0.5">Daily Usage</span>
                                        <span className="text-sm font-mono text-slate-300">{device.daily}</span>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
                                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                        <MoreHorizontal size={12} /> {device.location}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Live Params ONLY (Distribution moved up) */}
                <div className="flex flex-col gap-6">
                    {/* Live Params: Expanded to full height of this column now */}
                    <div className="glass-panel p-5 rounded-2xl flex-1">
                        <h3 className="text-md font-bold text-white mb-4">Live System Parameters</h3>
                        <div className="space-y-4">
                            {liveParams.map((param, i) => (
                                <div key={i} className="glass-card flex items-center justify-between p-3 rounded-xl group">
                                    <div>
                                        <p className="text-xs text-slate-400">{param.label}</p>
                                        <p className={`text-lg font-bold font-mono ${param.color}`}>{param.value}</p>
                                    </div>
                                    <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        {param.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* View All Modal */}
            {showModal && (
                <ViewAllModal
                    title="Analyzed Devices"
                    data={analyzedDevices}
                    columns={deviceColumns}
                    onClose={() => setShowModal(false)}
                />
            )}

        </main>
    );
}
