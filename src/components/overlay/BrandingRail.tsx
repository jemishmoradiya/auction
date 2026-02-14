"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface BrandingRailProps {
    side: "left" | "right";
    items: Array<{
        id: string;
        content: ReactNode;
    }>;
}

interface BrandingItemProps {
    title: string;
    sub?: string;
    icon?: LucideIcon;
}

export function BrandingRail({ side, items }: BrandingRailProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [items.length]);

    return (
        <div
            className={`fixed top-0 bottom-0 w-24 z-20 flex flex-col items-center py-12 border-white/5 bg-black/20 backdrop-blur-sm
                ${side === "left" ? "left-0 border-r" : "right-0 border-l"}
            `}
        >
            {/* Structural Accent (Breathing Glow) */}
            <motion.div
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-0 bottom-0 w-[2px] bg-[var(--theme-primary)] shadow-[0_0_15px_var(--theme-primary)] ${side === "left" ? "right-[-1px]" : "left-[-1px]"}`}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={items[activeIndex].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center gap-12 h-full"
                >
                    {items[activeIndex].content}
                </motion.div>
            </AnimatePresence>

            {/* Vertical Tag (Improved Opacity) */}
            <div className="mt-auto pb-8">
                <span className={`text-[8px] font-black uppercase tracking-[0.6em] text-white/40 [writing-mode:vertical-lr] ${side === "left" ? "rotate-180" : ""}`}>
                    {side === "left" ? "TOURNAMENT BRANDING" : "EVENT STREAM"}
                </span>
            </div>
        </div>
    );
}

// Helper components for shared branding items
export const BrandingItem = ({ title, sub, icon: Icon }: BrandingItemProps) => (
    <div className="flex flex-col items-center gap-4 group">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[var(--theme-primary)]/10 transition-colors">
            {Icon && <Icon className="w-6 h-6 text-white/40 group-hover:text-[var(--theme-primary)] transition-colors" />}
        </div>
        <div className="[writing-mode:vertical-lr] flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{title}</span>
            {sub && <span className="text-[8px] font-medium text-white/30 uppercase tracking-tighter">{sub}</span>}
        </div>
    </div>
);
