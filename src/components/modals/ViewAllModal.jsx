import React from "react";
import { X } from "lucide-react";

export default function ViewAllModal({ title, data, columns, onClose }) {
    if (!data) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-6 custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                {columns.map((col, idx) => (
                                    <th
                                        key={idx}
                                        className="p-3 text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-white/5 bg-slate-900/50 sticky top-0"
                                    >
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="p-3 text-sm text-slate-300">
                                            {col.render ? col.render(row) : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
