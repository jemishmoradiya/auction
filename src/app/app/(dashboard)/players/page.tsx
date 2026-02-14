"use client";

import { useAuctionStore } from "@/store/useAuctionStore";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { PlayerRole } from "@/types";
import { PlayerCatalogCard } from "@/components/profile/PlayerCatalogCard";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PlayersPage() {
    const { players } = useAuctionStore();
    const [mounted, setMounted] = useState(false);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<PlayerRole | "All">("All");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const filteredPlayers = players.filter(player => {
        const matchesSearch = player.ign.toLowerCase().includes(search.toLowerCase()) ||
            player.name.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === "All" || player.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const roles: (PlayerRole | "All")[] = ["All", "IGL", "OG", "GENZ", "Flex", "Support"];

    return (
        <div className="min-h-screen bg-[#05070A] text-slate-200 relative overflow-hidden">
            {/* Background Cinematic Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--theme-primary)]/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--theme-accent)]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            <div className="max-w-[1600px] mx-auto p-8 lg:p-12 space-y-12 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                    <div className="space-y-1">
                        <h1 className="text-5xl font-black uppercase tracking-tighter text-white italic leading-none">
                            Player <span className="text-[var(--theme-primary)]">Intelligence</span>
                        </h1>
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
                            Tactical Profiling Area • {players.length} Active Signatures
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center gap-4 bg-white/5 px-6 py-2.5 rounded-2xl border border-white/10 backdrop-blur-xl">
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                                Aggregated Market Value
                            </span>
                            <span className="text-lg font-black text-[var(--theme-secondary)] tabular-nums italic tracking-tighter">
                                ₹{players.reduce((acc, p) => acc + p.basePrice, 0).toLocaleString()}k
                            </span>
                        </div>
                    </div>
                </div>

                {/* Search & Filters Toolbar */}
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                    {/* Search Input */}
                    <div className="relative w-full max-w-md group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[var(--theme-primary)] transition-all" />
                        <Input
                            placeholder="SEARCH SIGNATURES..."
                            className="pl-14 h-14 bg-white/[0.03] border-white/10 text-white placeholder:text-white/10 focus-visible:ring-1 focus-visible:ring-[var(--theme-primary)]/50 focus-visible:border-[var(--theme-primary)]/50 rounded-2xl transition-all font-black uppercase tracking-widest text-xs"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center p-1.5 bg-white/[0.03] rounded-[1.25rem] border border-white/10 backdrop-blur-xl overflow-x-auto max-w-full">
                        {roles.map((role) => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role)}
                                className={cn(
                                    "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap",
                                    roleFilter === role
                                        ? "bg-[var(--theme-primary)] text-black shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                                        : "text-white/30 hover:text-white/60 hover:bg-white/5"
                                )}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Data Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredPlayers.map((player) => (
                        <motion.div
                            layout
                            key={player.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PlayerCatalogCard
                                id={player.id}
                                ign={player.ign}
                                name={player.name}
                                role={player.role}
                                imageUrl={player.image}
                                stats={{
                                    kd: player.stats.kd,
                                    winRate: player.stats.winRate,
                                }}
                                basePrice={player.basePrice}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredPlayers.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-slate-600" />
                        </div>
                        <h3 className="text-slate-300 font-bold text-lg mb-1">No players found</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">
                            We couldn't find any players matching "{search}" with the selected filters.
                        </p>
                        <button
                            onClick={() => { setSearch(""); setRoleFilter("All"); }}
                            className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
