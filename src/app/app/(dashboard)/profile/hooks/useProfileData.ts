import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GameProfile } from "@/types";
import { toast } from "sonner";
import { api } from "@/lib/api-client";

export function useProfileData() {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [gameProfiles, setGameProfiles] = useState<GameProfile[]>([]);
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameProfile | null>(null);

    // Load profile and game profiles
    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            setUser(user);

            const [profileRes, gamesRes] = await Promise.all([
                supabase.from("profiles").select("*").eq("id", user.id).single(),
                supabase.from("game_profiles").select("*").eq("profile_id", user.id)
            ]);

            if (profileRes.error) console.error("Profile load error:", profileRes.error);
            if (gamesRes.error) console.error("Games load error:", gamesRes.error);

            setProfile(profileRes.data);
            setGameProfiles(gamesRes.data || []);
            setLoading(false);
        }
        loadProfile();
    }, []);

    // Handler: Save profile
    const handleSaveProfile = async (updatedProfile: any) => {
        setSaving(true);
        try {
            await api.put('/api/profile', {
                name: updatedProfile.name,
                bio: updatedProfile.bio,
                gamerTag: updatedProfile.gamer_tag,
            });
            toast.success("Profile synced successfully");
            setProfile(updatedProfile);
        } catch (error: any) {
            toast.error(error.message || "Failed to sync profile");
        }
        setSaving(false);
    };

    // Handler: Add/Update game profile
    const handleUpsertGame = async (gp: GameProfile) => {
        try {
            await api.post('/api/profile/games', gp);
            toast.success(`${gp.gameName} module synchronized`);

            // Refetch game profiles
            const { data } = await api.get('/api/profile/games');
            setGameProfiles(data || []);
            setIsWizardOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to sync game module");
        }
    };

    // Handler: Delete game profile
    const handleDeleteGame = async (gameName: string) => {
        try {
            await api.delete(`/api/profile/games?gameName=${encodeURIComponent(gameName)}`);
            toast.success(`${gameName} module decommissioned`);
            setGameProfiles(gameProfiles.filter(p => p.gameName !== gameName));
        } catch (error: any) {
            toast.error(error.message || "Failed to decommission module");
        }
    };

    // Handler: Edit game profile
    const handleEditGame = (game: GameProfile) => {
        setSelectedGame(game);
        setIsWizardOpen(true);
    };

    // Handler: Open add game wizard
    const handleAddGame = () => {
        setSelectedGame(null); // Clear for new game
        setIsWizardOpen(true);
    };

    // Handler: Close wizard
    const handleCloseWizard = () => {
        setIsWizardOpen(false);
        setSelectedGame(null); // Clear on close
    };

    return {
        // State
        user,
        profile,
        gameProfiles,
        loading,
        saving,
        isWizardOpen,
        selectedGame,

        // Handlers
        handlers: {
            onSaveProfile: handleSaveProfile,
            onUpsertGame: handleUpsertGame,
            onDeleteGame: handleDeleteGame,
            onEditGame: handleEditGame,
            onAddGame: handleAddGame,
            onCloseWizard: handleCloseWizard,
        },
    };
}
