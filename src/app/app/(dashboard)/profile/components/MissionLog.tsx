"use client";

import { motion } from "framer-motion";
import { Terminal, Clock, ShieldCheck, Zap } from "lucide-react";

const MOCK_LOGS = [
    {
        id: "1",
        type: "ACHIEVEMENT",
        message: "Promoted to Level 4 Operative",
        timestamp: "2 HOURS AGO",
        status: "SUCCESS"
    },
    {
        id: "2",
        type: "AUCTION",
        message: "Won bid for 'Legendary Armor' in Winter Siege",
        timestamp: "5 HOURS AGO",
        status: "COMPLETED"
    },
    {
        id: "3",
        type: "SYSTEM",
        message: "New tactical module 'Valorant' synchronized",
        timestamp: "1 DAY AGO",
        status: "VERIFIED"
    },
    {
        id: "4",
        type: "MISSION",
        message: "Completed 'First Bid' training protocol",
        timestamp: "2 DAYS AGO",
        status: "SUCCESS"
    }
];

export function MissionLog() {
    return (
        <div className="space-y-8 relative">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4 relative z-10">
                <div className="p-2 bg-[var(--primary)]/10 rounded-lg border border-[var(--primary)]/20">
                    <Terminal className="w-4 h-4 text-[var(--primary)]" />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white">Security Event Log</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Recent Intelligence</p>
                </div>
            </div>

            <div className="relative z-10">
                {/* Vertical Timeline Line */}
                <div className="absolute left-[23px] sm:left-[27px] top-0 bottom-0 w-[2px] bg-white/10 shadow-[0_0_5px_rgba(255,255,255,0.1)]" />

                <div className="space-y-6">
                    {MOCK_LOGS.map((log, index) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-14 sm:pl-20 group"
                        >
                            {/* Timeline Point */}
                            <div className="absolute left-[18px] sm:left-[22px] top-6 w-3 h-3 rounded-full bg-white/20 border-2 border-[#0B0E14] group-hover:bg-[var(--primary)] group-hover:shadow-[0_0_10px_rgba(0,240,255,0.8)] group-hover:scale-125 transition-all duration-300 z-10" />
                            {/* Glow behind point */}
                            <div className="absolute left-[13px] sm:left-[17px] top-[19px] w-5 h-5 rounded-full bg-[var(--primary)]/0 group-hover:bg-[var(--primary)]/20 transition-all duration-300 blur-sm pointer-events-none" />

                            <div className="bg-white/[0.02] border border-white/10 p-5 hover:bg-white/[0.04] hover:border-white/20 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] duration-300 rounded-2xl relative overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                                            {log.type === "ACHIEVEMENT" ? (
                                                <ShieldCheck className="w-5 h-5 text-[var(--secondary)] drop-shadow-[0_0_5px_rgba(176,38,255,0.8)]" />
                                            ) : log.type === "AUCTION" ? (
                                                <Zap className="w-5 h-5 text-[var(--primary)] drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]" />
                                            ) : (
                                                <Clock className="w-5 h-5 text-slate-300" />
                                            )}
                                        </div>
                                        <div className="space-y-1.5 pt-0.5 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[9px] font-bold text-[var(--primary)] uppercase tracking-widest bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-2 py-0.5 rounded shadow-[0_0_5px_rgba(0,240,255,0.1)]">{log.type}</span>
                                                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">[{log.id}]</span>
                                            </div>
                                            <p className="text-xs sm:text-sm font-bold text-white tracking-wide leading-tight group-hover:text-[var(--primary)] transition-colors break-words">
                                                {log.message}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2 ml-14 sm:ml-0 flex-shrink-0">
                                        <div className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                                            {log.timestamp}
                                        </div>
                                        <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-bold text-slate-300 uppercase tracking-wider group-hover:text-white transition-colors">
                                            {log.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
