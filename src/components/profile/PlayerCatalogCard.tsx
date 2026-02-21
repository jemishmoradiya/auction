"use client";

import { motion } from "framer-motion";
import { User, ChevronRight, CheckCircle2, Globe, Target, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PlayerCatalogCardProps {
    id: string;
    ign: string;
    name: string;
    role: string;
    imageUrl?: string;
    stats: {
        kd: number;
        winRate: number;
    };
    verificationStatus?: 'none' | 'pending' | 'verified';
    privacySettings?: {
        mode: 'off' | 'ghost' | 'classified';
    };
}

export function PlayerCatalogCard({
    id,
    ign,
    name,
    role,
    imageUrl,
    stats,
    verificationStatus = 'none',
    privacySettings
}: PlayerCatalogCardProps) {
    const isGhost = privacySettings?.mode === 'ghost';
    const displayIgn = isGhost
        ? ign.charAt(0) + "*".repeat(ign.length - 2) + ign.charAt(ign.length - 1)
        : ign;

    return (
        <Link href={`/app/players/${id}`} className="block group">
            <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="h-full bg-[#0B0E14]/80 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl hover:border-[var(--primary)]/40 transition-all flex flex-col relative group/card"
            >
                {/* Technical Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--primary)]/20 group-hover:border-[var(--primary)]/60 transition-colors rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--primary)]/10 group-hover:border-[var(--primary)]/40 transition-colors rounded-br-2xl pointer-events-none" />

                <div className="p-5 flex flex-col h-full relative z-10">
                    {/* Header: Identity Section */}
                    <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-4">
                            {/* Avatar with Technical Frame */}
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center shadow-inner">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={ign}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <User className="w-8 h-8 text-slate-500 group-hover:text-[var(--primary)] transition-colors" />
                                    )}
                                </div>

                                {verificationStatus === 'verified' && (
                                    <div className="absolute -bottom-1 -right-1 bg-[#0B0E14] border border-emerald-500/30 rounded-full p-1 shadow-lg">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                                    </div>
                                )}
                            </div>

                            {/* Text Ident */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold text-white tracking-tight uppercase font-heading group-hover:text-[var(--primary)] transition-colors">
                                        {displayIgn}
                                    </h3>
                                    {verificationStatus === 'pending' && (
                                        <div className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                            <span className="text-[8px] font-black text-amber-500/70 tracking-widest uppercase">Validating</span>
                                        </div>
                                    )}
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase font-bold flex items-center gap-1.5">
                                    <Globe className="w-3 h-3 text-[var(--secondary)]" /> {name}
                                </span>
                            </div>
                        </div>

                        {/* Tactical Role Indicator */}
                        <div className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                {role}
                            </span>
                        </div>
                    </div>

                    {/* Player Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl hover:bg-white/[0.04] transition-colors relative group/stat overflow-hidden">
                            <div className="absolute top-0 right-0 p-1">
                                <Target className="w-3 h-3 text-white/10" />
                            </div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
                                Performance
                            </p>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-black text-white tabular-nums tracking-tighter">
                                    {stats.kd.toFixed(2)}
                                </span>
                                <span className="text-[10px] font-bold text-[var(--primary)] tracking-widest">KD</span>
                            </div>
                        </div>

                        <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl hover:bg-white/[0.04] transition-colors relative group/stat overflow-hidden">
                            <div className="absolute top-0 right-0 p-1">
                                <Zap className="w-3 h-3 text-white/10" />
                            </div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
                                Efficiency
                            </p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-white tabular-nums tracking-tighter">
                                    {stats.winRate}
                                </span>
                                <span className="text-[10px] font-bold text-[var(--secondary)] tracking-widest">%</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer: Dossier Access */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between group/link">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">Quick Access</span>
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest group-hover/link:text-[var(--primary)] transition-colors">View Profile</span>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover/link:bg-[var(--primary)] group-hover/link:border-[var(--primary)] transition-all">
                                <ChevronRight className="w-4 h-4 text-white group-hover/link:text-[#0B0E14]" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
