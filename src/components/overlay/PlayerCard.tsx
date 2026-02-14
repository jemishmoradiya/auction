"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface PlayerCardProps {
    player: {
        id: string;
        name: string;
        ign: string;
        imageUrl?: string;
        role: string;
        stats: {
            kd: number;
            winRate: number;
            avgDamage: number;
            rank: string;
        };
        basePrice: number;
    } | null;
    status?: "bidding" | "sold" | "unsold" | "revealing";
    soldTo?: {
        name: string;
        logo?: string;
    };
    finalPrice?: number;
}

export function PlayerCard({
    player,
    status = "bidding",
    soldTo,
    finalPrice
}: PlayerCardProps) {
    if (!player) {
        return (
            <div className="bg-[#17191F] border border-white/8 rounded-2xl p-8 flex items-center justify-center h-[400px]">
                <p className="text-[#9CA3AF] uppercase tracking-widest font-bold text-sm">
                    Awaiting Player
                </p>
            </div>
        );
    }

    const containerVariants: Variants = {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            scale: 1.05,
            y: -20,
            transition: { duration: 0.5, ease: "easeIn" }
        }
    };

    const itemVariants: Variants = {
        initial: { opacity: 0, y: 20, filter: "blur(10px)" },
        animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const scanVariants: Variants = {
        initial: { top: "-10%", opacity: 0 },
        animate: {
            top: "110%",
            opacity: [0, 1, 1, 0],
            transition: { duration: 1.5, ease: "easeInOut", delay: 0.2 }
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={player.id + status}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full relative overflow-hidden group"
            >
                {/* 1. Cinematic Background & Silhouette */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ scale: 1.1, x: 20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    {player.imageUrl ? (
                        <Image
                            src={player.imageUrl}
                            alt={player.ign}
                            fill
                            className="object-contain object-left scale-125 translate-x-12 translate-y-12 opacity-80 filter contrast-[1.2] brightness-75"
                        />
                    ) : (
                        <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-start pl-20 opacity-10">
                            <span className="text-[40rem] font-black text-white leading-none tracking-tighter">
                                {player.ign?.[0]}
                            </span>
                        </div>
                    )}
                </motion.div>

                {/* 2. Text Content & Depth Layer */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-12 pb-24">
                    {/* Massive IGN Background Tag */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 0.05, x: 0 }}
                        className="absolute top-10 left-12 select-none"
                    >
                        <h2 className="text-[200px] font-black uppercase tracking-tighter leading-none">{player.ign}</h2>
                    </motion.div>

                    <div className="max-w-xl space-y-4">
                        <motion.div variants={itemVariants} className="flex items-center gap-3">
                            <div className="h-[2px] w-12 bg-[var(--theme-primary)]" />
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-[var(--theme-primary)]">Contract Available</span>
                        </motion.div>

                        <motion.h2
                            variants={itemVariants}
                            className="text-8xl font-black uppercase tracking-[-0.04em] leading-[0.8] text-white drop-shadow-[0_0_40px_rgba(0,0,229,255,0.3)]"
                        >
                            {player.ign}
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-2xl font-black text-white/60 uppercase tracking-[0.3em] ml-1">
                            {player.name}
                        </motion.p>

                        <div className="grid grid-cols-4 gap-6 mt-16">
                            {[
                                { label: 'K/D Ratio', value: player.stats.kd.toFixed(2), color: 'text-white' },
                                { label: 'Win Rate', value: `${player.stats.winRate}%`, color: 'text-white' },
                                { label: 'Tactical Role', value: player.role, color: 'text-[var(--theme-primary)]' },
                                { label: 'Base Value', value: `₹${player.basePrice}k`, color: 'text-[var(--theme-secondary)]' }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="border-l border-white/10 pl-4 py-2"
                                >
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">{stat.label}</p>
                                    <p className={`text-2xl font-black uppercase ${stat.color}`}>{stat.value}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Status Overlays */}
                <AnimatePresence>
                    {status === "sold" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--theme-secondary)]/10 backdrop-blur-xl"
                        >
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                className="bg-[var(--theme-secondary)] text-black p-16 rounded-[4rem] text-center shadow-[0_0_100px_rgba(var(--theme-secondary-rgb),0.5)] border-[12px] border-white relative overflow-hidden"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-white"
                                    animate={{ x: ['100%', '-100%'] }}
                                    transition={{ duration: 0.5, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
                                />
                                <div className="relative z-10">
                                    <span className="text-2xl font-black uppercase tracking-[0.5em] block mb-4">Contract Secured</span>
                                    <h3 className="text-8xl font-black uppercase tracking-tighter leading-none mb-4">{soldTo?.name}</h3>
                                    <div className="h-1 w-full bg-black/10 my-6" />
                                    <p className="text-4xl font-black italic">₹{finalPrice}k</p>
                                </div>
                                <Sparkles className="absolute top-8 right-8 w-12 h-12 animate-bounce" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Scanning & HUD Textures */}
                <div className="absolute inset-0 z-20 pointer-events-none border-[40px] border-black/20 mix-blend-overlay" />
                <motion.div
                    variants={scanVariants}
                    className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-white/5 to-transparent z-30 opacity-50"
                />
            </motion.div>
        </AnimatePresence>
    );
}
