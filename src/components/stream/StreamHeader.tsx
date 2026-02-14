"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StreamHeaderProps {
    tournamentName: string;
    prizePool: number;
    bidIntensity: number;
}

export function StreamHeader({ tournamentName, prizePool, bidIntensity }: StreamHeaderProps) {
    return (
        <motion.div
            className="flex items-center justify-between h-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Left: Tournament Info */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-5 h-full">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4C6FFF] to-[#4C6FFF]/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(76,111,255,0.3)]">
                    <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-black italic uppercase tracking-tight leading-none text-[#E7EBFF]">
                            {tournamentName}
                        </h1>
                        <Badge className="bg-[#FF4D5E] text-white border-none text-[9px] tracking-widest font-black uppercase px-2 py-0.5 animate-pulse">
                            LIVE
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Right: Stats */}
            <div className="flex items-center gap-3 h-full">
                {/* Prize Pool */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-5 h-full flex flex-col justify-center text-right">
                    <p className="text-[8px] font-black text-[#E7EBFF]/40 uppercase tracking-[0.2em] mb-0.5">Prize Pool</p>
                    <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7B500] to-[#4C6FFF] italic tabular-nums leading-none">
                        ₹{prizePool.toLocaleString()}
                    </p>
                </div>

                {/* Bid Intensity */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-4 h-full flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[8px] font-black text-[#E7EBFF]/40 uppercase tracking-[0.2em] mb-0.5">Intensity</p>
                        <p className="text-sm font-black text-[#4C6FFF] italic leading-none">{bidIntensity}%</p>
                    </div>
                    <div className="h-10 w-2 bg-white/10 rounded-full overflow-hidden flex flex-col justify-end">
                        <motion.div
                            className="w-full bg-gradient-to-t from-[#4C6FFF] to-[#2DD4BF]"
                            initial={{ height: 0 }}
                            animate={{ height: `${bidIntensity}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
