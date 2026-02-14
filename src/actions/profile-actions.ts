"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { GameProfile } from "@/types";

export async function updateProfile(formData: { name: string; bio: string; gamerTag?: string }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized access. Security clearance required.");
    }

    const updateData: any = {
        name: formData.name,
        bio: formData.bio,
    };

    if (formData.gamerTag) {
        updateData.gamer_tag = formData.gamerTag.toLowerCase().replace(/\s+/g, '_');
    }

    const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id);

    if (error) {
        if (error.code === '23505') {
            return { success: false, error: "Gamer Tag already claimed by another operative. Choose a unique signature." };
        }
        console.error("Profile sync error:", error);
        return { success: false, error: "Failed to synchronize operative identity. System failure." };
    }

    revalidatePath("/app/profile");
    return { success: true };
}

export async function upsertGameProfile(gameProfile: Partial<GameProfile>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized access. Security clearance required.");
    }

    // Upsert - creates new or updates existing profile for this game
    const { error } = await supabase
        .from("game_profiles")
        .upsert({
            profile_id: user.id,
            game_id: gameProfile.gameName,
            game_name: gameProfile.gameName,
            ign: gameProfile.ign,
            rank: gameProfile.rank,
            role: gameProfile.role,
            stats: gameProfile.stats || {},
            playstyle: gameProfile.playstyle || [],
            playing_since: gameProfile.playingSince,
        }, {
            onConflict: 'profile_id,game_name'
        });

    if (error) {
        console.error("Module sync error:", error);
        return { success: false, error: "Failed to calibrate game module. System integrity error." };
    }

    revalidatePath("/app/profile");
    return { success: true };
}

export async function deleteGameProfile(gameName: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized access. Security clearance required.");
    }

    const { error } = await supabase
        .from("game_profiles")
        .delete()
        .eq("profile_id", user.id)
        .eq("game_name", gameName);

    if (error) {
        console.error("Module deletion error:", error);
        return { success: false, error: "Failed to decommission game module." };
    }

    revalidatePath("/app/profile");
    return { success: true };
}
