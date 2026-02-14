"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ease } from "@/motion/ease";

interface CurrentBidCardProps {
    amount: number;
    teamName: string;
    teamLogo?: string;
    timeRemaining: number;
}

interface DigitalScrambleProps {
    value: number;
    className?: string;
}

function DigitalScramble({ value, className }: DigitalScrambleProps) {
    const [display, setDisplay] = useState(value.toString());
    const [isScrambling, setIsScrambling] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        setIsScrambling(true);
        const finalValue = value.toString();
        const length = finalValue.length;

        // Rapid scramble
        interval = setInterval(() => {
            let result = "";
            for (let i = 0; i < length; i++) {
                result += Math.floor(Math.random() * 10).toString();
            }
            setDisplay(result);
        }, 40);

        // Lock in after 350ms
        timeout = setTimeout(() => {
            clearInterval(interval);
            setDisplay(finalValue);
            setIsScrambling(false);
        }, 350);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [value]);

    return (
        <motion.span
            className={className}
            animate={isScrambling ? {
                opacity: [1, 0.8, 1],
                filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
            } : {}}
            transition={{ duration: 0.1, repeat: isScrambling ? Infinity : 0 }}
        >
            {display}
        </motion.span>
    );
}

export function CurrentBidCard({ amount, teamName, teamLogo, timeRemaining }: CurrentBidCardProps) {
    const prevAmountRef = useRef(amount);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        if (amount !== prevAmountRef.current) {
            setHasChanged(true);
            const t = setTimeout(() => setHasChanged(false), 800);
            prevAmountRef.current = amount;
            return () => clearTimeout(t);
        }
    }, [amount]);

    const isCritical = timeRemaining <= 10;

    return (
        <div className="relative group select-none">
            {/* 1. Bid Backdrop Glow (Intensity pulse on change) */}
            <motion.div
                className="absolute inset-x-0 -inset-y-4 bg-[var(--theme-secondary)]/10 blur-3xl rounded-full"
                animate={hasChanged ? {
                    opacity: [0, 0.4, 0],
                    scale: [0.8, 1.2, 0.8]
                } : { opacity: 0.1 }}
            />

            <div className="relative z-10 flex flex-col items-end">
                {/* Team Info Badge */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 mb-4"
                >
                    {teamLogo && (
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 p-1.5">
                            <Image src={teamLogo} alt={teamName} width={32} height={32} unoptimized className="object-contain" />
                        </div>
                    )}
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white">{teamName}</span>
                </motion.div>

                {/* Massive Bid Amount */}
                <div className="relative mb-2 pr-2">
                    <motion.div
                        key={amount}
                        initial={{ scale: 0.9, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: ease.snap }}
                        className="flex items-baseline"
                    >
                        <span className="text-3xl font-black text-[var(--theme-secondary)] mr-2 opacity-50 italic">₹</span>
                        <DigitalScramble
                            value={amount}
                            className="text-7xl font-black text-white leading-none tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] inline-block min-w-[200px] text-right"
                        />
                        <span className="text-3xl font-black text-white/40 ml-2 uppercase italic">K</span>
                    </motion.div>
                </div>

                {/* Action Descriptor (Improved Contrast) */}
                <span className="text-[9px] font-black uppercase tracking-[0.6em] text-[var(--theme-secondary)] mb-6 mr-4 opacity-70">Current Lead Offer</span>

                {/* 2. Emotional Timer HUD */}
                <div className="w-full max-w-[280px] space-y-3 mr-4">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Hammer Clock</span>
                        <motion.span
                            animate={isCritical ? { scale: [1, 1.2, 1], color: ['#fff', '#EF4444', '#fff'] } : {}}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="text-4xl font-black tabular-nums tracking-tighter"
                        >
                            {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}<span className="text-sm ml-1 opacity-40">S</span>
                        </motion.span>
                    </div>

                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
                        <motion.div
                            className={`h-full rounded-full ${isCritical ? 'bg-red-500' : 'bg-[var(--theme-primary)]'}`}
                            initial={false}
                            animate={{
                                width: `${(timeRemaining / 30) * 100}%`,
                                boxShadow: isCritical ? '0 0 20px rgba(239,68,68,0.5)' : 'none'
                            }}
                            transition={{
                                width: { duration: 0.95, ease: "linear" }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
