"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Player {
    id: string;
    ign: string;
    role: string;
    basePrice: number;
}

interface OnDeckListProps {
    players: Player[];
}

export function OnDeckList({ players }: OnDeckListProps) {
    return (
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#4C6FFF]/10 rounded-xl">
                    <Layers className="w-5 h-5 text-[#4C6FFF]" />
                </div>
                <h3 className="text-sm font-black uppercase italic tracking-widest text-[#E7EBFF]">
                    On Deck
                </h3>
            </div>

            <div className="space-y-3 flex-1 overflow-hidden">
                {players.slice(0, 3).map((player, index) => (
                    <motion.div
                        key={player.id}
                        className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-2xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.08)", transition: { duration: 0.2 } }}
                    >
                        <span className="text-xs font-black text-[#E7EBFF]/30 tabular-nums">
                            0{index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-[#E7EBFF] truncate leading-none mb-1.5">
                                {player.ign}
                            </p>
                            <Badge
                                variant="secondary"
                                className="text-[9px] h-4 px-2 bg-white/10 text-[#E7EBFF]/60 hover:bg-white/10 uppercase tracking-wider border-none"
                            >
                                {player.role}
                            </Badge>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-[#E7EBFF]/40 uppercase tracking-wider">
                                Base
                            </p>
                            <p className="text-sm font-black text-[#F7B500] tabular-nums">
                                ₹{player.basePrice}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
