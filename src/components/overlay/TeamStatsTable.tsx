"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamStat {
    teamName: string;
    players: number;
    budget: number;
    spent: number;
}

interface TeamStatsTableProps {
    stats: TeamStat[];
}

const BATCH_SIZE = 4;
const ROTATION_INTERVAL = 5000;

export function TeamStatsTable({ stats }: TeamStatsTableProps) {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (stats.length <= BATCH_SIZE) return;

        const interval = setInterval(() => {
            setOffset((prev) => (prev + BATCH_SIZE) % stats.length);
        }, ROTATION_INTERVAL);

        return () => clearInterval(interval);
    }, [stats.length]);

    const visibleStats = stats.slice(offset, offset + BATCH_SIZE);
    // If the slice is smaller than batch size and we have more teams, wrap around
    if (visibleStats.length < BATCH_SIZE && stats.length > BATCH_SIZE) {
        visibleStats.push(...stats.slice(0, BATCH_SIZE - visibleStats.length));
    }

    return (
        <div className="space-y-4">
            {/* Table Headers */}
            <div className="grid grid-cols-6 gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-[var(--theme-primary)] opacity-60 pb-2 border-b border-white/5">
                <span className="col-span-2">SQUAD</span>
                <span className="text-center">SLOTS</span>
                <span className="text-center">BUDGET</span>
                <span className="text-center">UTIL</span>
                <span className="text-center">REM.</span>
            </div>

            <div className="space-y-1">
                {visibleStats.map((stat, index) => (
                    <motion.div
                        key={stat.teamName}
                        className="grid grid-cols-6 gap-2 text-xs items-center py-2.5 px-2 hover:bg-white/[0.03] rounded-xl transition-all border-b border-white/[0.02] last:border-0"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <span className="col-span-2 font-black text-white/90 truncate tracking-tight">
                            {stat.teamName}
                        </span>
                        <span className="text-center text-white/40 font-bold">{stat.players}/5</span>
                        <span className="text-center text-white/40 font-medium">₹{stat.budget}k</span>
                        <span className="text-center font-bold text-white/80">₹{stat.spent}k</span>
                        <span className="text-center font-black text-[var(--theme-secondary)]">₹{stat.budget - stat.spent}k</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
