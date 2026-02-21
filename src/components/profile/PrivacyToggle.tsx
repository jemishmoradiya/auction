"use client";

import { motion } from "framer-motion";
import { Shield, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export type PrivacyMode = 'off' | 'ghost' | 'classified';

interface PrivacyToggleProps {
    value: PrivacyMode;
    onChange: (mode: PrivacyMode) => void;
    className?: string;
    isSaving?: boolean;
}

const MODES = [
    { id: 'off', label: 'Public', icon: Shield, color: 'text-slate-400', activeColor: 'text-white' },
    { id: 'ghost', label: 'Ghost', icon: EyeOff, color: 'text-slate-400', activeColor: 'text-[var(--primary)]' },
    { id: 'classified', label: 'Hidden', icon: Lock, color: 'text-slate-400', activeColor: 'text-red-500' },
] as const;

export function PrivacyToggle({ value, onChange, className, isSaving }: PrivacyToggleProps) {
    return (
        <div className={cn("inline-flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl relative", className)}>
            {MODES.map((mode) => {
                const isActive = value === mode.id;
                const Icon = mode.icon;

                return (
                    <button
                        key={mode.id}
                        onClick={() => !isSaving && onChange(mode.id)}
                        disabled={isSaving}
                        className={cn(
                            "relative flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 group cursor-pointer",
                            isActive
                                ? "bg-[#0B0E14] border border-white/10 shadow-[0_2px_15px_rgba(0,0,0,0.5)]"
                                : "hover:bg-white/5 border border-transparent grayscale opacity-40 hover:opacity-100 hover:grayscale-0",
                            isSaving && isActive && "animate-pulse"
                        )}
                    >
                        {/* LED Indicator */}
                        <div className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all duration-300",
                            isActive
                                ? (mode.id === 'off' ? 'bg-slate-400 shadow-[0_0_8px_rgba(148,163,184,0.8)]' : mode.id === 'ghost' ? 'bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]')
                                : "bg-white/10"
                        )} />

                        <div className="flex items-center gap-2">
                            <Icon className={cn("w-3.5 h-3.5 transition-transform duration-300", isActive && mode.activeColor)} />
                            <div className="flex flex-col items-start leading-none">
                                <span className={cn(
                                    "text-[9px] font-black uppercase tracking-[0.1em] italic font-heading",
                                    isActive ? "text-white" : "text-slate-500"
                                )}>
                                    {isActive ? "DEPLOYED" : "SELECT"}
                                </span>
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-[0.2em] italic font-heading",
                                    isActive ? mode.activeColor : "text-slate-400"
                                )}>
                                    {mode.label}
                                </span>
                            </div>
                        </div>

                        {isActive && !isSaving && (
                            <div className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50" style={{ color: 'var(--primary)' }} />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
