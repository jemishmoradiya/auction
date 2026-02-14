"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Activity, Gavel } from "lucide-react";
import { useEffect, useRef } from "react";
import { ease } from "@/motion/ease";

interface CurrentBidDisplayProps {
    amount: number;
    isSold?: boolean;
    leadingTeamName?: string;
}

export function CurrentBidDisplay({ amount, isSold, leadingTeamName }: CurrentBidDisplayProps) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const prevAmountRef = useRef(amount);

    useEffect(() => {
        const prev = prevAmountRef.current;
        const controls = animate(count, amount, {
            duration: 0.36,
            ease: ease.snap,
            onComplete: () => {
                prevAmountRef.current = amount;
            }
        });

        return controls.stop;
    }, [amount, count]);

    return (
        <motion.div
            className="bg-gradient-to-br from-[#4C6FFF]/20 to-[#4C6FFF]/5 border border-[#4C6FFF]/20 backdrop-blur-xl rounded-3xl p-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(76,111,255,0.15)]"
            animate={amount !== prevAmountRef.current ? {
                scale: [1, 1.015, 1],
            } : {}}
            transition={{ duration: 0.24 }}
        >
            <div className="relative z-10">
                <p className="text-[#E7EBFF]/60 font-black uppercase tracking-[0.4em] text-xs mb-3 flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4" /> Current Bid
                </p>

                {/* Animated Counter */}
                <motion.p
                    className="text-7xl font-black text-[#F7B500] italic tracking-tighter tabular-nums drop-shadow-xl"
                    style={{
                        filter: "drop-shadow(0 0 30px rgba(247,181,0,0.4))"
                    }}
                >
                    ₹<motion.span>{rounded}</motion.span>
                </motion.p>

                {isSold && leadingTeamName && (
                    <motion.div
                        className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-[#2DD4BF] text-white rounded-full font-black uppercase italic tracking-wider"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.36 }}
                    >
                        <Gavel className="w-4 h-4" /> SOLD to {leadingTeamName}
                    </motion.div>
                )}
            </div>

            {/* Background Flash on Bid Update */}
            <motion.div
                key={amount}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F7B500]/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.16, ease: ease.out }}
            />

            {/* Animated Background Mesh */}
            <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-20">
                <motion.div
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,rgba(255,255,255,0.1)_180deg,transparent_240deg)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </motion.div>
    );
}
