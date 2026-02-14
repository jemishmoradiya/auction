"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Player {
    id: string;
    name: string;
    ign: string;
    role: string;
    imageUrl?: string;
}

interface NextInQueueProps {
    players: Player[];
}

export function NextInQueue({ players }: NextInQueueProps) {
    return (
        <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-2xl p-5 transition-all duration-500 shadow-[var(--theme-glow)]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">
                Next in Queue
            </h3>

            <div className="space-y-2">
                {players.slice(0, 3).map((player, index) => (
                    <motion.div
                        key={player.id}
                        className="flex items-center gap-3 p-3 bg-black/20 border border-white/5 rounded-xl hover:bg-white/[0.02] transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--theme-primary)]/20 to-transparent flex items-center justify-center border border-[var(--theme-primary)]/20 shadow-[var(--theme-glow)] overflow-hidden relative">
                            {player.imageUrl ? (
                                <Image
                                    src={player.imageUrl}
                                    alt={player.ign}
                                    fill
                                    sizes="40px"
                                    className="object-cover object-top"
                                />
                            ) : (
                                <span className="text-sm font-black text-[var(--theme-primary)]">
                                    {player.ign[0]}
                                </span>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white/90 leading-tight">{player.ign}</p>
                            <p className="text-[9px] text-[var(--theme-primary)] font-black uppercase tracking-wider opacity-70 mt-1">{player.role}</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                            <span className="text-[10px] font-black text-white/40">
                                {index + 1}
                            </span>
                        </div>
                    </motion.div>
                ))}

                {players.length === 0 && (
                    <p className="text-[#9CA3AF]/50 text-xs text-center py-8">
                        No players in queue
                    </p>
                )}
            </div>
        </div>
    );
}
