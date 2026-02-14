"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Player {
    id: string;
    name: string;
    teamLogo?: string;
    soldPrice: number;
    status: string;
}

interface PreviouslyAuctionedListProps {
    players: Player[];
}

export function PreviouslyAuctionedList({ players }: PreviouslyAuctionedListProps) {
    return (
        <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-2xl p-5 transition-all duration-500 shadow-[var(--theme-glow)]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">
                Recent Outcomes
            </h3>

            <div className="space-y-2">
                {players.slice(0, 2).map((player, index) => (
                    <motion.div
                        key={player.id}
                        className="flex items-center justify-between p-3 bg-black/20 border border-white/5 rounded-xl hover:bg-white/[0.02] transition-colors"
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                    >
                        <div className="flex items-center gap-3">
                            {player.teamLogo && (
                                <motion.div
                                    className="w-6 h-6 rounded-full overflow-hidden border border-white/10 shadow-[var(--theme-glow)]"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Image src={player.teamLogo} alt="Team" width={24} height={24} unoptimized />
                                </motion.div>
                            )}
                            <div>
                                <p className="text-xs font-bold text-white/90 leading-none">{player.name}</p>
                                <p className="text-[9px] uppercase tracking-wider text-[var(--theme-primary)] font-black mt-1 opacity-60">{player.status}</p>
                            </div>
                        </div>
                        <motion.span
                            className="text-xs font-black text-[var(--theme-secondary)]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
                        >
                            ₹{player.soldPrice}k
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
