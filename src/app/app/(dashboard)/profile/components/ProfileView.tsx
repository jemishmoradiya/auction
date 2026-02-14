"use client";

import { User } from "@supabase/supabase-js";
import { GameProfile } from "@/types";
import { ProfileHeroCard } from "./ProfileHeroCard";
import { GameArsenalSection } from "./GameArsenalSection";
import { BattenWizard } from "@/components/profile/BattenWizard";

interface ProfileViewProps {
    user: User | null;
    profile: any;
    gameProfiles: GameProfile[];
    loading: boolean;
    saving: boolean;
    isWizardOpen: boolean;
    selectedGame: GameProfile | null;
    handlers: {
        onSaveProfile: (profile: any) => void;
        onUpsertGame: (game: GameProfile) => void;
        onDeleteGame: (gameName: string) => void;
        onEditGame: (game: GameProfile) => void;
        onAddGame: () => void;
        onCloseWizard: () => void;
    };
}

export function ProfileView({
    user,
    profile,
    gameProfiles,
    loading,
    isWizardOpen,
    selectedGame,
    handlers,
}: ProfileViewProps) {
    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#020617]">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex-1 p-8 space-y-8 bg-[#020617] text-white overflow-y-auto">
            {/* Hero Section */}
            <ProfileHeroCard
                user={user}
                profile={profile}
                onEdit={() => {
                    // For now, just console - can enhance later with inline editing
                    console.log("Edit profile clicked");
                }}
            />

            {/* Game Arsenal Section */}
            <GameArsenalSection
                games={gameProfiles}
                onAddGame={handlers.onAddGame}
                onEditGame={handlers.onEditGame}
                onDeleteGame={handlers.onDeleteGame}
            />

            {/* Game Wizard Modal */}
            {isWizardOpen && (
                <BattenWizard
                    initialData={selectedGame}
                    onClose={handlers.onCloseWizard}
                    onComplete={handlers.onUpsertGame}
                />
            )}
        </div>
    );
}
