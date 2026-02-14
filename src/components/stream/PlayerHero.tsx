"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Target, Trophy, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion as motionPresets } from "@/motion/presets";

interface Player {
    id: string;
    ign: string;
    name: string;
    role: string;
    stats: {
        kd: number;
        winRate: number;
        rank: string;
    };
}

interface PlayerHeroProps {
    player: Player | null;
}

export function PlayerHero({ player }: PlayerHeroProps) {
    if (!player) {
        return (
            <div className="h-full flex flex-col items-center justify-center border border-white/5 rounded-[3rem] bg-white/[0.02] text-[#E7EBFF]/20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 0.24 }}
                >
                    <Trophy className="w-32 h-32 mb-6" />
                    <p className="text-xl font-black uppercase tracking-[0.4em]">Awaiting Player</p>
                </motion.div>
            </div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={player.id}
                className="h-full bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 backdrop-blur-xl rounded-[3rem] p-1 flex flex-col relative overflow-hidden shadow-2xl"
                {...motionPresets.heroSwap}
            >
                {/* Ambient Glow */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-[#4C6FFF]/10 via-transparent to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.3] }}
                    transition={{ duration: 0.9 }}
                />

                {/* Avatar Area */}
                <div className="relative flex-1 bg-gradient-to-b from-[#151B32] to-[#12162A] rounded-[2.8rem] overflow-hidden flex items-center justify-center m-1">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(76,111,255,0.15),_transparent_70%)]" />

                    <div className="relative z-10 text-center">
                        {/* Avatar Ring with Glow Ping */}
                        <motion.div
                            className="w-48 h-48 mx-auto bg-gradient-to-br from-[#4C6FFF]/10 to-transparent border border-[#4C6FFF]/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(76,111,255,0.2)] ring-1 ring-[#4C6FFF]/30 relative"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.52, delay: 0.1 }}
                        >
                            {/* Glow Ping Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-[#4C6FFF]/20"
                                initial={{ scale: 1, opacity: 0 }}
                                animate={{ scale: [1, 1.3, 1], opacity: [0, 0.6, 0] }}
                                transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                            />

                            <span className="text-8xl font-black text-[#E7EBFF] drop-shadow-lg">
                                {player.ign[0]}
                            </span>
                        </motion.div>

                        {/* Player Name */}
                        <motion.h2
                            className="text-5xl font-black uppercase italic tracking-tighter text-[#E7EBFF] mb-2 drop-shadow-md"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.36, delay: 0.15 }}
                        >
                            {player.ign}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.24, delay: 0.2 }}
                        >
                            <Badge className="bg-white/10 text-[#E7EBFF] hover:bg-white/10 border-white/10 backdrop-blur-md px-4 py-1 text-xs uppercase tracking-[0.2em] font-bold">
                                {player.name}
                            </Badge>
                        </motion.div>
                    </div>

                    {/* Stats Floating Grid */}
                    <div className="absolute bottom-8 left-0 right-0 px-8 grid grid-cols-3 gap-3">
                        {[
                            { label: 'K/D', value: player.stats.kd, icon: Target },
                            { label: 'WIN%', value: `${player.stats.winRate}%`, icon: Trophy },
                            { label: 'RANK', value: player.stats.rank, icon: Crown }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="bg-[#0B1020]/60 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.24, delay: 0.25 + i * 0.05 }}
                            >
                                <stat.icon className="w-4 h-4 text-[#4C6FFF] mx-auto mb-2 opacity-80" />
                                <p className="text-[10px] font-black text-[#E7EBFF]/40 uppercase tracking-widest mb-0.5">
                                    {stat.label}
                                </p>
                                <p className="text-lg font-black text-[#E7EBFF] italic">
                                    {stat.value}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
