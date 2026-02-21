"use client";

import { useAuctionStore } from "@/store/useAuctionStore";
import { useParams, useRouter } from "next/navigation";
import {
    User,
    ChevronLeft,
    CheckCircle2,
    Globe,
    Target,
    Zap,
    Shield,
    Trophy,
    Cpu,
    Mouse,
    Keyboard,
    Headphones,
    Twitter,
    Instagram,
    Youtube,
    Gamepad2,
    Medal,
    BarChart3
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GlassCard, CardContent } from "@/components/ui/glass-card";
import { useState, useEffect } from "react";

export default function PlayerDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { players } = useAuctionStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const player = players.find(p => p.id === params.id);
    const isPrivate = player?.privacySettings?.mode === 'classified';

    if (!mounted) return null;

    if (!player || isPrivate) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
                <GlassCard className="max-w-md w-full border-white/10 text-center py-12 relative z-10">
                    <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-10 h-10 text-slate-500" />
                    </div>
                    <h1 className="text-2xl font-black uppercase tracking-tight mb-2 font-heading text-white">
                        {isPrivate ? "Profile Private" : "Operative Not Found"}
                    </h1>
                    <p className="text-slate-500 text-sm font-bold mb-8 uppercase tracking-widest font-mono italic">
                        {isPrivate
                            ? "This operative has restricted access to their tactical dossiers."
                            : "The requested player ID does not exist in our database."}
                    </p>
                    <button
                        onClick={() => router.push("/app/players")}
                        className="px-8 py-3 bg-[var(--primary)] text-[#0B0E14] font-black uppercase tracking-widest text-xs rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                    >
                        Return to Directory
                    </button>
                </GlassCard>
            </div>
        );
    }

    const isGhostMode = player.privacySettings?.mode === 'ghost';

    const displayIgn = isGhostMode
        ? player.ign.charAt(0) + "*".repeat(player.ign.length - 2) + player.ign.charAt(player.ign.length - 1)
        : player.ign;

    const displayName = isGhostMode
        ? "REDACTED OPERATIVE"
        : player.name;

    return (
        <div className="min-h-screen bg-[var(--background)] text-white font-sans selection:bg-[var(--primary)]/30">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--secondary)]/5 pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Top Navigation */}
                <button
                    onClick={() => router.push("/app/players")}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 uppercase tracking-[0.2em] font-black text-[10px]"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Directory
                </button>

                {/* Hero Profile Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                    {/* Identity Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-4"
                    >
                        <GlassCard className="h-full border-white/10 overflow-hidden group">
                            <div className="relative aspect-square">
                                {player.image ? (
                                    <Image
                                        src={player.image}
                                        alt={player.ign}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                                        <User className="w-24 h-24 text-slate-700" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent opacity-60" />

                                {player.verificationStatus === 'verified' && (
                                    <div className="absolute bottom-4 right-4 bg-[var(--background)]/80 backdrop-blur-md border border-emerald-500/30 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-2xl">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Verified Pro</span>
                                    </div>
                                )}
                            </div>

                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-4xl font-black italic tracking-tighter uppercase font-heading group-hover:text-[var(--primary)] transition-colors">
                                                {displayIgn}
                                            </h1>
                                            {player.verificationStatus === 'pending' && (
                                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                            )}
                                        </div>
                                        <span className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                            <Globe className="w-3.5 h-3.5 text-[var(--secondary)]" /> {displayName}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 pt-2">
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-black uppercase tracking-widest text-slate-300">
                                            {player.role}
                                        </div>
                                        <div className="px-3 py-1 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
                                            {player.stats.rank}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Tactical Bio</h3>
                                        <p className="text-sm font-medium text-slate-300 leading-relaxed font-mono">
                                            {player.bio || "No tactical details provided for this operative. Strategic background remains classified."}
                                        </p>
                                    </div>

                                    <div className="pt-6 flex items-center gap-4">
                                        <button className="flex-1 h-11 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors group/social">
                                            <Twitter className="w-5 h-5 text-slate-400 group-hover/social:text-[var(--primary)] transition-colors" />
                                        </button>
                                        <button className="flex-1 h-11 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors group/social">
                                            <Instagram className="w-5 h-5 text-slate-400 group-hover/social:text-[var(--secondary)] transition-colors" />
                                        </button>
                                        <button className="flex-1 h-11 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors group/social">
                                            <Youtube className="w-5 h-5 text-slate-400 group-hover/social:text-red-500 transition-colors" />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </GlassCard>
                    </motion.div>

                    {/* Stats & Detailed Data */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Core Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: "Performance", value: player.stats.kd.toFixed(2), suffix: "KD", icon: Target, color: "var(--primary)" },
                                { label: "Win Rate", value: player.stats.winRate, suffix: "%", icon: Zap, color: "var(--secondary)" },
                                { label: "Playtime", value: player.stats.matchesPlayed, suffix: "MATCHES", icon: Globe, color: "var(--primary)" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <GlassCard className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
                                            <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                                        </div>
                                        <CardContent className="p-6">
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-black italic tabular-nums tracking-tighter">{stat.value}</span>
                                                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: stat.color }}>{stat.suffix}</span>
                                            </div>
                                        </CardContent>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>

                        {/* Achievements Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <GlassCard className="border-white/5">
                                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Trophy className="w-5 h-5 text-amber-500" />
                                        <h3 className="text-sm font-black uppercase tracking-widest italic">Career Achievements</h3>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Global Ranking Data Indicated</span>
                                </div>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {player.achievements.length > 0 ? player.achievements.map((ach, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                                    <Medal className="w-5 h-5 text-[var(--primary)]" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">{ach}</span>
                                            </div>
                                        )) : (
                                            <div className="col-span-full py-12 text-center">
                                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                                    <Target className="w-6 h-6 text-slate-700" />
                                                </div>
                                                <p className="text-xs font-black text-slate-600 uppercase tracking-widest font-mono">
                                                    No specific achievement markers located in current session.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </GlassCard>
                        </motion.div>

                        {/* Setup & Hardware */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <GlassCard className="border-white/5 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 blur-[80px] -z-10" />
                                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                                    <Cpu className="w-5 h-5 text-[var(--primary)]" />
                                    <h3 className="text-sm font-black uppercase tracking-widest italic">Technical Setup</h3>
                                </div>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                                        {[
                                            { icon: Mouse, label: "Mouse", value: player.setup?.mouse || "Generic Tactical" },
                                            { icon: Keyboard, label: "Keys", value: player.setup?.keyboard || "Mechanical Unit" },
                                            { icon: Headphones, label: "Audio", value: player.setup?.headset || "HI-FI Surround" },
                                            { icon: Globe, label: "Pad", value: player.setup?.mousepad || "Speed Surface" },
                                            { icon: Gamepad2, label: "Screen", value: player.setup?.monitor || "240Hz Response" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col items-center text-center space-y-3 group/setup">
                                                <div className="w-12 h-12 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center group-hover/setup:border-[var(--primary)]/30 transition-colors">
                                                    <item.icon className="w-5 h-5 text-slate-500 group-hover/setup:text-[var(--primary)] transition-colors" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{item.label}</p>
                                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">{item.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>

                {/* Tactical Visualization Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <GlassCard className="border-white/5 bg-white/[0.01]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 lg:p-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-[var(--primary)]" />
                                    <h3 className="text-xl font-black uppercase italic tracking-tighter">Performance Analysis</h3>
                                </div>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed font-mono uppercase tracking-widest">
                                    Historical performance data indicates a consistent growth in technical proficiency. Tactical placement and game sense are prioritized within the current season metrics.
                                </p>
                                <div className="space-y-4 pt-4">
                                    {[
                                        { label: "Reflex Accuracy", value: 88 },
                                        { label: "Strategic Utility", value: 72 },
                                        { label: "Team Coordination", value: 94 },
                                        { label: "Survival Quotient", value: 65 },
                                    ].map(metric => (
                                        <div key={metric.label} className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-slate-400">{metric.label}</span>
                                                <span className="text-white">{metric.value}%</span>
                                            </div>
                                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${metric.value}%` }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/5 group border-dashed">
                                <BarChart3 className="w-24 h-24 text-[var(--primary)]/20 mb-6 group-hover:scale-110 transition-transform duration-500" />
                                <h4 className="text-sm font-black uppercase tracking-widest mb-2">Technical Telemetry</h4>
                                <p className="text-[10px] text-slate-500 text-center font-mono font-bold uppercase tracking-widest max-w-[200px]">
                                    Live tactical visualization and advanced heatmaps are under generation for this operative.
                                </p>
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
}
