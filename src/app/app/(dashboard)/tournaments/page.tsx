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
        <div className="flex-1 space-y-12 p-8 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background Cinematic Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--theme-primary)]/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--theme-secondary)]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[var(--theme-primary)] font-black uppercase tracking-[0.4em] text-[9px]">
                        <Zap className="w-3 h-3 fill-current animate-pulse" />
                        Infrastructure Node
                    </div>
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white font-heading leading-none">
                        Tournament <span className="text-[var(--theme-primary)]">Archive</span>
                    </h1>
                    <p className="text-white/30 font-bold uppercase tracking-widest text-[10px] max-w-md pt-2">
                        Strategic Orchestration of Competitive Theatres
                    </p>
                </div>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-[var(--theme-primary)] text-black hover:bg-[var(--theme-primary)]/90 font-black uppercase tracking-widest px-10 h-14 shadow-[0_10px_40px_-10px_rgba(0,229,255,0.4)] gap-3 group rounded-2xl"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                    New Theatre
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {[
                    { label: "Active Connections", value: tournaments.filter(t => t.status === 'LIVE').length, icon: Target, color: "text-[var(--theme-accent)]" },
                    { label: "Aggregated Prize Pool", value: `₹${tournaments.reduce((acc, t) => acc + t.prizePool, 0).toLocaleString()}`, icon: Trophy, color: "text-[var(--theme-primary)]" },
                    { label: "Deployment Capacity", value: tournaments.length, icon: LayoutGrid, color: "text-[var(--theme-secondary)]" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] hover:border-[var(--theme-primary)]/30 backdrop-blur-3xl transition-all duration-500 group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 font-heading">{stat.label}</span>
                        </div>
                        <div className="text-4xl font-black text-white font-mono italic tracking-tighter">
                            {stat.value}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <div className="col-span-full py-24 text-center border border-white/5 rounded-[2.5rem] bg-white/[0.01] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-[var(--theme-primary)]/5 to-transparent opacity-50" />
                            <div className="relative z-10">
                                <div className="inline-block p-6 rounded-3xl bg-white/5 mb-6 border border-white/10">
                                    <Trophy className="w-10 h-10 text-[var(--theme-primary)] opacity-40 animate-pulse" />
                                </div>
                                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white/80 font-heading leading-none">No Active Theatres</h3>
                                <p className="text-white/20 text-xs font-bold uppercase tracking-widest mt-4">Initialize transmission to begin auction sequence</p>
                                <Button
                                    variant="link"
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="text-[var(--theme-primary)] font-black uppercase tracking-[0.4em] text-[10px] mt-8 hover:tracking-[0.6em] transition-all"
                                >
                                    Start Transmission
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
