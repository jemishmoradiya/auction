"use client";

import { motion, AnimatePresence } from "framer-motion";
import { History, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion as motionPresets } from "@/motion/presets";

interface Bid {
    id: string;
    teamId: string;
    teamName: string;
    ownerName: string;
    amount: number;
    timestamp: number;
}

interface BidStreamFeedProps {
    bids: Bid[];
    hasWar?: boolean;
}

export function BidStreamFeed({ bids, hasWar }: BidStreamFeedProps) {
    const visibleBids = bids.slice(0, 6); // Keep max 6 visible

    return (
        <div className="flex-1 bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#4C6FFF]/10 rounded-xl">
                        <History className="w-5 h-5 text-[#4C6FFF]" />
                    </div>
                    <h3 className="text-sm font-black uppercase italic tracking-widest text-[#E7EBFF]">
                        Bid Stream
                    </h3>
                </div>
                {hasWar && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.16 }}
                    >
                        <Badge variant="destructive" className="bg-[#FF4D5E]/20 text-[#FF4D5E] border-[#FF4D5E]/30 animate-pulse">
                            <Flame className="w-3 h-3 mr-1" /> WAR DETECTED
                        </Badge>
                    </motion.div>
                )}
            </div>

            <div className="flex-1 overflow-hidden pr-2 space-y-3">
                {visibleBids.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-[#E7EBFF]/20">
                        <p className="text-xs uppercase tracking-widest font-bold">Waiting for bids</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {visibleBids.map((bid, index) => {
                            const isTop = index === 0;
                            const opacity = 1 - (index * 0.1); // Gradual fade for older bids

                            return (
                                <motion.div
                                    key={bid.id}
                                    layout
                                    {...motionPresets.slideRightIn}
                                    className={`p-4 rounded-2xl flex items-center justify-between ${isTop
                                            ? "bg-[#E7EBFF] text-[#0B1020] scale-[1.02] shadow-xl"
                                            : "bg-white/5 text-[#E7EBFF]"
                                        }`}
                                    style={{ opacity }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black italic ${isTop ? "bg-[#0B1020] text-[#E7EBFF]" : "bg-white/10 text-[#E7EBFF]/60"
                                                }`}
                                        >
                                            {bid.teamName[0]}
                                        </div>
                                        <div>
                                            <p
                                                className={`text-sm font-black uppercase italic leading-none ${isTop ? "text-[#0B1020]" : "text-[#E7EBFF]"
                                                    }`}
                                            >
                                                {bid.teamName}
                                            </p>
                                            <p
                                                className={`text-[8px] font-bold uppercase tracking-wider mt-0.5 ${isTop ? "text-[#0B1020]/60" : "text-[#E7EBFF]/40"
                                                    }`}
                                            >
                                                {bid.ownerName}
                                            </p>
                                        </div>
                                    </div>
                                    <p
                                        className={`text-lg font-black italic tabular-nums ${isTop ? "text-[#0B1020]" : "text-[#F7B500]"
                                            }`}
                                    >
                                        ₹{bid.amount.toLocaleString()}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
