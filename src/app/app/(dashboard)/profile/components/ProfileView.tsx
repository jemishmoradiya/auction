"use client";

import { User } from "@supabase/supabase-js";
import { GameProfile } from "@/types";
import { ProfileHeroCard } from "./ProfileHeroCard";
import { GameArsenalSection } from "./GameArsenalSection";
import { MissionLog } from "./MissionLog";
import { ProfileEditModal } from "./ProfileEditModal";
import { BattenWizard } from "@/components/profile/BattenWizard";
import { PremiumTabs, PremiumTabsList, PremiumTabsTrigger } from "@/components/ui/premium-tabs";
import { GlassCard, CardContent } from "@/components/ui/glass-card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { User as UserIcon, Mail, Gamepad2, Terminal, Shield, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyToggle, PrivacyMode } from "@/components/profile/PrivacyToggle";
import { cn } from "@/lib/utils";

interface ProfileViewProps {
    user: User | null;
    profile: any;
    gameProfiles: GameProfile[];
    loading: boolean;
    saving: boolean;
    isWizardOpen: boolean;
    isProfileEditOpen: boolean;
    selectedGame: GameProfile | null;
    handlers: {
        onSaveProfile: (profile: any) => void;
        onUpsertGame: (game: GameProfile) => void;
        onDeleteGame: (gameName: string) => void;
        onEditGame: (game: GameProfile) => void;
        onAddGame: () => void;
        onCloseWizard: () => void;
        onCloseProfileEdit: () => void;
        onEditProfile: () => void;
    };
}

