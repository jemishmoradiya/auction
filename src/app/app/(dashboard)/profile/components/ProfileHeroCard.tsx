"use client";

import { User } from "@supabase/supabase-js";
import { Shield, Zap, Globe, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

interface ProfileHeroCardProps {
    user: User | null;
    profile: any;
    onEdit: () => void;
}

export function ProfileHeroCard({ user, profile, onEdit }: ProfileHeroCardProps) {
    const clearanceLevel = profile?.clearance_level || "LEVEL 4";

    return (
        <GlassCard className="border-white/10 shadow-2xl rounded-[2rem] relative group/hero">
            {/* Corner Brackets (Premium HUD Decorators) */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[var(--primary)]/30 rounded-tl-lg pointer-events-none" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[var(--primary)]/30 rounded-tr-lg pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[var(--primary)]/30 rounded-bl-lg pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[var(--primary)]/30 rounded-br-lg pointer-events-none" />

            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent pointer-events-none" />

            <div className="relative p-5 md:p-10">
                {/* Simplified Identity Section for Dossier View */}
                <div className="space-y-8 w-full text-center lg:text-left relative z-10">
                    <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row gap-3 md:gap-4 items-center">
                            <div className="inline-flex px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[9px] sm:text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.2)] whitespace-nowrap">
                                [ PROFILE_SUMMARY ]
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter font-heading italic">Active Profile</h2>
                    </div>

                    <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
                        <div className="relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--primary)]/50 via-[var(--primary)]/20 to-transparent" />
                            <p className="text-sm md:text-base text-slate-400 font-medium pl-4 py-2 bg-white/[0.01] italic text-left relative overflow-hidden leading-relaxed">
                                <span className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--primary)]/10 to-transparent pointer-events-none" />
                                {profile?.bio || "New user joined the platform. Profile setup in progress."}
                            </p>
                        </div>
                    </div>

                    {/* Tactical Stats Rail */}
                    <div className="pt-6 md:pt-8 border-t border-white/10 text-left w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                            {/* Clearance Card */}
                            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all relative overflow-hidden group/stat cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                                <div className="flex items-center gap-2 mb-2 relative z-10">
                                    <Zap className="w-3.5 h-3.5 text-[var(--primary)]" />
                                    <div className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">USER_LEVEL</div>
                                </div>
                                <div className="text-lg sm:text-xl font-mono font-black text-white uppercase line-clamp-1 relative z-10 tracking-tighter">
                                    {clearanceLevel}
                                </div>
                            </div>

                            {/* Status Card */}
                            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all relative overflow-hidden group/stat cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary)]/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                                <div className="flex items-center gap-2 mb-2 relative z-10">
                                    <Shield className="w-3.5 h-3.5 text-[var(--secondary)]" />
                                    <div className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">USER_STATUS</div>
                                </div>
                                <div className="text-lg sm:text-xl font-mono font-black text-[var(--secondary)] drop-shadow-[0_0_8px_rgba(176,38,255,0.4)] uppercase relative z-10 tracking-tighter">
                                    ONLINE
                                </div>
                            </div>

                            {/* Sync Card */}
                            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all col-span-1 sm:col-span-2 lg:col-span-1 relative overflow-hidden group/stat cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity" />
                                <div className="flex items-center gap-2 mb-2 relative z-10">
                                    <Globe className="w-3.5 h-3.5 text-slate-300" />
                                    <div className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">LAST_UPDATED</div>
                                </div>
                                <div className="text-xs sm:text-sm font-mono font-bold text-slate-300 uppercase relative z-10 tracking-tight">
                                    {profile?.updated_at ? new Date(profile.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "00:00:00_UTC"}
                                </div>
                            </div>
                        </div>

                        {/* Health Bar Section */}
                        <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-white/[0.01] relative overflow-hidden cursor-pointer group/health">
                            <div className="absolute inset-0 bg-scanline opacity-[0.03] pointer-events-none" />
                            <div className="space-y-3 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5 text-[var(--primary)]" />
                                        <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">PROFILE_COMPLETION</div>
                                    </div>
                                    <div className="text-sm font-mono font-black text-[var(--primary)] uppercase tracking-tighter">94.8%</div>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full relative overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "94.8%" }}
                                        className="h-full bg-gradient-to-r from-[var(--primary)]/60 to-[var(--primary)] shadow-[0_0_15px_rgba(0,240,255,0.8)] rounded-full absolute top-0 left-0"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] bg-[length:200%_100%] animate-shimmer pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
