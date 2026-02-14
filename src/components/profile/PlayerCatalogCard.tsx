"use client";

import { motion } from "framer-motion";
import { User, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
    basePrice: number;
}

export function PlayerCatalogCard({
    id,
    ign,
    name,
    role,
    imageUrl,
    stats,
    basePrice
}: PlayerCatalogCardProps) {
    return (
        <Link href={`/players/${id}`} className="block group">
            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="h-full bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden hover:border-[var(--theme-primary)]/40 hover:bg-white/[0.05] transition-all duration-500 backdrop-blur-3xl"
            // Soft elevation on hover handled by bg change and y-shift
            >
                <div className="p-5 flex flex-col h-full">
                    {/* Header: Avatar + Ident */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={ign}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                                        <User className="w-6 h-6" />
                                    </div>
                                )}
                            </div>

                            {/* Name & Real Name */}
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:text-[var(--theme-primary)] transition-colors leading-none">
                                    {ign}
                                </h3>
                                <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.3em] mt-1">
                                    {name}
                                </p>
                            </div>
                        </div>

                        {/* Role Badge - Neutral Pill */}
                        <Badge
                            className="bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-lg"
                        >
                            {role}
                        </Badge>
                    </div>

                    {/* Stats Grid - Mid Section */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5 border-b mb-4">
                        <div>
                            <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-2 font-heading">
                                Technical Skill
                            </p>
                            <p className="text-2xl font-black text-white tabular-nums italic tracking-tighter font-mono">
                                {stats.kd.toFixed(2)} <span className="text-[10px] opacity-20 not-italic">KD</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-2 font-heading">
                                Efficiency Rate
                            </p>
                            <p className="text-2xl font-black text-[var(--theme-primary)] tabular-nums italic tracking-tighter font-mono">
                                {stats.winRate}%
                            </p>
                        </div>
                    </div>

                    {/* Footer - Price & Link */}
                    <div className="mt-auto flex items-center justify-between pt-1">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">
                                Base Signature
                            </span>
                            <span className="text-lg font-black text-white/80 italic tracking-tighter">
                                ₹{basePrice}k
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-[9px] font-black text-[var(--theme-primary)] uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                            Technical Profile <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
