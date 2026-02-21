"use client";

import { motion } from "framer-motion";
import { User, ChevronRight, CheckCircle2, Globe, Target, Zap, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PlayerListRowProps {
    id: string;
    ign: string;
    name: string;
    role: string;
    imageUrl?: string;
    stats: {
        kd: number;
        winRate: number;
        rank: string;
    };
    verificationStatus?: 'none' | 'pending' | 'verified';
    privacySettings?: {
        mode: 'off' | 'ghost' | 'classified';
    };
}

export function PlayerListRow({
    id,
    ign,
    name,
    role,
    imageUrl,
    stats,
    verificationStatus = 'none',
    privacySettings
}: PlayerListRowProps) {
    const isGhost = privacySettings?.mode === 'ghost';
    const displayIgn = isGhost
        ? ign.charAt(0) + "*".repeat(ign.length - 2) + ign.charAt(ign.length - 1)
        : ign;

    return (
        <Link href={`/app/players/${id}`} className="block group">
            <motion.div
                whileHover={{ x: 4 }}
                className="bg-[#0B0E14]/40 border border-white/5 rounded-xl hover:border-[var(--primary)]/30 hover:bg-white/[0.04] transition-all p-3 flex items-center gap-6 group/row"
            >
                {/* Avatar Section */}
                <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center group-hover/row:border-[var(--primary)]/40 transition-colors">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={ign}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <User className="w-6 h-6 text-slate-500 group-hover/row:text-[var(--primary)] transition-colors" />
                        )}
                    </div>
                    {verificationStatus === 'verified' && (
                        <div className="absolute -bottom-1 -right-1 bg-[#0B0E14] border border-emerald-500/30 rounded-full p-0.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        </div>
                    )}
                </div>

                {/* Identity Info */}
                <div className="flex-1 grid grid-cols-4 items-center gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white uppercase tracking-tight group-hover/row:text-[var(--primary)] transition-colors">
                                {displayIgn}
                            </h3>
                            {verificationStatus === 'pending' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            )}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase font-bold flex items-center gap-1.5">
                            {name}
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] mb-0.5">Role</span>
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{role}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] mb-0.5">Season Rank</span>
                        <div className="flex items-center gap-2">
                            <Shield className="w-3 h-3 text-[var(--secondary)]" />
                            <span className="text-xs font-bold text-white uppercase tracking-widest">{stats.rank}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] mb-0.5 flex items-center gap-1">
                                <Target className="w-2.5 h-2.5" /> Skill
                            </span>
                            <span className="text-xs font-black text-white tabular-nums tracking-tighter">
                                {stats.kd.toFixed(2)} <span className="text-[9px] text-[var(--primary)]">KD</span>
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] mb-0.5 flex items-center gap-1">
                                <Zap className="w-2.5 h-2.5" /> Eff
                            </span>
                            <span className="text-xs font-black text-white tabular-nums tracking-tighter">
                                {stats.winRate}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 opacity-0 group-hover/row:opacity-100 transition-opacity translate-x-4 group-hover/row:translate-x-0 transition-transform">
                    <ChevronRight className="w-5 h-5 text-[var(--primary)]" />
                </div>
            </motion.div>
        </Link>
    );
}
