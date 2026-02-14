"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HostCardProps {
    name: string;
    role: string;
    imageUrl?: string;
}

export function HostCard({ name, role, imageUrl }: HostCardProps) {
    return (
        <motion.div
            className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-2xl overflow-hidden transition-all duration-500 shadow-[var(--theme-glow)]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Host Image */}
            <div className="relative w-full aspect-video bg-gradient-to-br from-[var(--theme-primary)]/20 to-[var(--theme-bg)]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover contrast-[1.1] grayscale-[0.2]"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[var(--theme-primary)]/20 flex items-center justify-center border border-[var(--theme-primary)]/30">
                            <span className="text-2xl font-black text-[var(--theme-primary)]">
                                {name[0]}
                            </span>
                        </div>
                    </div>
                )}
                {/* LIVE Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[var(--theme-primary)] rounded text-[9px] font-black uppercase tracking-widest text-white shadow-[var(--theme-glow)] animate-pulse">
                    LIVE
                </div>
            </div>

            {/* Host Info */}
            <div className="p-4 bg-black/20">
                <h3 className="font-bold text-white/90 text-sm leading-tight">{name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--theme-primary)] mt-1.5 opacity-80">
                    {role}
                </p>
            </div>
        </motion.div>
    );
}
