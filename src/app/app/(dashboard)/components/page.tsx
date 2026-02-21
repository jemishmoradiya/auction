"use client";

import { ProfileHeroCard } from "../profile/components/ProfileHeroCard";
import { GameProfileCard } from "../profile/components/GameProfileCard";
import { GameArsenalSection } from "../profile/components/GameArsenalSection";
import { MissionLog } from "../profile/components/MissionLog";
import { ProfileEditModal } from "../profile/components/ProfileEditModal";
import { BattenWizard } from "@/components/profile/BattenWizard";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Mock Data for Showcase
const mockUser = {
    id: "user-123",
    email: "phantom@example.com",
    created_at: new Date().toISOString()
};

const mockProfile = {
    gamer_tag: "PHANTOM",
    title: "Elite Operative",
    name: "John Doe",
    bio: "Specializing in high-stakes tactical operations and competitive e-sports. Commanded multiple cross-platform campaigns.",
    avatar_url: null,
};

const mockGameProfiles = [
    {
        id: "game-1",
        user_id: "user-123",
        gameName: "VALORANT",
        ign: "PHANTOM#001",
        rank: "RADIANT",
        role: "DUELIST",
        category: "esports",
        stats: {
            "KD Ratio": 1.45,
            "Win Rate": 0.68,
            "Accuracy": 0.85,
            "Score/Min": 0.9,
            "Utility": 0.7
        },
        playstyle: ["Aggressive", "Entry Fragger"]
    },
    {
        id: "game-2",
        user_id: "user-123",
        gameName: "APEX LEGENDS",
        ign: "PHANTOM_TTV",
        rank: "PREDATOR",
        role: "FRAGGER",
        category: "esports",
        stats: {
            "Damage": 0.95,
            "Survival": 0.6,
            "Accuracy": 0.75,
            "Teamplay": 0.5,
            "Movement": 0.9
        },
        playstyle: ["Movement", "IGL"]
    },
    {
        id: "game-3",
        user_id: "user-123",
        gameName: "TENNIS",
        ign: "- N/A -",
        rank: "U18 VARSITY",
        role: "SINGLES",
        category: "physical",
        stats: {}, // Example with no stats
        playstyle: []
    }
];

export default function ComponentsShowcase() {
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const [isBattenWizardOpen, setBattenWizardOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--background)] p-4 md:p-8 pt-10 overflow-x-hidden text-white font-sans selection:bg-[var(--primary)] selection:text-[#0B0E14]">
            <div className="max-w-[1600px] mx-auto space-y-12 relative z-10">

                <div className="space-y-4 mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight font-heading text-shadow-sm">
                        Component <span className="text-[var(--primary)] drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">Showcase</span>
                    </h1>
                    <p className="text-[var(--primary)] bg-[var(--primary)]/10 inline-flex px-4 py-1.5 border border-[var(--primary)]/30 shadow-[0_0_10px_rgba(0,240,255,0.1)] rounded-full font-bold uppercase tracking-widest text-xs">Design System Kitchen Sink (Neon Cyberpunk)</p>
                </div>

                {/* Section: Modals & Dialogs */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)] flex-shrink-0" />
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-heading text-white drop-shadow-sm">Interactive Overlays</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 p-6 md:p-8 bg-white/[0.02] border border-white/10 shadow-xl backdrop-blur-xl rounded-[2rem] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 to-transparent pointer-events-none opacity-50" />
                        <Button onClick={() => setProfileModalOpen(true)} className="uppercase font-bold tracking-widest bg-[var(--primary)] hover:bg-[#00F0FF]/90 text-[#0B0E14] shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:-translate-y-1 transition-all rounded-xl h-14 relative z-10">
                            Open Profile Edit Modal
                        </Button>
                        <Button onClick={() => setBattenWizardOpen(true)} className="uppercase font-bold tracking-widest bg-white/[0.05] hover:bg-white/10 text-white border border-white/20 hover:border-[var(--secondary)]/50 hover:text-[var(--secondary)] hover:shadow-[0_0_15px_rgba(176,38,255,0.2)] hover:-translate-y-1 transition-all rounded-xl h-14 relative z-10" variant="secondary">
                            Open Batten Wizard (Create Module)
                        </Button>
                    </div>

                    {/* Render Modals */}
                    <ProfileEditModal
                        profile={mockProfile}
                        isOpen={isProfileModalOpen}
                        onClose={() => setProfileModalOpen(false)}
                        onSave={async () => { setProfileModalOpen(false); }}
                        isSaving={false}
                    />

                    {isBattenWizardOpen && (
                        <BattenWizard
                            onClose={() => setBattenWizardOpen(false)}
                            onComplete={() => setBattenWizardOpen(false)}
                        />
                    )}
                </section>

                {/* Section: Profile Cards */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--secondary)]/10 border border-[var(--secondary)]/50 shadow-[0_0_10px_rgba(176,38,255,0.2)] flex-shrink-0" />
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-heading text-white drop-shadow-sm">Profile Hero Card</h2>
                    </div>

                    <div className="max-w-md">
                        <ProfileHeroCard
                            user={mockUser as unknown as any}
                            profile={mockProfile}
                            onEdit={() => setProfileModalOpen(true)}
                        />
                    </div>
                </section>

                {/* Section: Game Cards */}
                <section className="space-y-6 text-white">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)] flex-shrink-0" />
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-heading text-white drop-shadow-sm">Game Profile Cards</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {mockGameProfiles.map((game, i) => (
                            <GameProfileCard
                                key={i}
                                game={game as unknown as any}
                                onEdit={() => { }}
                                onDelete={() => { }}
                            />
                        ))}
                    </div>
                </section>

                {/* Section: Layout Sections */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] flex-shrink-0" />
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-heading text-white drop-shadow-sm">Full Sections</h2>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <div className="bg-white/[0.02] border border-white/10 p-6 md:p-8 shadow-xl backdrop-blur-xl rounded-[2rem] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-[10px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 inline-flex px-3 py-1 border border-[var(--primary)]/30 shadow-[0_0_10px_rgba(0,240,255,0.1)] uppercase tracking-widest mb-6 rounded-full relative z-10">GameArsenalSection.tsx</h3>
                            <div className="relative z-10">
                                <GameArsenalSection
                                    games={mockGameProfiles as unknown as any}
                                    onAddGame={() => { }}
                                    onEditGame={() => { }}
                                    onDeleteGame={() => { }}
                                />
                            </div>
                        </div>

                        <div className="bg-white/[0.02] border border-white/10 p-6 md:p-8 shadow-xl backdrop-blur-xl rounded-[2rem] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-bl from-[var(--secondary)]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-[10px] font-bold text-[var(--secondary)] bg-[var(--secondary)]/10 inline-flex px-3 py-1 border border-[var(--secondary)]/30 shadow-[0_0_10px_rgba(176,38,255,0.1)] uppercase tracking-widest mb-6 rounded-full relative z-10">MissionLog.tsx</h3>
                            <div className="relative z-10">
                                <MissionLog />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
