"use client";

import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

interface OverlayHeaderProps {
    title: string;
    teamName: string;
}

export function OverlayHeader({ title, teamName }: OverlayHeaderProps) {
    return (
        <motion.div
            className="flex items-center justify-between h-16 px-6 bg-[var(--theme-surface)] border-b border-[var(--theme-border)] rounded-t-2xl relative overflow-hidden transition-colors duration-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Theme Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-primary)]/5 to-transparent pointer-events-none" />

            {/* Left: Logo + Title */}
            <div className="flex items-center gap-4 relative z-10">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-white text-sm"
                    style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}
                >
                    AUCT
                </div>
                <h1 className="text-sm font-bold uppercase tracking-wider text-white/90">
                    {title}
                </h1>
                <span className="px-3 py-1 bg-[var(--theme-primary)] rounded-md text-[10px] font-black uppercase tracking-widest text-white animate-pulse shadow-[var(--theme-glow)]">
                    LIVE
                </span>
            </div>

            {/* Right: Team + Logout */}
            <div className="flex items-center gap-6 relative z-10">
                <span className="text-sm font-bold text-white/80">{teamName}</span>
                <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium">
                    <LogOut className="w-4 h-4" />
                    <span className="uppercase text-[10px] tracking-widest">Broadcast Console</span>
                </button>
            </div>
        </motion.div>
    );
}
