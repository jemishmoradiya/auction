"use client";

import { useAuctionStore } from "@/store/useAuctionStore";
import { Input } from "@/components/ui/input";
import { Search, Users, Shield, Zap, Target, Crosshair, LayoutGrid, Filter, CheckCircle2, Trophy, List } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { PlayerRole } from "@/types";
import { PlayerCatalogCard } from "@/components/profile/PlayerCatalogCard";
import { PlayerListRow } from "@/components/profile/PlayerListRow";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PremiumTabs, PremiumTabsList, PremiumTabsTrigger } from "@/components/ui/premium-tabs";
import { GlassCard, CardContent } from "@/components/ui/glass-card";

export default function PlayersPage() {
    const { players } = useAuctionStore();
    const [mounted, setMounted] = useState(false);
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState<PlayerRole | "All">("All");

    // View Modes
    const [viewMode, setViewMode] = useState<"card" | "list">("card");

    // Additional Filters
    const [rankFilter, setRankFilter] = useState<string>("All");
    const [verificationFilter, setVerificationFilter] = useState<string>("All");

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredPlayers = useMemo(() => {
        return players.filter(player => {
            const matchesSearch = player.ign.toLowerCase().includes(search.toLowerCase()) ||
                player.name.toLowerCase().includes(search.toLowerCase());
            const matchesRole = activeTab === "All" || player.role === activeTab;
            const matchesRank = rankFilter === "All" || player.stats.rank === rankFilter;
            const matchesVerification = verificationFilter === "All" || player.verificationStatus === verificationFilter;
            const isPublic = player.privacySettings?.mode !== 'classified';

            return matchesSearch && matchesRole && matchesRank && matchesVerification && isPublic;
        });
    }, [players, search, activeTab, rankFilter, verificationFilter]);

    if (!mounted) return (
        <div className="flex-1 flex items-center justify-center bg-background min-h-screen">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
    );

    const navItems = [
        { icon: LayoutGrid, label: "All Players", id: "All" },
        { icon: Target, label: "IGL", id: "IGL" },
        { icon: Shield, label: "OG", id: "OG" },
        { icon: Zap, label: "GENZ", id: "GENZ" },
        { icon: Crosshair, label: "Flex", id: "Flex" },
        { icon: Users, label: "Support", id: "Support" },
    ];

    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col overflow-x-hidden text-white font-sans tactical-grain">
            {/* Ambient Background Aura */}
            <div className="fixed inset-0 bg-gradient-to-tr from-[var(--primary)]/5 via-transparent to-[var(--secondary)]/5 pointer-events-none z-0" />

            {/* Premium Header Section */}
            <div className="relative z-10 px-4 sm:px-8 md:px-12 py-10 border-b border-white/10 bg-white/[0.01] backdrop-blur-md">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
                        <div className="flex flex-col space-y-2">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                                <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic font-heading text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    Player <span className="text-[var(--primary)]">Directory</span>
                                </h1>
                                <span className="px-3 py-1 rounded-sm bg-[var(--primary)]/10 border-l-2 border-[var(--primary)] text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                                    {players.length} TOTAL PLAYERS
                                </span>
                            </div>
                            <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.15em] font-mono">
                                Official Player Database • Verified Rosters
                            </p>
                        </div>
                    </div>

                    {/* Premium Navigation Tabs + View Toggle */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center w-full sm:w-auto overflow-x-auto no-scrollbar pt-2">
                            <PremiumTabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                                <PremiumTabsList className="w-full sm:w-auto justify-start bg-white/5 p-1 h-auto rounded-xl border border-white/10">
                                    {navItems.map((item) => (
                                        <PremiumTabsTrigger
                                            key={item.id}
                                            value={item.id}
                                            activeTab={activeTab}
                                            className="px-8 py-3 flex-1 sm:flex-none font-heading tracking-[0.2em] text-xs font-black uppercase italic"
                                        >
                                            <item.icon className={`h-3.5 w-3.5 mr-3 ${activeTab === item.id ? "text-[var(--primary)]" : "opacity-30"}`} />
                                            {item.label}
                                        </PremiumTabsTrigger>
                                    ))}
                                </PremiumTabsList>
                            </PremiumTabs>
                        </div>

                        {/* View Switcher Toggle */}
                        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
                            <button
                                onClick={() => setViewMode("card")}
                                className={cn(
                                    "p-2.5 rounded-lg transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                                    viewMode === "card"
                                        ? "bg-[var(--primary)] text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                                        : "text-slate-400 hover:text-white"
                                )}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                <span className={cn(viewMode === "card" ? "block" : "hidden sm:block")}>Grid</span>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "p-2.5 rounded-lg transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                                    viewMode === "list"
                                        ? "bg-[var(--primary)] text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                                        : "text-slate-400 hover:text-white"
                                )}
                            >
                                <List className="w-4 h-4" />
                                <span className={cn(viewMode === "list" ? "block" : "hidden sm:block")}>List</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-12 py-10 relative z-10 perspective-1000">
                <div className="max-w-[1400px] mx-auto space-y-8">
                    {/* Tactical Filtering Section */}
                    <GlassCard className="border-white/5 bg-white/[0.01]">
                        <CardContent className="p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-center">
                            {/* Search */}
                            <div className="relative w-full lg:max-w-md group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[var(--primary)] transition-colors" />
                                <Input
                                    placeholder="SEARCH BY IGN OR NAME..."
                                    className="pl-11 h-12 bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[var(--primary)] focus-visible:border-[var(--primary)] rounded-lg transition-all font-bold uppercase tracking-widest text-[10px]"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* Rank Filter */}
                            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
                                    <Trophy className="w-3 h-3" /> RANK:
                                </span>
                                <div className="flex items-center gap-2">
                                    {["All", "Legendary", "Grandmaster", "Master"].map(rank => (
                                        <button
                                            key={rank}
                                            onClick={() => setRankFilter(rank)}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                                                rankFilter === rank
                                                    ? "bg-[var(--primary)]/20 border-[var(--primary)]/50 text-[var(--primary)] shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                                                    : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                                            )}
                                        >
                                            {rank}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Verification Filter */}
                            <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto no-scrollbar">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3" /> VERIFICATION:
                                </span>
                                <div className="flex items-center gap-2">
                                    {[
                                        { id: "All", label: "All Status", icon: Filter },
                                        { id: "verified", label: "Verified", icon: CheckCircle2 },
                                        { id: "pending", label: "Pending", icon: Users },
                                        { id: "none", label: "Unverified", icon: Shield },
                                    ].map(v => (
                                        <button
                                            key={v.id}
                                            onClick={() => setVerificationFilter(v.id)}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap flex items-center gap-2",
                                                verificationFilter === v.id
                                                    ? "bg-[var(--secondary)]/20 border-[var(--secondary)]/50 text-[var(--secondary)] shadow-[0_0_15px_rgba(176,38,255,0.1)]"
                                                    : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                                            )}
                                        >
                                            <v.icon className="w-3 h-3" />
                                            {v.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </GlassCard>

                    <div className="flex items-center justify-between">
                        <div className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                            Database Report • <span className="text-white">{filteredPlayers.length}</span> Results Found
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab + search + rankFilter + verificationFilter + viewMode}
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.02, y: -10 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                                mass: 1
                            }}
                        >
                            {filteredPlayers.length > 0 ? (
                                viewMode === "card" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredPlayers.map((player) => (
                                            <PlayerCatalogCard
                                                key={player.id}
                                                id={player.id}
                                                ign={player.ign}
                                                name={player.name}
                                                role={player.role}
                                                imageUrl={player.image}
                                                stats={{
                                                    kd: player.stats.kd,
                                                    winRate: player.stats.winRate,
                                                }}
                                                verificationStatus={player.verificationStatus as any}
                                                privacySettings={player.privacySettings}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        {filteredPlayers.map((player) => (
                                            <PlayerListRow
                                                key={player.id}
                                                id={player.id}
                                                ign={player.ign}
                                                name={player.name}
                                                role={player.role}
                                                imageUrl={player.image}
                                                stats={{
                                                    kd: player.stats.kd,
                                                    winRate: player.stats.winRate,
                                                    rank: player.stats.rank || "Unranked"
                                                }}
                                                verificationStatus={player.verificationStatus as any}
                                                privacySettings={player.privacySettings}
                                            />
                                        ))}
                                    </div>
                                )
                            ) : (
                                <GlassCard className="border-dashed border-white/10 bg-transparent">
                                    <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6">
                                            <Search className="w-8 h-8 text-slate-500" />
                                        </div>
                                        <h3 className="text-xl font-black uppercase tracking-tight mb-2 font-heading">No Intel Found</h3>
                                        <p className="text-slate-500 text-xs font-bold max-w-xs mx-auto mb-8 font-mono uppercase tracking-widest">
                                            Zero matches for the selected tactical filters.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSearch("");
                                                setActiveTab("All");
                                                setRankFilter("All");
                                                setVerificationFilter("All");
                                            }}
                                            className="text-[var(--primary)] text-[10px] font-black uppercase tracking-[0.2em] border border-[var(--primary)]/20 px-6 py-2 rounded-sm hover:bg-[var(--primary)]/10 transition-all"
                                        >
                                            Reset All Parameters
                                        </button>
                                    </CardContent>
                                </GlassCard>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
