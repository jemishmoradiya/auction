"use client";

import { useAuctionStore } from "@/store/useAuctionStore";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { CreateTournamentModal } from "@/components/tournaments/CreateTournamentModal";
import { Button } from "@/components/ui/button";
import { Plus, Trophy, Target, Zap, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TournamentsPage() {
    const { tournaments } = useAuctionStore();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex-1 space-y-12 p-4 md:p-8 max-w-7xl mx-auto relative bg-[var(--background)] text-white overflow-hidden font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8 relative z-10">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white font-heading leading-none text-shadow-sm">
                        Tournament<span className="text-[var(--primary)] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">Archive</span>
                    </h1>
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                        <Zap className="w-4 h-4" />
                        Strategic Orchestration of Competitive Theatres
                    </div>
                </div>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-[var(--primary)] hover:bg-[#00F0FF]/90 text-[#0B0E14] font-black uppercase tracking-wider px-8 md:px-10 h-14 md:h-16 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:-translate-y-1 transition-all gap-3 group text-sm"
                >
                    <Plus className="w-6 h-6 stroke-[3] group-hover:rotate-90 transition-transform duration-500" />
                    New Theatre
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {[
                    { label: "Active Connections", value: tournaments.filter(t => t.status === 'LIVE').length, icon: Target, glowColor: "rgba(0,240,255,0.5)", accentClass: "text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/30" },
                    { label: "Aggregated Prize Pool", value: `₹${tournaments.reduce((acc, t) => acc + t.prizePool, 0).toLocaleString()}`, icon: Trophy, glowColor: "rgba(176,38,255,0.5)", accentClass: "text-[var(--secondary)] bg-[var(--secondary)]/10 border-[var(--secondary)]/30" },
                    { label: "Deployment Capacity", value: tournaments.length, icon: LayoutGrid, glowColor: "rgba(255,255,255,0.3)", accentClass: "text-white bg-white/5 border-white/10" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/[0.02] border border-white/10 p-8 rounded-[2rem] shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:-translate-y-2 hover:bg-white/[0.04] transition-all group flex flex-col justify-between backdrop-blur-xl relative overflow-hidden"
                    >
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10 relative z-10">
                            <div className={`p-4 rounded-xl border ${stat.accentClass} shadow-[0_0_15px_${stat.glowColor}] group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon className="w-8 h-8 drop-shadow-md" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex-1">{stat.label}</span>
                        </div>
                        <div className="text-4xl md:text-5xl font-black text-white tracking-tighter relative z-10">
                            {stat.value}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {tournaments.length > 0 ? (
                        tournaments.map((tournament, i) => (
                            <motion.div
                                key={tournament.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <TournamentCard tournament={tournament} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center border border-white/10 bg-white/[0.02] rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-50" />
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="inline-flex p-6 rounded-2xl bg-[var(--primary)]/10 mb-6 border border-[var(--primary)]/30 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                                    <Trophy className="w-12 h-12 text-[var(--primary)] drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                                </div>
                                <h3 className="text-4xl font-black uppercase tracking-tight text-white font-heading leading-none text-shadow-sm">No Active Theatres</h3>
                                <p className="text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mt-6 shadow-[0_0_10px_rgba(0,240,255,0.2)]">Initialize transmission to begin auction sequence</p>
                                <Button
                                    variant="link"
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="text-white hover:text-[var(--primary)] font-bold uppercase tracking-widest text-sm mt-8 pb-1 transition-all h-auto group"
                                >
                                    <span className="border-b border-white/30 group-hover:border-[var(--primary)] pb-1 transition-colors">Start Transmission</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </AnimatePresence>

            <CreateTournamentModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
}