export function ProfileView({
    user,
    profile,
    gameProfiles,
    loading,
    saving,
    isWizardOpen,
    isProfileEditOpen,
    selectedGame,
    handlers,
}: ProfileViewProps) {
    const [activeTab, setActiveTab] = useState("account");

    const navItems = [
        { icon: UserIcon, label: "Account", id: "account" },
        { icon: Gamepad2, label: "Games", id: "arsenal" },
        { icon: Terminal, label: "Activity", id: "logs" },
        { icon: Shield, label: "Privacy", id: "privacy" },
    ];

    const handlePrivacyUpdate = (mode: 'off' | 'ghost' | 'classified') => {
        handlers.onSaveProfile({
            ...profile,
            privacySettings: { mode }
        });
    };

    const currentModeInfo = {
        off: {
            id: 'off',
            title: 'Public Protocol',
            desc: 'Standard visibility enabled. Your tactical dossier is public across the network.',
            icon: Shield,
            color: 'text-slate-400',
            impact: [
                'Full profile visibility in directories',
                'Game identities visible to all operatives',
                'Unrestricted access to mission logs'
            ]
        },
        ghost: {
            id: 'ghost',
            title: 'Ghost Mode',
            desc: 'Enhanced identity masking. Your core aliases are obfuscated across the network.',
            icon: EyeOff,
            color: 'text-[var(--primary)]',
            impact: [
                'Usernames masked with redacted signatures',
                'Operational history partially obscured',
                'Hidden from standard search queries'
            ]
        },
        classified: {
            id: 'classified',
            title: 'Classified Protocol',
            desc: 'Maximum operational security. Your entire profile is removed from public access.',
            icon: Lock,
            color: 'text-red-500',
            impact: [
                'Total invisibility in all directories',
                'Access strictly limited to authorized personnel',
                'No trace in Edge Delivery Network caches'
            ]
        }
    }[profile?.privacySettings?.mode as 'off' | 'ghost' | 'classified' || 'off'];

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col overflow-x-hidden text-white font-sans tactical-grain">
            {/* Ambient Background Aura */}
            <div className="fixed inset-0 bg-gradient-to-tr from-[var(--primary)]/5 via-transparent to-[var(--secondary)]/5 pointer-events-none z-0" />


            {/* Minimalist Profile Header (Premium Refinement) */}
            <div className="relative z-10 px-4 sm:px-8 md:px-12 py-10 border-b border-white/10 bg-white/[0.01] backdrop-blur-md">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="h-20 w-20 md:h-24 md:w-24 rounded-[2rem] bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 p-1 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative">
                                <div className="absolute inset-0 bg-[var(--primary)]/10 animate-pulse rounded-[inherit]" />
                                <div className="h-full w-full rounded-[1.8rem] bg-[#0B0E14] flex items-center justify-center overflow-hidden border border-white/10 relative z-10">
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt={profile.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-3xl font-black text-[var(--primary)] drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] font-mono">
                                            {profile?.gamer_tag?.charAt(0) || user?.email?.charAt(0) || "?"}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic font-heading text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                        {profile?.gamer_tag || "USER"}
                                    </h1>
                                    <span className="px-3 py-1 rounded-sm bg-[var(--primary)]/10 border-l-2 border-[var(--primary)] text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                                        LEVEL {profile?.clearance_level?.split(' ')[1] || "01"}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.15em] font-mono">{profile?.name || "Unidentified User"}</p>
                                    <p className="text-xs text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-2 font-mono">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        {user?.email}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {profile?.privacySettings?.mode === 'ghost' && (
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded text-[9px] font-black text-[var(--primary)] uppercase tracking-widest">
                                            <EyeOff className="w-3 h-3" /> Ghost Mode Active
                                        </div>
                                    )}
                                    {profile?.privacySettings?.mode === 'classified' && (
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded text-[9px] font-black text-red-500 uppercase tracking-widest">
                                            <Lock className="w-3 h-3" /> Profile Classified
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                onClick={handlers.onEditProfile}
                                className="h-10 px-6 bg-white/[0.03] hover:bg-[var(--primary)]/10 text-white hover:text-[var(--primary)] border border-white/10 hover:border-[var(--primary)]/50 font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)] group"
                            >
                                <UserIcon className="h-3.5 w-3.5 mr-2 group-hover:rotate-12 transition-transform" />
                                EDIT SETTINGS
                            </Button>
                        </div>
                    </div>

                    {/* Premium Navigation Tabs */}
                    <div className="flex items-center w-full overflow-x-auto no-scrollbar pt-2">
                        <PremiumTabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <PremiumTabsList className="w-full sm:w-auto justify-start bg-white/5 p-1 h-auto rounded-xl border border-white/10">
                                {navItems.map((item) => (
                                    <PremiumTabsTrigger
                                        key={item.id}
                                        value={item.id}
                                        activeTab={activeTab}
                                        className="px-10 py-3 flex-1 sm:flex-none font-heading tracking-[0.2em] text-xs font-black uppercase italic cursor-pointer"
                                    >
                                        <item.icon className={`h-3.5 w-3.5 mr-3 ${activeTab === item.id ? "text-[var(--primary)]" : "opacity-30"}`} />
                                        {item.label}
                                    </PremiumTabsTrigger>
                                ))}
                            </PremiumTabsList>
                        </PremiumTabs>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-12 py-10 relative z-10 perspective-1000">
                <div className="max-w-[1400px] mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, rotateX: 2, scale: 0.98, y: 20 }}
                            animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
                            exit={{ opacity: 0, rotateX: -2, scale: 1.02, y: -20 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 25,
                                mass: 1
                            }}
                        >
                            {activeTab === "account" && (
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                    <div className="lg:col-span-12">
                                        <ProfileHeroCard
                                            user={user}
                                            profile={profile}
                                            onEdit={handlers.onEditProfile}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === "arsenal" && (
                                <GlassCard className="border-[var(--primary)]/20 bg-white/[0.01]">
                                    <CardContent className="p-4 sm:p-6 md:p-8">
                                        <GameArsenalSection
                                            games={gameProfiles}
                                            onAddGame={handlers.onAddGame}
                                            onEditGame={handlers.onEditGame}
                                            onDeleteGame={handlers.onDeleteGame}
                                        />
                                    </CardContent>
                                </GlassCard>
                            )}

                            {activeTab === "logs" && (
                                <GlassCard className="border-[var(--secondary)]/20 bg-white/[0.01]">
                                    <CardContent className="p-4 sm:p-6 md:p-8">
                                        <MissionLog />
                                    </CardContent>
                                </GlassCard>
                            )}

                            {activeTab === "privacy" && (
                                <div className="space-y-8">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <Shield className="w-6 h-6 text-[var(--primary)]" />
                                                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Tactical Privacy Control</h2>
                                            </div>
                                            <p className="text-sm text-slate-500 font-medium max-w-2xl leading-relaxed uppercase tracking-widest font-mono">
                                                Manage your digital footprint across the ecosystem.
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] px-1 font-mono">Select Protocol</span>
                                            <PrivacyToggle
                                                value={profile?.privacySettings?.mode || 'off'}
                                                onChange={handlePrivacyUpdate}
                                                isSaving={saving}
                                            />
                                        </div>
                                    </div>

                                    <GlassCard className="border-white/5 bg-white/[0.01] overflow-hidden relative">
                                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                            <currentModeInfo.icon className="w-64 h-64" />
                                        </div>
                                        <CardContent className="p-8 md:p-12">
                                            <div className="flex flex-col md:flex-row gap-12 items-start">
                                                <div className="flex-1 space-y-6">
                                                    <div>
                                                        <h3 className={cn("text-3xl font-black uppercase italic tracking-tight mb-3 flex items-center gap-4", currentModeInfo.color)}>
                                                            <currentModeInfo.icon className="w-8 h-8" />
                                                            {currentModeInfo.title}
                                                        </h3>
                                                        <p className="text-sm text-slate-400 font-bold leading-relaxed uppercase tracking-widest font-mono">
                                                            {currentModeInfo.desc}
                                                        </p>
                                                    </div>

                                                    <div className="space-y-4 pt-4">
                                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Operational Protocol Details</p>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            {currentModeInfo.impact.map((text, i) => (
                                                                <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-xl group/item transition-colors hover:border-white/10">
                                                                    <div className={cn("w-1.5 h-1.5 rounded-full", currentModeInfo.id === 'classified' ? 'bg-red-500' : 'bg-[var(--primary)]')} />
                                                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{text}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </GlassCard>

                                    <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-start gap-4">
                                        <Shield className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Data Security Note</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                                                Privacy protocols are applied globally across the AuctioNext network. Changes may take up to 60 seconds to propagate to the Edge Delivery Network (EDN).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Modal Overlay for Game Module */}
            {isWizardOpen && (
                <BattenWizard
                    initialData={selectedGame}
                    onClose={handlers.onCloseWizard}
                    onComplete={handlers.onUpsertGame}
                />
            )}

            {/* Modal Overlay for Profile Edit */}
            <ProfileEditModal
                profile={profile}
                isOpen={isProfileEditOpen}
                onClose={handlers.onCloseProfileEdit}
                onSave={handlers.onSaveProfile}
                isSaving={saving}
            />
        </div>
    );
}
