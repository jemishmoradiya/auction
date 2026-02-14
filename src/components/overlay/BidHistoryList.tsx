"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { motion as motionPresets } from "@/motion/presets";

interface Bid {
    id: string;
    teamId: string;
    teamName: string;
    teamLogo?: string;
    amount: number;
    timestamp: string;
}

interface BidHistoryListProps {
    bids: Bid[];
    playerName?: string;
    basePrice?: number;
}

export function BidHistoryList({ bids, playerName = "Current Player", basePrice = 100 }: BidHistoryListProps) {
    const latestBid = bids[0];

    return (
        <div className="flex flex-col h-full bg-black/20 rounded-xl border border-white/5 overflow-hidden shadow-2xl">
            {/* 1. Compact Horizontal HUD Summary */}
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between gap-12">
                <div className="flex gap-10">
                    <div>
                        <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Base Price</p>
                        <p className="text-sm font-black text-white italic">₹{basePrice}k</p>
                    </div>
                    <div>
                        <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Current</p>
                        <p className="text-sm font-black text-[var(--theme-primary)] italic">
                            {latestBid ? `₹${latestBid.amount}k` : '--'}
                        </p>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-end gap-3 max-w-[200px]">
                    <div className="text-right">
                        <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-0.5">Leading Offer</p>
                        <p className="text-[11px] font-black text-white uppercase tracking-tight truncate leading-none">
                            {latestBid?.teamName || 'NO BIDS'}
                        </p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
                        {latestBid?.teamLogo ? (
                            <Image src={latestBid.teamLogo} alt="" width={24} height={24} unoptimized className="object-contain" />
                        ) : (
                            <div className="w-full h-full rounded bg-white/5 animate-pulse" />
                        )}
                    </div>
                </div>
            </div>

            {/* 2. Expanded Auction Trail Container */}
            <div className="p-4 flex-1 flex flex-col min-h-0 overflow-hidden">
                <div className="flex items-center justify-between mb-3 px-2">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Transmission Feed</h3>
                    <span className="text-[8px] font-bold text-white/10 uppercase">Live Index • {bids.length}</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                    {bids.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full opacity-20">
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-center">
                                Awaiting First Signal
                            </p>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {bids.map((bid, index) => (
                                <motion.div
                                    key={bid.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{
                                        opacity: index === 0 ? 1 : Math.max(0.4, 1 - (index * 0.15)),
                                        x: 0
                                    }}
                                    className={`flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-300 group
                                        ${index === 0 ? 'bg-white/10 border border-white/10 shadow-lg' : 'hover:bg-white/5 border border-transparent'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden transition-all
                                            ${index === 0 ? 'bg-[var(--theme-primary)] text-black' : 'bg-white/5 text-white/40 group-hover:bg-white/10'}
                                        `}>
                                            {bid.teamLogo ? (
                                                <Image src={bid.teamLogo} alt={bid.teamName} width={24} height={24} unoptimized className={index === 0 ? 'brightness-0' : ''} />
                                            ) : (
                                                <span className="text-[10px] font-black uppercase">
                                                    {bid.teamName[0]}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-[11px] font-black uppercase tracking-widest transition-colors
                                                ${index === 0 ? 'text-white' : 'text-white/40 group-hover:text-white/80'}
                                            `}>
                                                {bid.teamName}
                                            </span>
                                            <span className="text-[8px] font-medium text-white/20 uppercase tracking-tighter">Signal Logged</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className={`text-xs font-black tabular-nums tracking-tighter
                                            ${index === 0 ? 'text-[var(--theme-primary)]' : 'text-white/60'}
                                        `}>
                                            ₹{bid.amount}k
                                        </span>
                                        <div className={`w-1 h-4 rounded-full ${index === 0 ? 'bg-[var(--theme-primary)] animate-pulse' : 'bg-white/10'}`} />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
}
