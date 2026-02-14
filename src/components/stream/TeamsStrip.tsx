"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease } from "@/motion/ease";

interface Team {
    id: string;
    name: string;
    budgetRemaining: number;
    rosteredPlayers: number;
    maxPlayers: number;
    isLeading: boolean;
}

interface TeamsStripProps {
    teams: Team[];
}

export function TeamsStrip({ teams }: TeamsStripProps) {
    return (
        <div className="w-full h-full flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {teams.map((team) => (
                <motion.div
                    key={team.id}
                    className={cn(
                        "min-w-[240px] rounded-2xl p-3 flex flex-col justify-between h-[72px] border transition-colors",
                        team.isLeading
                            ? "bg-[#4C6FFF]/10 border-[#4C6FFF]/30"
                            : "bg-white/5 border-white/5"
                    )}
                    animate={team.isLeading ? {
                        borderColor: ["rgba(76,111,255,0.3)", "rgba(76,111,255,0.6)", "rgba(76,111,255,0.3)"]
                    } : {}}
                    transition={{ duration: 2, ease: ease.inOut, repeat: Infinity }}
                >
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            {/* Logo with glow ping on lead change */}
                            <motion.div
                                className="w-6 h-6 rounded bg-[#4C6FFF]/20 flex items-center justify-center text-[10px] font-black text-[#4C6FFF] relative"
                                animate={team.isLeading ? {
                                    boxShadow: [
                                        "0 0 0 rgba(76,111,255,0)",
                                        "0 0 15px rgba(76,111,255,0.6)",
                                        "0 0 0 rgba(76,111,255,0)"
                                    ]
                                } : {}}
                                transition={{ duration: 0.08 }}
                            >
                                {team.name[0]}

                                {/* Glow ping on lead change */}
                                {team.isLeading && (
                                    <motion.div
                                        className="absolute inset-0 rounded bg-[#4C6FFF]/30"
                                        initial={{ scale: 1, opacity: 0 }}
                                        animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.16, ease: ease.snap }}
                                    />
                                )}
                            </motion.div>
                            <span className="text-xs font-bold uppercase text-[#E7EBFF]/80">
                                {team.name}
                            </span>
                        </div>
                        <span className="text-xs font-black text-[#F7B500] italic tabular-nums">
                            ₹{(team.budgetRemaining / 1000).toFixed(0)}k
                        </span>
                    </div>

                    {/* Roster Progress */}
                    <div className="flex gap-1">
                        {[...Array(team.maxPlayers)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={cn(
                                    "h-1.5 flex-1 rounded-full",
                                    i < team.rosteredPlayers ? "bg-[#4C6FFF]" : "bg-white/10"
                                )}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.24, delay: i * 0.05 }}
                            />
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
